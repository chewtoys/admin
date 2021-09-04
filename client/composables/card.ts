import { computed, SetupContext, reactive, watch } from '@vue/composition-api'

type CardProps = {
  form: object | any
  menus: object | any
}

export default (props: CardProps, ctx: SetupContext) => {
  const state = reactive({
    currentCategory: 0,
    currentSegment: 0,
    currentPage: 1,
    prevPageEnabled: false,
    nextPageEnabled: true
  })

  const menuCategories = computed(() => Object.keys(props.menus))

  const segments = computed(() => {
    const category = menuCategories.value[state.currentCategory]
    if (Array.isArray(props.menus[category])) {
      // セグメントが存在しない場合
      return null
    }
    return Object.keys(props.menus[category])
  })

  const getItems = computed(() => {
    const category = menuCategories.value[state.currentCategory]
    if (segments.value === null) {
      // セグメントが存在しない場合
      return props.menus[category].filter((menu: any, index: number) => {
        if (
          (state.currentPage - 1) * perPage.value <= index &&
          index < state.currentPage * perPage.value &&
          menu.selected === true
        ) {
          return menu
        }
      })
    }
    const segment = segments.value[state.currentSegment]
    return props.menus[category][segment].filter((menu: any, index: number) => {
      if (
        (state.currentPage - 1) * perPage.value <= index &&
        index < state.currentPage * perPage.value &&
        menu.selected === true
      ) {
        return menu
      }
    })
  })

  const getTheme = computed(() => '#f18e00')

  const getColumns = computed(() => {
    const ColumnsId = props.form !== null ? props.form.columns : 0
    if (ColumnsId === 0) {
      return 'menu__item--small'
    } else if (ColumnsId === 1) {
      return 'menu__item--medium'
    } else if (ColumnsId === 2) {
      return 'menu__item--large'
    }
    return ''
  })

  const perPage = computed(() => {
    const ColumnsId = props.form !== null ? props.form.columns : 0
    if (ColumnsId === 0) {
      return 6
    } else if (ColumnsId === 1) {
      return 4
    } else if (ColumnsId === 2) {
      return 2
    }
    return 0
  })

  const pages = computed(() => {
    const category = menuCategories.value[state.currentCategory]
    if (segments.value === null) {
      // セグメントが存在しない場合
      return Math.ceil(
        props.menus[category].filter((menu: any) => menu.selected === true)
          .length / perPage.value
      )
    }
    const segment = segments.value[state.currentSegment]
    return Math.ceil(
      props.menus[category][segment].filter(
        (menu: any) => menu.selected === true
      ).length / perPage.value
    )
  })

  const getMenuLink = (item: any) => {
    return props.form !== null
      ? 'javascript:void(0)'
      : `tableOrder://addOrder?itemId=${item.id}&itemName=${item.name}&salesPrice=${item.price}`
  }

  const getPageStyle = (val: number) => {
    return state.currentPage === val ? 'disabled' : ''
  }

  const prevPage = () => {
    if (state.prevPageEnabled === true) {
      state.currentPage -= 1
    }
  }

  const nextPage = () => {
    if (state.nextPageEnabled === true) {
      state.currentPage += 1
    }
  }

  watch(
    () => state.currentPage,
    (currentPage, newVal) => {
      if (currentPage === 1) {
        state.prevPageEnabled = false
        state.nextPageEnabled = true
      } else if (currentPage === pages.value) {
        state.prevPageEnabled = true
        state.nextPageEnabled = false
      } else {
        state.prevPageEnabled = true
        state.nextPageEnabled = true
      }
    }
  )

  return {
    state,
    menuCategories,
    segments,
    getItems,
    getTheme,
    getColumns,
    perPage,
    pages,
    getMenuLink,
    getPageStyle,
    prevPage,
    nextPage
  }
}
