<template>
  <main-template :user-status="userStatus">
    <input type="file" @change="onFileChange" />
    <div v-if="content" style="margin-top: 12px">
      アップロード結果:
      <div class="preview">
        <img :src="content" :alt="name" decoding="async" />
      </div>
    </div>
    <j-button text="Photoを追加" @handleClick="postPhoto" />
  </main-template>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, useAsync } from '@nuxtjs/composition-api'

import UserComposable from '~/composables/user'
import PhotoComposable from '~/composables/photo'

import { fetchPhotos } from '~/services/photoService'

const MainTemplate = () => import('~/components/MainTemplate.vue')

export default defineComponent({
  components: {
    MainTemplate
  },
  middleware: 'auth',
  setup(props: {}, ctx: SetupContext) {
    const photos = ref()
    const userModule = UserComposable(props, ctx)
    const photoModule = PhotoComposable(props, ctx)
    useAsync(async () => {
      photos.value = await fetchPhotos()
    })
    return { ...userModule, ...photoModule, photos }
  }
})
</script>
