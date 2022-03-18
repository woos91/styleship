function setStyle (elem, styleValue, styleText){
    let target = elem;
    if (typeof styleValue === "string" && arguments.length>2) {
        target.style[styleValue] = styleText;
    } else if (typeof styleValue === "object") {
        for (var key in styleValue) {
                if (key==="width"||key==="height"||key==="min-width"||key==="min-height"||key==="max-width"||key==="max-height"||key==="left"||key==="top"||key==="right"||key==="bottom"||key==="margin"||key==="margin-left"||key==="margin-top"||key==="margin-right"||key==="margin-bottom"||key==="padding"||key==="padding-block-start"||key==="padding-block-end"||key==="padding-left"||key==="padding-top"||key==="padding-right"||key==="padding-bottom"||key==="font-size"||key==="line-height"||key==="border-width"||key==="border-top-width"||key==="border-right-width"||key==="border-bottom-width"||key==="border-right-width") {
                        if (typeof styleValue[key] === "number") styleValue[key] = String(styleValue[key])+"px";
                }
                target.style[key] = styleValue[key];
        }
    }
}
export default setStyle;