export function createElement(vnode) {
    if (typeof vnode === "string" || typeof vnode === "number") {
        return document.createTextNode(vnode);
    }

    const el = document.createElement(vnode.tag);

    // props
    for (let key in vnode.props || {}) {

        if (key.startsWith("on") && typeof vnode.props[key] === "function") {
            const eventName = key.slice(2).toLowerCase(); 
            el.addEventListener(eventName, vnode.props[key]);
            continue;
        }

        el.setAttribute(key, vnode.props[key]);
    }

    // children
    (vnode.children || []).forEach(child => {
        el.appendChild(createElement(child));
    });

    return el;
}

export function changed(n1, n2) {
    return typeof n1 !== typeof n2 ||
        (typeof n1 === "string" && n1 !== n2) ||
        n1.tag !== n2.tag;
}
export function updateProps(el, newProps, oldProps) {
    // remove old props
    for (let key in oldProps) {
        if (!(key in newProps)) {
            el.removeAttribute(key);
        }
    }

    // add/update new props
    for (let key in newProps) {
        if (newProps[key] !== oldProps[key]) {
            el.setAttribute(key, newProps[key]);
        }
    }
}
