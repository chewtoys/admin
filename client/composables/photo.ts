import { SetupContext, ref } from '@nuxtjs/composition-api'
import firebase from 'firebase/compat/app'

import { addPhoto } from '~/services/photoService'

export default (props: {}, ctx: SetupContext) => {
  const name = ref('')
  const content = ref('')

  const reset = () => {
    name.value = ''
    content.value = ''
  }

  const postPhoto = async () => {
    await addPhoto({
      name: name.value,
      content: content.value,
    })
    reset()
  }

  const onFileChange = (e) => {
    const files = e.target.files
    name.value = files[0].name.replace(/.png/g, '')

    const fr = new FileReader()
    fr.readAsDataURL(files[0])
    fr.addEventListener('load', () => {
      upload(files[0])
    })
  }

  const upload = (file) => {
    const storageRef = firebase.storage().ref().child(`/aviation/${name.value}`)
    storageRef.put(file).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        content.value = downloadURL
      })
    })
  }

  return {
    name,
    content,
    reset,
    postPhoto,
    onFileChange,
    upload,
  }
}
