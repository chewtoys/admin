import { SetupContext, ref } from '@nuxtjs/composition-api'

export default (props, ctx: SetupContext) => {
  const activePage = ref(1)
  const perPage = ref(20)

  const titleText = (item: any) => {
    return item.data.title
  }

  const descriptionText = (item: any) => {
    return item.data.description
  }

  const applyPage = (value: number) => {
    activePage.value = value
  }

  const cancel = () => {
    //
  }

  return {
    activePage,
    perPage,
    titleText,
    descriptionText,
    applyPage,
    cancel
  }
}
