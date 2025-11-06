export function createApp(config) {
  let state = config.state()

  function setState(newState) {
    state = { ...state, ...newState }
    renderApp()
  }
  console.log(config);
  

  function renderApp() {
    document.getElementById(config.root).innerHTML = config.render(state, setState)
  }

  renderApp()
}
