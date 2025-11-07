import { createApp } from '../framework/mini-framework.js';
var todoList = [];

createApp({
  initialState: "",
  actions: {
    addTodo: (state) => { },
    removTodo: (state) => { },
  },
  view: (state) => DOM()
});



function app() {

  const input = document.getElementById("new");
  const form = document.getElementById("form")
  form.myAddEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (value) {
      const tod = {
        "id": todoList.length,
        "value": value,
        "type": ""
      }
      todoList.push(tod);
      input.value = "";
      console.log(todoList.length);

      createApp({
        initialState: "",
        actions: {
          addTodo: (state) => { },
          SelectTodo: (id) => {
            const todo = todoList.find(t => t.id === id);
            console.log('fff',id);
            
            if (!todo) return;
            todo.type = todo.type === "valid" ? "" : "valid"; 
            
          },
          removTodo: (state) => { },
        },
        view: (state) => DOM()
      });
    }
  });
}



function DOM() {
  return (
    `
      <div class="container">
          <h1>todos</h1>
          
          <div class="todo-app" onclick="addTodo()">
            <form id="form" >
                <div class="input-section"  >
                    <button class="toggle-all">❯</button>
                    <input  class="new-todo"  id="new" placeholder="What needs to be done?" autofocus>
                </div>
            </form>
  
              <ul class="todo-list">
              ${todoList.map(todo => `
                  <li class="todo-item">
                      <input class="toggle" type="checkbox" onclick="SelectTodo(${todo.id})">
                      <span class="todo-text">${todo.value}</span>
                      <button class="destroy">&times;</button>
                  </li>
              `).join('')}
                 
              </ul>
  
              <div class="footer">
                  <span class="todo-count"><strong>2</strong> items left</span>
                  
                  <ul class="filters">
                      <li><button class="selected">All</button></li>
                      <li><button>Active</button></li>
                      <li><button>Completed</button></li>
                  </ul>
  
                  <button class="clear-completed">Clear completed</button>
              </div>
          </div>
  
          <div class="info">
              <p>Double-click to edit a todo</p>
              <p>Created by Claude</p>
          </div>
      </div>
    `
  )
}
app()