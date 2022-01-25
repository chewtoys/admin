<template>
  <main-template :user-status="userStatus">
    <modal title="問い合わせを確認する" @cancel="cancel">
      <div class="contact">
        <div v-for="item in contactData" :key="item.id">
          <template v-if="item.page === activePage">
            <div class="px-4 py-2">
              {{ titleText(item) }}
            </div>
            <div
              class="px-4 py-2 text-gray-600"
              v-html="descriptionText(item)"
            />
            <hr style="width: 60%; margin: 0 auto" />
          </template>
        </div>

        <j-pagination
          :items="contactData !== undefined ? contactData : []"
          :page="activePage"
          :per-page="perPage"
          @handle-page="applyPage"
        />
      </div>
    </modal>
  </main-template>
</template>

<script lang="ts">
import {
  defineComponent,
  SetupContext,
  ref,
  useAsync
} from '@nuxtjs/composition-api'

import UserComposable from '~/composables/user'
import ContactComposable from '~/composables/contact'

import { fetchContacts } from '~/services/contactService'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const Modal = () => import('~/components/ModalView.vue')

export default defineComponent({
  components: {
    MainTemplate,
    Modal
  },
  middleware: 'auth',
  setup(props: {}, ctx: SetupContext) {
    const contactData = ref()
    const userModule = UserComposable(props, ctx)
    const contactModule = ContactComposable(props, ctx)
    useAsync(async () => {
      const contacts = await fetchContacts()
      contactData.value = contacts.item
    })
    return { ...userModule, ...contactModule, contactData }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/_contact';
</style>
