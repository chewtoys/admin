<template>
  <main-template :user-status="userStatus">
    <!--
    <template v-for="product in products">
      <app-card
        :key="product.id"
        :title="product.title"
        :icon="product.icon"
        :tags="product.tags"
        :price="product.price"
        :tooltip="product.tooltip"
        :promotion="product.promotion"
        :rate="product.rate"
        :description="product.description"
      />
    </template>
    -->

    <div class="mb-8">
      <div
        class="flex flex-col justify-center p-4 h-64 min-h-screen align-middle item-center"
      >
        <div class="flex justify-center my-4 item-center">
          <j-input
            placeholder="メールアドレス"
            :text="email"
            @handleInput="applyEmail"
          />
        </div>
        <div class="flex justify-center my-4 item-center">
          <j-input
            placeholder="パスワード"
            input-type="password"
            :text="password"
            password
            @handleInput="applyPassword"
          />
        </div>
        <div class="flex justify-center my-4 item-center">
          <j-button text="ログイン" @handleClick="login" />
        </div>
      </div>
    </div>
  </main-template>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@nuxtjs/composition-api'

import UserComposable from '~/composables/user'
import { useLayout } from '~/composables/layout'

const MainTemplate = () => import('~/components/MainTemplate.vue')
// const AppCard = () => import('~/components/Card/AppCard.vue')

import { products } from '~/utils/product'

export default defineComponent({
  components: {
    MainTemplate
    // AppCard
  },
  setup(props: {}, ctx: SetupContext) {
    const userModule = UserComposable(props, ctx)
    const { mode } = useLayout()
    return { ...userModule, mode, products }
  }
})
</script>
