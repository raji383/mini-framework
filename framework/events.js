// backward-compatible tiny wrapper used by older example code
export function MyaddEventListener(e, fn) {
    if (typeof fn === 'function') fn(e);
}