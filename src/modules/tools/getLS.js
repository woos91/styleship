"use strict";

let getLS = (valueName)=>{
    let _ls = localStorage.getItem(valueName);
    if (!_ls) return undefined;
    else if (_ls.substr(0,1) == "[" || _ls.substr(0,1) == "{") {
        return JSON.parse(_ls);
    } else {
        return _ls;
    }
}
export default getLS;
