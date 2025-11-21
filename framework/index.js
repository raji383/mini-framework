export function createElement(vnode) {
    if (vnode === undefined || vnode === null) return document.createTextNode("");

    if (typeof vnode === "string" || typeof vnode === "number") {
        return document.createTextNode(String(vnode));
    }

    const el = document.createElement(vnode.tag);

    // props
    for (let key in vnode.props || {}) {
        if (key.startsWith("on") && typeof vnode.props[key] === "function") {
            const eventName = key.slice(2).toLowerCase();
            el.addEventListener(eventName, vnode.props[key]);
            continue;
        }

        if (key === "class") {
            el.className = vnode.props[key];
            continue;
        }

        if (key === "style" && typeof vnode.props[key] === "object") {
            Object.assign(el.style, vnode.props[key]);
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



