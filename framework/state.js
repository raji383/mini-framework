import { render } from "./render.js";

export function setState(App, CLaSS) {
  const mount = document.getElementById(CLaSS);
  if (!mount) return;
  const tree = App();
  render(tree, mount);
}

