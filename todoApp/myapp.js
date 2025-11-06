import { createApp } from "../mini-framework.js"

createApp({
    root: "app",
    state: () => ({ todos: [] }),

    render(state, setState) {
        function addTodo() {
            const input = document.getElementById("todo")
            if (input.value.trim()) {
                setState({ todos: [...state.todos, input.value] })
                input.value = ""
            }
        }

        window.addTodo = addTodo

        return `
      <input id="todo" />
      <button onclick="addTodo()">Add</button>
      <ul>
        ${state.todos.map(t => `<li>${t}</li>`).join("")}
      </ul>
    `
    }
})
