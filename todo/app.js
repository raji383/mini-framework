import { route, start } from "../framework/router.js";
import { setState } from "../framework/state.js";
import { MyaddEventListener } from "../framework/events.js";
let state = {
    todos: []
};


const todoPage = {
    tag: "div",
    props: { class: "container" },
    children: [

        {
            tag: "div",
            props: { class: "todo-app" },
            children: [
                {
                    tag: "section",
                    props: {
                        class: "todoapp",
                        id: "root"
                    },
                    children: [
                        {
                            tag: "header",
                            props: {
                                class: "header",
                                "data-testid": "header"
                            },
                            children: [
                                {
                                    tag: "h1",
                                    children: ["todos"]
                                },
                                {
                                    tag: "div",
                                    props: { class: "input-container" },
                                    children: [
                                        {
                                            tag: "input",
                                            props: {
                                                class: "new-todo",
                                                id: "todo-input",
                                                type: "text",
                                                "data-testid": "text-input",
                                                placeholder: "What needs to be done?",
                                                value: "",
                                                autofocus: true,
                                                onkeydown: (e) => {
                                                    addTodo(e)

                                                }
                                            }
                                        },
                                        {
                                            tag: "label",
                                            props: {
                                                class: "visually-hidden",
                                                for: "todo-input"
                                            },
                                            children: ["New Todo Input"]
                                        }
                                    ]
                                }
                            ]
                        },

                        {
                            tag: "main",
                            props: {
                                class: "main",
                                "data-testid": "main"
                            },
                            children: [
                                {
                                    tag: "ul",
                                    props: {
                                        class: "todo-list",
                                        "data-testid": "todo-list",
                                        id: "todo-list"
                                    },
                                    children: []
                                }
                            ]
                        },


                    ]
                }


            ]
        },
        {
            tag: "footer",
            props: { class: "info" },
            children: [
                {
                    tag: "p",
                    children: ["Double-click to edit a todo"]
                },
                {
                    tag: "p",
                    children: ["Created by theis Team"]
                },
                {
                    tag: "p",
                    children: [
                        "Part of ",
                        {
                            tag: "a",
                            props: { href: "https://learn.zone01oujda.ma/intra/oujda/profile?event=41" },
                            children: ["zone01"]
                        }
                    ]
                }
            ]
        }

    ]
};
function App() {


    return [
        {
            tag: "header",
            props: {
                class: "header",
                "data-testid": "header"
            },
            children: [
                {
                    tag: "h1",
                    children: ["todos"]
                },
                {
                    tag: "div",
                    props: { class: "input-container" },
                    children: [
                        {
                            tag: "input",
                            props: {
                                class: "new-todo",
                                id: "todo-input",
                                type: "text",
                                "data-testid": "text-input",
                                placeholder: "What needs to be done?",
                                value: "",
                                autofocus: true,
                                onkeydown: (e) => {
                                    MyaddEventListener(e, addTodo);
                                }
                            }
                        },
                        {
                            tag: "label",
                            props: {
                                class: "visually-hidden",
                                for: "todo-input"
                            },
                            children: ["New Todo Input"]
                        }
                    ]
                }
            ]
        },

        {
            tag: "main",
            props: {
                class: "main",
                "data-testid": "main"
            },
            children: [
                {
                    tag: "ul",
                    props: {
                        class: "todo-list",
                        "data-testid": "todo-list",
                        id: "todo-list"
                    },
                    children: state.todos.map((todo, i) => ({
                        tag: "li",
                        props: {
                            class: todo.completed ? "completed" : "",
                            "data-testid": "todo-item"
                        },
                        children: [
                            {
                                tag: "div",
                                props: { class: "view" },
                                children: [
                                    {
                                        tag: "input",
                                        props: {
                                            class: "toggle",
                                            type: "checkbox",
                                            "data-testid": "todo-item-toggle",
                                            onclick: () => {
                                                MyaddEventListener(i, completTodo);
                                            }
                                        }
                                    },
                                    {
                                        tag: "label",
                                        key: i,
                                        props: {
                                            "data-testid": "todo-item-label"
                                        },
                                        children: [todo.v]
                                    },
                                    {
                                        tag: "button",
                                        props: {
                                            class: "destroy",
                                            "data-testid": "todo-item-button",
                                            onclick: () => {
                                                MyaddEventListener(i, deleteTodo);
                                            }

                                        },
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }))
                }
            ]
        },
        {
            tag: "footer",
            props: {
                class: "footer",
                "data-testid": "footer"
            },
            children: [
                {
                    tag: "span",
                    props: { class: "todo-count" },
                    children: ["1 item left!"]
                },
                {
                    tag: "ul",
                    props: {
                        class: "filters",
                        "data-testid": "footer-navigation"
                    },
                    children: [
                        {
                            tag: "li",
                            children: [
                                {
                                    tag: "a",
                                    props: {
                                        class: "selected",
                                        href: "#/"
                                    },
                                    children: ["All"]
                                }
                            ]
                        },
                        {
                            tag: "li",
                            children: [
                                {
                                    tag: "a",
                                    props: {
                                        class: "",
                                        href: "#/active"
                                    },
                                    children: ["Active"]
                                }
                            ]
                        },
                        {
                            tag: "li",
                            children: [
                                {
                                    tag: "a",
                                    props: {
                                        class: "",
                                        href: "#/completed"
                                    },
                                    children: ["Completed"]
                                }
                            ]
                        }
                    ]
                },
                {
                    tag: "button",
                    props: {
                        class: "clear-completed",
                        disabled: "",
                        onclick: () => {
                            MyaddEventListener(null, clearCompleted);
                        }

                    },
                    children: ["Clear completed"]
                }
            ]
        }
    ];
}



function addTodo(e) {
    const value = e.target.value.trim();

    if (e.key === "Enter" && value.length >= 3) {
        state.todos.push({ v: value, completed: false });
        setState(App, "root");
        e.target.value = "";
    }
}
function deleteTodo(i) {

    state.todos = state.todos.filter((_, index) => index !== i);
    setState(App, "root");
}
function completTodo(i) {
    state.todos = state.todos.map((todo, index) => {
        if (index === i) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    setState(App, "root");
}
function clearCompleted(i=0) {
    console.log(i);

    state.todos = state.todos.filter(todo => !todo.completed);
    setState(App, "root");
}
route("/", todoPage);
start();
