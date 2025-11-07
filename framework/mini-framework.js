export function createApp({ initialState, view, actions }) {
  Object.keys(actions).forEach(key => {
    const original = actions[key];
    window[key] = () => {
      state = original(state);
      render();
    };
  });

  let state = initialState;

  function render() {
    const app = document.getElementById("app");
    // app.innerHTML = view(state, actions);
    updateDom(app, app.firstChild, new DOMParser().parseFromString(view(state), 'text/html').body.firstChild);
  }

  actions = Object.fromEntries(
    Object.entries(actions).map(([name, fn]) => [
      name,
      (...args) => {
        state = fn(state, ...args);
        render();
      }
    ])
  );


  render();
}
HTMLElement.prototype.myAddEventListener = function (event, callback) {
  if (!this._eventStore) {
    this._eventStore = {};
  }

  if (!this._eventStore[event]) {
    this._eventStore[event] = [];

    this.addEventListener(event, (e) => {
      this._eventStore[event].forEach(fn => fn(e));
    });
  }

  this._eventStore[event].push(callback);
};



function updateDom(parent, oldNode, newNode) {
  if (!oldNode) {
    parent.appendChild(newNode);
  } else if (!newNode) {
    parent.removeChild(oldNode);
  } else if (oldNode.nodeType === 3 && newNode.nodeType === 3) {
    // text node
    if (oldNode.nodeValue !== newNode.nodeValue) {
      oldNode.nodeValue = newNode.nodeValue;
    }
  } else if (oldNode.nodeName !== newNode.nodeName) {
    parent.replaceChild(newNode, oldNode);
  } else {
    const oldChildren = oldNode.childNodes;
    const newChildren = newNode.childNodes;
    for (let i = 0; i < newChildren.length || i < oldChildren.length; i++) {
      updateDom(oldNode, oldChildren[i], newChildren[i]);
    }
  }
}
