<template>
  <div>
    <div v-if="userStatus" class="container flex justify-end items-center mx-auto">
      <j-button text="ログアウト" @handleClick="logout" />
    </div>
    <div class="container mx-auto">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@nuxtjs/composition-api'
import UserComposable from '~/composables/user'
import LayoutComposable from '~/composables/layout'

import { MENU_LIST } from '~/utils/layout'

export default defineComponent({
  setup(props: {}, ctx: SetupContext) {
    const menus = MENU_LIST
    const userModule = UserComposable(props, ctx)
    const layoutModule = LayoutComposable(props, ctx)
    return { menus, ...userModule, ...layoutModule }
  }
})
</script>
