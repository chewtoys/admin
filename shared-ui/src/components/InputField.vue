<script setup lang="ts">
interface IInputFieldEmit {
  (e: 'onChange', value: string): void
}

const props = defineProps({
  idLabel: {
    type: String,
    required: true
  },
  titleLabel: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
})
const emit = defineEmits<IInputFieldEmit>()

const handleChange = (e) => {
  if (!(e.target instanceof HTMLInputElement)) {
    return
  }
  emit('onChange', e.target.value)
}
</script>

<template>
  <label
    :for="idLabel"
    class="block mb-2 font-medium text-black text-sm"
  >
    {{ titleLabel }}
    <input
      :id="idLabel"
      :type="type"
      class="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border focus:ring-blue-500 text-sm border-gray-300 focus:border-blue-500"
      :placeholder="placeholder"
      :required="required"
      @input="handleChange"
    />
  </label>
</template>
