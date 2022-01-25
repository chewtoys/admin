<template>
  <main-template :user-status="userStatus">
    <ul class="flex border-b">
      <li
        v-for="(menu, index) in ['Issue', 'PullRequest']"
        :key="menu"
        class="mr-1"
      >
        <a
          :class="
            isSelected === index
              ? 'bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold'
              : 'bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold'
          "
          @click="select(index)"
        >
          {{ menu }}
        </a>
      </li>
    </ul>

    <template v-if="isSelected === 0">
      <div
        class="flex flex-row flex-wrap justify-center py-2 px-4 w-full item-center"
      >
        <a
          v-for="issue in issueData"
          :key="issue.id"
          :href="issue.url"
          target="_blank"
          rel="noopener"
          class="flex overflow-hidden py-4 w-1/2 flex-start text-xl"
        >
          <span
            class="flex justify-center m-2 w-16 h-16 text-reaction align-middle rounded-2xl border-1 border-card border-solid item-center"
          >
            {{ issue.repositoryName.slice(0, 1).toUpperCase() }}
          </span>
          <div>
            <div class="overflow-hidden font-bold text-base">
              {{ issue.title }}
            </div>
            <div class="flex overflow-hidden justify-between text-date">
              {{ dateFormat(issue.createdAt) }}
            </div>
          </div>
        </a>
      </div>
    </template>

    <template v-if="isSelected === 1">
      <div
        class="flex flex-row flex-wrap justify-center py-2 px-4 w-full item-center"
      >
        <a
          v-for="pullRequest in pullRequestData"
          :key="pullRequest.id"
          :href="pullRequest.url"
          target="_blank"
          rel="noopener"
          class="flex overflow-hidden py-4 w-1/2 flex-start text-xl"
        >
          <span
            class="flex justify-center m-2 w-16 h-16 text-reaction align-middle rounded-2xl border-1 border-card border-solid item-center"
          >
            {{ pullRequest.repositoryName.slice(0, 1).toUpperCase() }}
          </span>
          <div>
            <div class="overflow-hidden font-bold text-base">
              {{ pullRequest.title }}
            </div>
            <div class="flex overflow-hidden justify-between text-date">
              {{ dateFormat(pullRequest.createdAt) }}
            </div>
          </div>
        </a>
      </div>
    </template>
  </main-template>
</template>

<script lang="ts">
import {
  defineComponent,
  SetupContext,
  ref,
  useAsync
} from '@nuxtjs/composition-api'
import dayjs from 'dayjs'

import UserComposable from '~/composables/user'

import { fetchRepositories } from '~/services/githubService'

const MainTemplate = () => import('~/components/MainTemplate.vue')

export default defineComponent({
  components: {
    MainTemplate
  },
  middleware: 'auth',
  setup(props: {}, ctx: SetupContext) {
    const issueData = ref()
    const pullRequestData = ref()
    const userModule = UserComposable(props, ctx)
    const isSelected = ref<number>(0)
    const select = (val: number) => {
      isSelected.value = val
    }
    const dateFormat = (d: string) => {
      return dayjs(d).format('YYYY/MM/DD HH:mm')
    }
    useAsync(async () => {
      const { issues, pullRequests } = await fetchRepositories()
      issueData.value = issues
      pullRequestData.value = pullRequests
    })
    return {
      ...userModule,
      isSelected,
      select,
      dateFormat,
      issueData,
      pullRequestData
    }
  }
})
</script>
