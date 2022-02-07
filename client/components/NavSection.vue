<template>
  <header>
    <div class="py-4 px-2 lg:mx-4 xl:mx-12">
      <div>
        <nav class="flex flex-wrap justify-between items-center">
          <div class="flex items-center mr-6 text-white flex-no-shrink">
            <img
              :src="`/icon/nekohack_logo.svg`"
              alt="nekohack logo"
              class="w-24"
            />
          </div>
          <div class="block lg:hidden">
            <button
              class="flex items-center py-2 px-3 text-white hover:text-white rounded border border-white hover:border-white navbar-burger"
            >
              <svg
                class="w-6 h-6 text-gray-700 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div
            v-if="userStatus"
            id="main-nav"
            class="hidden grow items-center w-full lg:flex lg:w-auto"
          >
            <div class="mt-2 lg:grow xl:mx-8 text-sm animated jackinthebox">
              <nuxt-link
                v-for="menu in menus"
                :key="menu.value"
                :to="menu.url"
                class="block p-1 mx-2 font-bold text-orange-500 hover:text-orange-500 focus:text-blue-500 hover:bg-gray-300 rounded-lg sm:hover:bg-transparent lg:inline-block text-md sm:hover:border-indigo-400"
              >
                {{ menu.text }}
              </nuxt-link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@nuxtjs/composition-api'

import UserComposable from '~/composables/user'

import { MENU_LIST } from '~/utils/layout'

export default defineComponent({
  setup(props: {}, ctx: SetupContext) {
    const userModule = UserComposable(props, ctx)
    const menus = MENU_LIST
    return { ...userModule, menus }
  }
})
</script>
