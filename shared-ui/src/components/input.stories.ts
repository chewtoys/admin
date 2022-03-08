import { Story } from '@storybook/vue3'
import InputField from './InputField.vue'

export default {
  title: 'Example/InputField',
  component: InputField,
  argTypes: {
    idLabel: { control: 'string' },
    titleLabel: { control: 'string' },
    placeholder: { control: 'string' },
  },
}

const Template: Story = (args) => ({
  components: { InputField },
  setup() {
    return { args }
  },
  template: '<input-field v-bind="args" />',
})

export const Primary = Template.bind({})
Primary.args = {
  idLabel: 'custom-input',
  titleLabel: 'Form',
  placeholder: 'Please input',
}
