let oldTree = null;

export function render(newTree, container) {
    if (oldTree === null) {
        container.innerHTML = "";
        container.appendChild(createElement(newTree));
    } else {
        updateElement(container, newTree, oldTree);
    }

    oldTree = newTree;
}

export function updateElement(parent, newNode, oldNode, index = 0) {
    const existing = parent.childNodes[index];

    if (!oldNode) {
        parent.appendChild(createElement(newNode));
        return;
    }

    if (!newNode) {
        parent.removeChild(existing);
        return;
    }

    if (changed(newNode, oldNode)) {
        parent.replaceChild(createElement(newNode), existing);
        return;
    }

    updateProps(existing, newNode.props || {}, oldNode.props || {});

    const newLength = newNode.children?.length || 0;
    const oldLength = oldNode.children?.length || 0;

    for (let i = 0; i < newLength || i < oldLength; i++) {
        updateElement(existing, newNode.children[i], oldNode.children[i], i);
    }
}
