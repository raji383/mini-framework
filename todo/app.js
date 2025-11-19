import { route, start } from "../framework/router.js";
import { createState } from "../framework/state.js";
const todos = createState([]);



function renderApp(value, Class, class2) {

    const todoList = document.querySelector(Class);
    if (!todoList) return;
    const li = document.createElement(class2);
    li.appendChild(document.createTextNode(value));
    todoList.appendChild(li);
}

const todoPage = {
    tag: "div",
    props: { class: "container" },
    children: [
        {
            tag: "h1",
            children: ["todos"]
        },
        {
            tag: "div",
            props: { class: "todo-app" },
            children: [
                {
                    tag: "div",
                    props: { class: "input-section" },
                    children: [
                        {
                            tag: "button",
                            props: { class: "toggle-all" },
                            children: ["❯"]
                        },
                        {
                            tag: "input",
                            props: {
                                class: "new-todo",
                                id: "new",
                                placeholder: "What needs to be done?",
                                autofocus: true,
                                onkeydown: (e) => { addTodo(e); }
                            }
                        }
                    ]
                },

                { tag: "ul", props: { class: "todo-list" }, children: [] },

                {
                    tag: "div",
                    props: { class: "footer" },
                    children: [
                        {
                            tag: "span",
                            props: { class: "todo-count" },
                            children: [
                                { tag: "strong", children: ["0"] },
                                " items left"
                            ]
                        },

                        {
                            tag: "ul",
                            props: { class: "filters" },
                            children: [
                                {
                                    tag: "li",
                                    children: [
                                        {
                                            tag: "button",
                                            props: {
                                                id: "1",
                                                onclick: (e) => {
                                                    window.location.hash = "#/";
                                                    document
                                                        .querySelectorAll(".filters button")
                                                        .forEach(btn => btn.classList.remove("selected"));
                                                    e.target.classList.add("selected");

                                                }
                                            },
                                            children: ["All"]
                                        }
                                    ]
                                },

                                {
                                    tag: "li",
                                    children: [
                                        {
                                            tag: "button",
                                            props: {
                                                onclick: (e) => {
                                                    window.location.hash = "#/Active";
                                                    document
                                                        .querySelectorAll(".filters button")
                                                        .forEach(btn => btn.classList.remove("selected"));
                                                    e.target.classList.add("selected");

                                                }
                                            },
                                            children: ["Active"]
                                        }
                                    ]
                                },

                                {
                                    tag: "li",
                                    children: [
                                        {
                                            tag: "button",
                                            props: {
                                                onclick: (e) => {
                                                    window.location.hash = "#/Completed";
                                                    document
                                                        .querySelectorAll(".filters button")
                                                        .forEach(btn => btn.classList.remove("selected"));
                                                    e.target.classList.add("selected");
                                                }
                                            },
                                            children: ["Completed"]
                                        }
                                    ]
                                }
                            ]
                        },

                        {
                            tag: "button",
                            props: { class: "clear-completed" },
                            children: ["Clear completed"]
                        }
                    ]
                }
            ]
        }
    ]
};
function addTodo(e) {
    const value = e.target.value.trim();
    if (e.key === "Enter" && value !== "") {
        todos.set(renderApp(value, ".todo-list", "li"));
        e.target.value = "";
    }
}


route("/", todoPage);



start();
