import { render } from "./render.js";
export function setState(newValue) {
  state = { ...state, ...newValue };
  render(App(), document.getElementById("root"));
}
function App() {
  return {
    tag: "div",
    props: {},
    children: state.todos.map(todo => ({
      tag: "p",
      children: [todo]
    }))
  };
}
