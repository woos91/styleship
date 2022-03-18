"use strict";

let extend = function (target, source) {
    if (target.constructor !== Object) {
        console.warn("target(first argument)이 Object type이 아니므로 병합하지 않고 source object(second argument)를 반환합니다."); 
        return source;
    }
    if (source.constructor !== Object) {
        console.warn("source(second argument)가 Object type이 아니므로 병합하지 않고 target object(first argument)를 반환합니다."); 
        return target;
    }
    for (var key in Object.keys(source)) {
        if (source[key] !== null && source[key] !== undefined) {
            if (source[key].constructor === Object) {
                Object.assign({}, target[key] || {}, extend(target[key] || {}, source[key]))
            }
        }
    }
    return Object.assign({}, target || {}, source);
}

export default extend
