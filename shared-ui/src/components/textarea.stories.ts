import { Story } from '@storybook/vue3'
import TextareaField from './TextareaField.vue'

export default {
  title: 'Example/TextareaField',
  component: TextareaField,
  argTypes: {
    idLabel: { control: 'string' },
    titleLabel: { control: 'string' },
    rows: { control: 'number' },
  },
}

const Template: Story = (args) => ({
  components: { TextareaField },
  setup() {
    return { args }
  },
  template: '<textarea-field v-bind="args" />',
})

export const Primary = Template.bind({})
Primary.args = {
  idLabel: 'custom-input',
  titleLabel: 'Form',
  rows: 5,
}
