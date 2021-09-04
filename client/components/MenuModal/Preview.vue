<template>
  <div class="menu-book-preview">
    <template v-if="isPreviewMode">
      <div class="header">
        <span class="header-title">
          {{ $t('table_order.menu_book.preview.description') }}
        </span>
        <span class="header-close-btn" @click="cancel">
          <!--
          <font-awesome-icon icon="times" class="icons" />
          -->
        </span>
      </div>

      <menu-card :form="form" :menus="menus" />
    </template>
  </div>
</template>

<script lang="ts">
import MenuCard from '~/components/MenuModal/presentational/Card.vue'

export default {
  components: {
    MenuCard
  },
  props: {
    isPreviewMode: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: () => {
        return {}
      }
    },
    menus: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    cancel() {
      // @ts-ignore
      this.$emit('handle-modal', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;

  &-title {
    padding: 1rem;
  }

  &-close-btn {
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
