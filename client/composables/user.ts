import { computed, SetupContext, ref } from '@nuxtjs/composition-api'

export default (props: {}, ctx: SetupContext) => {
  const email = ref('')
  const password = ref('')

  const userStatus = computed(() => {
    return ctx.root.$store.state.product.userStatus
  })

  const login = async () => {
    await ctx.root.$store.dispatch('product/signIn', {
      email: email.value,
      password: password.value
    })

    if (ctx.root.$store.state.product.userStatus) {
      await ctx.root.$router.push('/')
    }
  }

  const logout = async () => {
    await ctx.root.$store.dispatch('product/signOut')
    if (!ctx.root.$store.state.product.userStatus) {
      ctx.root.$router.push('/login')
    }
  }

  const applyEmail = (value) => {
    email.value = value
  }

  const applyPassword = (value) => {
    password.value = value
  }

  return {
    email,
    password,
    userStatus,
    login,
    logout,
    applyEmail,
    applyPassword
  }
}
