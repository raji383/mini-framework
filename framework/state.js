export function createState(initialValue) {
    let value = initialValue;
    let listeners = [];

    function get() {
        return value;
    }

   

    function set(fn) {
        listeners.push(fn);
        
    }

    return { get, set };
}
