import { Story } from '@storybook/vue3'
import ButtonField from './ButtonField.vue'

export default {
  title: 'Example/ButtonField',
  component: ButtonField,
  argTypes: {
    titleLabel: { control: 'string' },
  },
}

const Template: Story = (args) => ({
  components: { ButtonField },
  setup() {
    return { args }
  },
  template: '<button-field v-bind="args" />',
})

export const Primary = Template.bind({})
Primary.args = {
  titleLabel: 'Click',
}
