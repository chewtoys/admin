<template>
  <div>
    <div class="item-class-accordion">
      <div :class="{ 'is-opened': isAccordionOpened }" class="item-class">
        <button
          class="item-class-name"
          @click.prevent="isAccordionOpened = !isAccordionOpened"
        >
          <!--
          <svg-element name="caret-right" />
          -->
          {{ title }}
          <small class="item-count">({{ itemLength }})</small>
        </button>
        <div class="add-tag">
          <button
            :class="getIconsColorClass"
            class="add-tag-btn"
            @click.prevent="handleClickFolderIcon"
          >
            <!--
              <svg-element :name="getIconsStyle" />
              -->
          </button>
        </div>
      </div>
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"
      >
        <div v-if="isAccordionOpened" class="item-list">
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  SetupContext,
  computed,
  ref
} from '@nuxtjs/composition-api'

// const SvgElement = () => import('~/components/SvgElement.vue')

type ClassProps = {
  title: string
  itemLength: number
  isSelectedAll: boolean
  handleClickFolderIconCallback: Function
}

export default defineComponent({
  components: {
    // SvgElement
  },
  props: {
    title: {
      type: String,
      required: true
    },
    itemLength: {
      type: Number,
      default: 0
    },
    isSelectedAll: {
      type: Boolean,
      required: true
    },
    handleClickFolderIconCallback: {
      type: Function,
      required: true
    }
  },
  setup(props: ClassProps, ctx: SetupContext) {
    const isAccordionOpened = ref(false)

    const getIconsColorClass = computed(() => {
      if (props.isSelectedAll) {
        return 'isSelected'
      }
      return ''
    })

    const getIconsStyle = computed(() => {
      if (props.isSelectedAll) {
        return 'folder-minus'
      }
      return 'folder-plus'
    })

    const handleClickFolderIcon = () => {
      props.handleClickFolderIconCallback()
    }

    const beforeEnter = (el: any) => {
      el.style.height = '0'
    }

    const enter = (el: any) => {
      el.style.height = el.scrollHeight + 'px'
    }

    const beforeLeave = (el: any) => {
      el.style.height = el.scrollHeight + 'px'
    }

    const leave = (el: any) => {
      el.style.height = '0'
    }

    return {
      isAccordionOpened,
      getIconsColorClass,
      getIconsStyle,
      handleClickFolderIcon,
      beforeEnter,
      enter,
      beforeLeave,
      leave
    }
  }
})
</script>

<style lang="scss" scoped>
@import './class';
</style>
