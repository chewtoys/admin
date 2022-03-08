<script setup lang="ts">
interface ITextareaFieldEmit {
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
  rows: {
    type: Number,
    required: true
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
const emit = defineEmits<ITextareaFieldEmit>()

const handleChange = (e) => {
  if (!(e.target instanceof HTMLTextAreaElement)) {
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
    <textarea
      :id="idLabel"
      class="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border focus:ring-blue-500 text-sm border-gray-300 focus:border-blue-500"
      :rows="rows"
      :placeholder="placeholder"
      :required="required"
      @input="handleChange"
    />
  </label>
</template>
