import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

type Params = {
  email: string
  password: string
}

export const signIn = async (params: Params) => {
  let result: boolean = false
  await firebase
    .auth()
    .signInWithEmailAndPassword(params.email, params.password)
    .then((response) => {
      result = true
    })
  return result
}

export const signOut = async () => {
  let result: boolean = true
  await firebase
    .auth()
    .signOut()
    .then((response) => {
      result = false
    })
  return result
}
