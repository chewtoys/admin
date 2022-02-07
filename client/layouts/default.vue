<template>
  <div>
    <nav-section />
    <nuxt />
    <footer-section />
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@nuxtjs/composition-api'

import { provideLayout } from '~/composables/layout'

const NavSection = () => import('~/components/NavSection.vue')
const FooterSection = () => import('~/components/FooterSection.vue')

export default defineComponent({
  components: {
    NavSection,
    FooterSection,
  },
  setup(props: {}, ctx: SetupContext) {
    provideLayout()
  }
})
</script>

<style lang="scss">
html {
  font-family: Futura, 'Trebuchet MS', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  background-color: #fff;
  color: #000;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
