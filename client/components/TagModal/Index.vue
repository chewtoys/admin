<template>
  <div>
    <j-button
      ref="categoryModalButton"
      text="カテゴリーを選択"
      @handleClick="displayModal"
    />

    <div>
      <template v-for="tag in tags">
        <j-label :key="tag" :text="tagText(tag)" />
      </template>
    </div>

    <div v-if="showModal === true">
      <div class="modal-mask" @click.self="modalClose">
        <div :style="modalWrapperStyle">
          <div class="modal-container">
            <div class="header">
              <span class="header-title"> カテゴリー選択 </span>
              <span class="header-close-btn" @click="cancel"> × </span>
            </div>

            <div class="content">
              <div class="column">
                <div
                  style="
                    padding: 0.6rem;
                    color: #000;
                    border-bottom: 1px solid #ddd;
                  "
                >
                  選択してください
                </div>
                <div class="list">
                  <div
                    v-for="(itemClass, index) in itemClasses"
                    :key="index"
                    :index="itemClass.itemClassName"
                  >
                    <div
                      v-for="(item, key) in itemClass.itemClassItems"
                      :key="item.itemClassItemName"
                    >
                      <accordion
                        :label-text="key === 0 ? itemClass.itemClassName : ''"
                        :title="item.itemClassItemName"
                        :items="item.items"
                        :selected-ids="tags"
                        @handleItemClassAll="updateItemClassAll"
                        @handleItemClass="updateItemClass"
                        @handleDeselectItemClassAll="deselectItemClassAll"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="column">
                <div class="selected-tags-header">
                  <div
                    :class="{ exists: tags.length > 0 }"
                    class="selected-tags"
                  >
                    選択中のカテゴリー
                    <span class="selected-tags-badge">
                      {{ tags.length }}
                    </span>
                  </div>
                  <j-button text="全て削除" @handleClick="deselectTagAll" />
                </div>
                <div class="list">
                  <template v-if="tags.length === 0">
                    <div class="empty-message-box">
                      <div class="empty-message">
                        カテゴリーを設定してください
                        <div class="description">
                          左パネルから、店舗を選択して下さい
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div v-for="tag in selectedTags" :key="tag">
                      {{ tagText(tag) }}
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="footer">
              <j-button
                text="キャンセル"
                style="margin-right: 0.8rem"
                @handleClick="cancel"
              />
              <j-button text="確定" fill @handleClick="submit" />
            </div>
          </div>
        </div>
      </div>
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

import { AccordionItemClass } from '~/types/utils'
import { CATEGORIES } from '~/utils/tag'
import { modalStyle, CategoryItems } from '~/utils/tag'

const Accordion = () => import('~/components/TagModal/Accordion.vue')

export default defineComponent({
  components: {
    Accordion
  },
  props: {
    items: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  setup(props: {}, ctx: SetupContext) {
    const modalWrapperStyle = ref({})
    const showModal = ref(false)
    const itemClasses = ref<Array<AccordionItemClass>>(CategoryItems)
    const tags = ref<number[]>([])
    const tagsInMemory = ref<number[]>([])

    const selectedTags = computed(() => {
      let result: any = []
      tags.value.map((id: any) => {
        result.push(id)
      })
      return result
    })

    return {
      modalWrapperStyle,
      showModal,
      itemClasses,
      tags,
      selectedTags,
      tagText(tagId: number) {
        let result: string = ''
        CATEGORIES.map((category) => {
          if (category.value === tagId) {
            result = category.text
          }
        })
        return result
      },
      cancel() {
        tags.value = [...tagsInMemory.value]
        showModal.value = false
      },
      submit() {
        tagsInMemory.value = [...tags.value]
        showModal.value = false
        ctx.emit('update', tags.value)
      },
      displayModal() {
        modalWrapperStyle.value = modalStyle('', '', '', '', '', '')
        tags.value = [...tagsInMemory.value]
        showModal.value = true
      },
      modalClose() {
        tagsInMemory.value = [...tags.value]
        showModal.value = false
      },
      deselectTagAll() {
        tags.value = []
      },
      updateItemClassAll(ids: number[]) {
        ids.forEach((id: number) => {
          !tags.value.includes(id)
        })
        tags.value = ids
          .filter((id) => !tags.value.includes(id))
          .concat(tags.value)
      },
      updateItemClass(id: number) {
        if (tags.value.includes(id)) {
          tags.value = tags.value.filter((tagId: number) => tagId !== id)
          return
        }
        tags.value.unshift(id)
      },
      deselectItemClassAll(ids) {
        tags.value = tags.value.filter((tagId: number) => !ids.includes(tagId))
      }
    }
  }
})
</script>

<style lang="scss" scoped>
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
      color: #000;
    }
    &-close-btn {
      padding: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .content {
    display: flex;

    .column {
      overflow-y: auto;
      width: 50%;
      &:nth-child(odd) {
        border-right: 1px solid #ccc;
      }

      .selected-tags-header {
        padding: 0.6rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .selected-tags {
          font-size: 16px;
          font-weight: bold;
          display: flex;
          align-items: center;
          color: #d3d3d3;
          &-badge {
            background-color: #d3d3d3;
            color: #fff;
            padding: 0 0.4rem;
            border-radius: 3px;
            font-size: 14px;
            margin-left: 0.5rem;
          }
          &.exists {
            color: #0084cf;
            .selected-tags-badge {
              background-color: #0784cf;
            }
          }
        }
      }

      .list {
        overflow-y: scroll;
        height: 320px;
        color: #000;
        text-align: left;
        border: none;
        outline: none;
        transition: all 0.2s ease-in;

        .list-searchable {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: strech;
          width: 100%;
          font-weight: bold;
          text-align: left;
          border: none;
          outline: none;
          cursor: pointer;
          transition: all 0.2s ease-in;
          border-top: 1px #ddd solid;
          &--store-info {
            padding: 0.7rem;
            padding-left: 3.3rem;
            .store-name {
              margin: 0;
              font-size: 1.1rem;
              font-weight: normal;
            }
          }
        }
        .empty-message-box {
          padding-bottom: 56px;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #999999;
          .empty-message {
            font-size: 18px;
            font-weight: bold;
            .description {
              margin-top: 0.6rem;
              font-weight: normal;
              font-size: 1rem;
            }
          }
        }
      }
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 0.8rem;
    width: 100%;
    border-top: 1px solid #ccc;
  }
}

.selected-tags {
  .selected-tags-list {
    padding-left: 0;
    margin-top: 0.5rem;
    margin-bottom: 0;
    list-style-type: none;
    li {
      padding: 0.4rem;
      margin: 0.4rem 0.4rem 0 0;
      display: inline-flex;
      border: 1px solid #ddd;
      font-size: 11px;
      border-radius: 3px;
    }
  }
  .toggle-selected-tags {
    margin-top: -30px;
    padding-top: 15px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.85);
    z-index: 2;
    position: relative;
    text-align: center;
    color: #0084cf;
    cursor: pointer;
    .btn-toggle-selected-tags {
      display: inline-flex;
      padding: 0.5rem;
      border-radius: 3px;
      align-items: center;
      justify-content: space-between;
      &:hover {
        background: #f7f7f7;
      }
      .icon {
        margin-left: 0.5rem;
      }
    }
  }
  &.is-opened {
    .toggle-selected-tags {
      margin-top: 0.5rem;
      padding-top: 0;
      background-color: tansparent;
    }
  }
}
</style>
