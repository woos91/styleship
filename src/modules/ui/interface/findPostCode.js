"use strict";

let findPostCode = (el, callBack, searchKeyword)=>{
    let cfg = {q: searchKeyword||'' }, _cl = this;
    if (!window.daum) loadScript();
    else if (!window.daum.Postcode) loadScript();
    else {
        showApi();
    }
    function loadScript() {
        let el = document.createElement('script');
        el.setAttribute('type', 'text/javascript');
        el.setAttribute('src', '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');
        document.getElementsByTagName('head')[0].appendChild(el);
        el.onload = function(){
            showApi();
        };
    }
    function showApi () {
        if (!window.daum) {
            setTimeout(showApi, 10);
            return;
        }
        if (!window.daum.Postcode) {
            setTimeout(showApi, 10);
            return;
        }
        new window.daum.Postcode({
            oncomplete: (data) => {  
                let fullRoadAddr = data.roadAddress; 
                let fullJibunAddr = data.jibunAddress;
                let extraRoadAddr = '';
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){ 
                    extraRoadAddr += data.bname; 
                } 
                if(data.buildingName !== ''){ 
                    extraRoadAddr += (extraRoadAddr !== '' ? ',' + data.buildingName : data.buildingName); 
                } 
                if(extraRoadAddr !== ''){ 
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                } 
                if(fullRoadAddr !== ''){ 
                    fullRoadAddr += extraRoadAddr; 
                } 
                if(fullJibunAddr !== ''){ 
                    fullJibunAddr += extraRoadAddr; 
                } 
                data.zipcode = data.zonecode;
                data.roadAddressFull = fullRoadAddr;
                data.jibunAddressFull = fullJibunAddr;
                callBack.call(_cl, data);
            } 
        }).embed(el,cfg);
    }
    showApi();
}
export default findPostCode;
