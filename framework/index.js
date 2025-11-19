export function createElement(node) {
    if (typeof node === "string") return document.createTextNode(node);

    const el = document.createElement(node.tag);


    if (node.props) {
        Object.keys(node.props).forEach(key => {
            if (key !== "class") {

                el[key] = node.props[key];
            } else {
                el["className"] = node.props[key];
            }
            if (key == "class") {

            }
        });
    }

    if (node.children) {
        node.children.forEach(child => el.appendChild(createElement(child)));
    }

    return el;
}


