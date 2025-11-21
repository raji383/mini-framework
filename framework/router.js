import { createElement } from "./index.js";
const routes = {};

export function route(path, component) {

    routes[path] = createElement(component);
}

export function start() {
    window.addEventListener("hashchange",()=> {
        
    });
   renderRoute();
}

function renderRoute() {
    let path = window.location.hash.slice(1) || "/";
    console.log(path);
    
    if (path === "/Completed") {
        route(path, `<h1>${path}</h1>`);
    }else if (path === "/Active") {
        route(path, `<h1>${path}</h1>`);
    }
    const component = routes[path];
    document.getElementById("app").append(component);
}