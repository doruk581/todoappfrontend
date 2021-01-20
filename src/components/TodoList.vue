<template>
 <div>
     <input type="text" class="todo-input" placeholder="What needs to be done?" v-model="newtodo" data-newtodo @keyup.enter="addTodo"/>

    <div v-for="todo in todos" :key="todo.id" class="todo-item">
             {{todo.title}}
       <div class="remove-item" @click="removeTodo(todo.id)">
           &times;
       </div>
    </div>
 </div>
</template>

<script>
import axios from 'axios'

window.axios = require('axios')

export default {
  name: 'todo-list',
  data () {
    return {
      newtodo: '',
      idForTodo: 3,
      todos: [

      ]
    }
  },
  methods: {
    addTodo () {
      if (this.newtodo.trim().length === 0) {
        return
      }

      const todoData = {todo: this.newtodo}

      axios.post('http://localhost:4567/todo', todoData)
        .then(response => {
          this.todos.push({
            id: this.idForTodo,
            title: this.newtodo,
            completed: false
          })

          this.newtodo = ''
          this.idForTodo++
        }).catch(error => {
          alert('Error occurred')
          console.error('There was an error!', error)
        })
    },
    removeTodo (idToRemove) {
      var index = this.todos.map(function (item) {
        return item.id
      }).indexOf(idToRemove)

      this.todos.splice(index, 1)
    }
  }
}
</script>

<style>

.todo-input {
    width: 100%;
    padding: 10px 10px;
    font-size: 16px;
    margin-bottom: 16px;
}

.todo-input:focus {
    outline: 0;
}

.todo-item {
    margin-bottom: 12px;
    margin-left: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.remove-item {
    cursor: pointer;
    margin-left: 14px;
}
.remove-item:hover {
    color: black;
}

</style>
