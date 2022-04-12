"use strict";

let scrollTo = (element, to, duration, direction)=> {
    duration = duration||600;
    direction = direction||"y";
    let start, change, currentTime, increment, animateScroll;
    if (direction == "y") {
        start = element.scrollTop;
    } else if (direction == "x") {
        start = element.scrollLeft;
    }
    change = to - start;
    currentTime = 0;
    increment = 20;

    animateScroll = function(){        
        currentTime += increment;
        let val = easeInOutQuad(currentTime, start, change, duration);
        if (direction == "y") {
            element.scrollTop = val;
        } else if (direction == "x") {
            element.scrollLeft = val;
        }
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    function easeInOutQuad(currentTime, startValue, changeInValue, duration) {
        currentTime /= duration/2;
        if (currentTime < 1) return changeInValue/2*currentTime*currentTime + startValue;
        currentTime--;
        return -changeInValue/2 * (currentTime*(currentTime-2) - 1) + startValue;
    }
    animateScroll();
}
export default scrollTo;