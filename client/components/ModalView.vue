<template>
  <div>
    <j-button ref="modalButton" :text="title" @handle-click="displayModal" />
    <transition mode="out-in">
      <div v-if="showModal === true">
        <button class="modal-mask" @click.self="modalClose">
          <div :style="modalWrapperStyle">
            <div class="modal-container">
              <slot />
            </div>
            <div class="footer-area">
              <j-button
                text="キャンセル"
                style="margin: 0 12px"
                @handleClick="cancel"
              />
              <j-button
                v-if="isConfirmed"
                text="確定"
                style="margin: 0 12px"
                @handleClick="confirm"
              />
            </div>
          </div>
        </button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref } from '@nuxtjs/composition-api'

const modalStyle = (
  topPosition: string,
  bottomPosition: string,
  leftPosition: string,
  rightPosition: string,
  width: string,
  height: string
) => {
  const ua = navigator.userAgent
  const isIPad = ua.indexOf('iPad') >= 0

  let baseStyle = {
    position: 'fixed',
    maxWidth: '900px',
    transform: isIPad ? 'translate(-50%, -50%)' : '',
    width: 'calc(100% - 44px)',
    top: isIPad ? '50%' : '',
    left: isIPad ? '50%' : '',
    height: height,
    backgroundColor: '#fff',
    borderRadius: '4px',
    'box-shadow': '0px 5px 5px 0px rgba(0, 0, 0, 0.3)'
  }

  if (topPosition !== '') {
    baseStyle = Object.assign(baseStyle, {
      top: topPosition
    })
  }

  if (bottomPosition !== '') {
    baseStyle = Object.assign(baseStyle, {
      bottom: bottomPosition
    })
  }

  if (leftPosition !== '') {
    baseStyle = Object.assign(baseStyle, {
      left: leftPosition
    })
  }

  if (rightPosition !== '') {
    baseStyle = Object.assign(baseStyle, {
      right: rightPosition
    })
  }

  return baseStyle
}

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    isConfirmed: {
      type: Boolean,
      default: false
    }
  },
  setup(props: {}, ctx: SetupContext) {
    const modalWrapperStyle = ref({})
    const showModal = ref(false)

    const modalClose = () => {
      modalWrapperStyle.value = {}
      showModal.value = false
    }

    return {
      showModal,
      modalWrapperStyle,
      modalClose,
      displayModal() {
        modalWrapperStyle.value = modalStyle('', '', '', '', '60vw', '')
        showModal.value = true
      },
      cancel() {
        modalClose()
        ctx.emit('cancel')
      },
      confirm() {
        modalClose()
        ctx.emit('confirm')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/modal';
</style>
