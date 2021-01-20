import { mount } from '@vue/test-utils'
import TodoList from '../../../src/components/TodoList'

describe('The Todo.vue component', () => {
  it('Can be mounted', () => {
    const wrapper = mount(TodoList)
    expect(wrapper.exists()).toBeTruthy()
  })
})

describe('Todo item input', () => {
  it('renders a message and responds correctly to user input', () => {
    const wrapper = mount(TodoList, {
      data () {
        return {
          newtodo: '',
          idForTodo: 3,
          todos: [
            'Hello Todo'
          ]
        }
      }
    }
    )
    // see if the message renders
    expect(wrapper.find('.todo-item').text()).toEqual('×')
  })
})

describe('Key event tests', () => {
  it('Todos is zero by default', () => {
    const wrapper = mount(TodoList)
    expect(wrapper.vm.todos.length).toEqual(0)
  })
})

it('Enter key push empty todo item to list still empty', async () => {
  const wrapper = mount(TodoList)
  await wrapper.trigger('keydown.enter')
  expect(wrapper.vm.todos.length).toEqual(0)
})

it('Enter key push empty todo item to list still empty', async () => {
  const wrapper = mount(TodoList)
  await wrapper.find('.todo-input').setValue('SLEEP')
  await wrapper.find('.todo-input').trigger('keydown.enter')
  expect(wrapper.vm.todos.length).toEqual(0)
})
