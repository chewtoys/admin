<template>
  <div class="switch">
    <div class="switch-label">
      <input id="btn-mode" type="checkbox" @input="change" />
      <span id="icon-rotate" class="switch-mode" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@nuxtjs/composition-api'

import { useLayout } from '~/composables/layout'

export default defineComponent({
  setup(props: {}, ctx: SetupContext) {
    const { change } = useLayout()
    return { change }
  }
})
</script>

<style lang="scss" scoped>
input[type='checkbox'] {
  display: none;
}

.switch {
  position: fixed;
  top: 0.5em;
  right: 0.5em;
  font-size: 60px;
}

.switch-label {
  cursor: pointer;
}

.switch-mode {
  position: absolute;
  top: -120px;
  right: -120px;
  display: block;
  width: 200px;
  height: 200px;
  transform: rotate(0);
  transition: transform 1s;

  &:before {
    content: '⛅️';
    position: absolute;
    left: 0;
    bottom: 0;
  }

  &:after {
    content: '🌙';
    position: absolute;
    right: 0;
    top: 0;
    transform: scale(1, -1);
  }
}
</style>
