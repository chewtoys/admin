import { ref, computed, SetupContext, watch } from '@vue/composition-api'

interface MenuItem {
  id: number
  name: string
  price: number
  image: string
  selected: boolean
}

type MenuItems = {
  [key: string]: Array<MenuItem>
}

type MenuCategoryItems = {
  [key: string]: { [key: string]: Array<MenuItem> }
}

type CardProps = {
  form: object | any
  menus: MenuItems | MenuCategoryItems
}

export default (props: CardProps, ctx: SetupContext) => {
  const currentMenuCategory = ref<number>(0)
  const currentSegment = ref<number>(0)

  const currentPage = ref<number>(1)
  const prevPageEnabled = ref<boolean>(false)
  const nextPageEnabled = ref<boolean>(true)

  const menuCategories = computed(() => Object.keys(props.menus))

  const segments = computed(() => {
    const category = menuCategories.value[currentMenuCategory.value]
    if (Array.isArray(props.menus[category])) {
      // セグメントが存在しない場合
      return null
    }
    return Object.keys(props.menus[category])
  })

  const getItems = computed(() => {
    const category = menuCategories.value[currentMenuCategory.value]
    if (segments.value === null) {
      // セグメントが存在しない場合
      return Array(props.menus[category]).filter((menu: any, index: number) => {
        if (
          (currentPage.value - 1) * perPage.value <= index &&
          index < currentPage.value * perPage.value &&
          menu.selected === true
        ) {
          return menu
        }
      })
    }
    const segment = segments.value[currentSegment.value]
    return props.menus[category][segment].filter((menu: any, index: number) => {
      if (
        (currentPage.value - 1) * perPage.value <= index &&
        index < currentPage.value * perPage.value &&
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
    const category = menuCategories.value[currentMenuCategory.value]
    if (segments.value === null) {
      // セグメントが存在しない場合
      return Math.ceil(
        Array(props.menus[category]).filter((menu: any) => menu.selected === true).length /
          perPage.value,
      )
    }
    const segment = segments.value[currentSegment.value]
    return Math.ceil(
      props.menus[category][segment].filter((menu: any) => menu.selected === true).length /
        perPage.value,
    )
  })

  const getMenuLink = (item: any) => {
    return props.form !== null
      ? 'javascript:void(0)'
      : `tableOrder://addOrder?itemId=${item.id}&itemName=${item.name}&salesPrice=${item.price}`
  }

  const getPageStyle = (val: number) => {
    return currentPage.value === val ? 'disabled' : ''
  }

  const prevPage = () => {
    if (prevPageEnabled.value === true) {
      currentPage.value -= 1
    }
  }

  const nextPage = () => {
    if (nextPageEnabled.value === true) {
      currentPage.value += 1
    }
  }

  watch(
    () => currentPage,
    (page, newVal) => {
      if (currentPage.value === 1) {
        prevPageEnabled.value = false
        nextPageEnabled.value = true
      } else if (page.value === pages.value) {
        prevPageEnabled.value = true
        nextPageEnabled.value = false
      } else {
        prevPageEnabled.value = true
        nextPageEnabled.value = true
      }
    },
  )

  return {
    currentMenuCategory,
    currentSegment,
    currentPage,
    prevPageEnabled,
    nextPageEnabled,
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
    nextPage,
  }
}
