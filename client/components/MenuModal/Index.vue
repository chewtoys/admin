<template>
  <div class="menu-book">
    <j-button
      :text="$t('table_order.menu_book.preview.title')"
      @handleClick="openModal"
    />

    <div v-if="showModal === Boolean(true)">
      <div class="modal-mask" @click.self="closeModal">
        <div :style="modalWrapperStyle">
          <div class="modal-container">
            <menu-preview
              :is-preview-mode="Boolean(true)"
              :form="{ name: '霧の滴', theme: 1, columns: 0 }"
              :menus="menus"
              @handle-modal="closeModal"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, SetupContext } from '@nuxtjs/composition-api'

import MenuPreview from '~/components/MenuModal/Preview.vue'

import { modalStyle } from '~/utils/modal'

export default {
  components: {
    MenuPreview
  },
  props: {
    menus: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  setup(props: {}, ctx: SetupContext) {
    const modalWrapperStyle = ref({})
    const showModal = ref(false)
    return {
      modalWrapperStyle,
      showModal,
      openModal() {
        modalWrapperStyle.value = modalStyle('', '', '', '', '', '')
        showModal.value = true
      },
      closeModal() {
        modalWrapperStyle.value = {}
        showModal.value = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-book {
  padding: 10px;
  margin: 0 48px 16px;
}

.modal-mask {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.modal-container {
  z-index: 101;
  text-align: center;
}
</style>
