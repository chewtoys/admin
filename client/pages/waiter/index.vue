<template>
  <main-template :user-status="userStatus">
    <div :style="{ padding: '8px 0' }">
      <menu-modal :menus="menus" @update="applyMenus" />
    </div>
  </main-template>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, useAsync } from '@nuxtjs/composition-api'

import UserComposable from '~/composables/user'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const MenuModal = () => import('~/components/MenuModal/index.vue')

export default defineComponent({
  components: {
    MainTemplate,
    MenuModal
  },
  middleware: 'auth',
  setup(props: {}, ctx: SetupContext) {
    const userModule = UserComposable(props, ctx)
    const selectedMenus = ref<number[]>([])
    const menus = ref<number[]>([])
    const applyMenus = (values: number[]) => {
      selectedMenus.value = [...values]
    }
    useAsync(async () => {
      const data = await fetch('https://myapi.dev/menus').then((res) => res.json())
      menus.value = data
    })
    return { ...userModule, selectedMenus, applyMenus, menus }
  }
})
</script>
