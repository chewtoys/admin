<template>
  <div v-if="menus" class="menu-book-card">
    <div :style="`border-bottom: 4px solid ${getTheme};`" class="header">
      <ul class="header__list">
        <li v-for="(menuCategory, index) in menuCategories" :key="index">
          <button
            :class="
              currentMenuCategory === index
                ? 'header__list__item--current'
                : ''
            "
            :style="
              currentMenuCategory === index
                ? `background-color: ${getTheme};`
                : ''
            "
            class="header__list__item"
            @click="currentMenuCategory = index"
          >
            {{ menuCategory }}
          </button>
        </li>
      </ul>

      <div class="header__howtouse">
        <span class="header__howtouse__icon">
          <!--
          <QuestionSvg width="12px" />
          -->
        </span>
        <span class="header__howtouse__label">使い方</span>
      </div>
    </div>

    <template v-for="(menuCategory, index) in menuCategories">
      <div
        v-if="currentMenuCategory === index"
        :key="menuCategory"
        :class="currentMenuCategory === index ? 'field--current' : ''"
        class="field"
      >
        <template v-if="segments">
          <div class="segments">
            <div class="segment-list">
              <button
                v-for="(segment, key) in segments"
                :key="segment"
                :class="
                  currentSegment === key
                    ? 'segment-list__item--current'
                    : ''
                "
                :style="
                  currentSegment === key
                    ? `background-color: ${getTheme};`
                    : ''
                "
                class="segment-list__item"
                @click="currentSegment = key"
              >
                {{ segment }}
              </button>
            </div>
          </div>

          <div class="menus">
            <template v-for="(segment, key) in segments">
              <template v-if="currentSegment === key">
                <div :key="segment" class="menu">
                  <a
                    v-for="(item, index) in getItems"
                    :key="index"
                    :href="getMenuLink(item)"
                    :class="getColumns"
                    :style="`background-image: url(${item.image})`"
                    class="menu__item"
                  >
                    <div class="menu__item__inner">
                      <span class="menu__item__price">
                        <span class="unit">¥</span>
                        {{ item.price }}
                      </span>
                      <span class="menu__item__name">
                        {{ item.name }}
                      </span>
                    </div>
                  </a>
                </div>
              </template>
            </template>
          </div>
        </template>

        <template v-else>
          <div class="segments" />

          <div class="menus">
            <div class="menu">
              <a
                v-for="(item, index) in getItems"
                :key="index"
                :href="getMenuLink(item)"
                :class="getColumns"
                :style="`background-image: url(${item.image})`"
                class="menu__item"
              >
                <div class="menu__item__inner">
                  <span class="menu__item__price">
                    <span class="unit">¥</span>
                    {{ item.price }}
                  </span>
                  <span class="menu__item__name">{{ item.name }}</span>
                </div>
              </a>
            </div>
          </div>
        </template>

        <div class="paginate">
          <button
            :class="getPageStyle(1)"
            class="paginate__control paginate__control--prev prev"
            @click="prevPage"
          >
            <span />
          </button>
          <div class="paginate__display">
            <span class="paginate__display__current">
              {{ currentPage }}
            </span>
            /
            <span class="paginate__display__limit">
              {{ pages }}
            </span>
          </div>
          <button
            :class="getPageStyle(pages)"
            class="paginate__control paginate__control--next next"
            @click="nextPage"
          >
            <span />
          </button>
        </div>
      </div>
    </template>

    <div class="field field--howtouse">
      <div class="img-wrapper">
        <!--
        <HowToUseSvg width="12px" />
        -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import CardComposable from '~/composables/card'

// import QuestionSvg from '~/assets/question.svg'
// import HowToUseSvg from '~/assets/howtouse.svg'

type CardProps = {
  form: object | any
  menus: object | any
}

export default defineComponent({
  components: {
    // QuestionSvg
    // HowToUseSvg,
  },
  props: {
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
  setup(props: CardProps, ctx: SetupContext) {
    const cardModule = CardComposable(props, ctx)
    return { ...cardModule }
  }
})
</script>

<style lang="scss" scoped>
@import './card';
</style>
