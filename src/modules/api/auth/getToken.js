"use strict";

import getLS from '@/plugins/tools/getLS'

let getToken = ()=>{    //  로컬스토리지를 읽어서 현재 유효한 인증토큰이 있는지 여부만 파악하여 이를 전달 해주는 매서드
    let _auth = getLS("app_auth");  //  로컬스토리지의 "app_auth" 값 불러오기
    if (!_auth) return '';  //  깂이 없다면 '' 전달 
    else if (!_auth.memberID) return '';  //  깂이 있지만 memberID 값이 없다면 역시 '' 전달 
    else {
        let now = Date.parse(new Date()),
            exp = Date.parse(_auth.expiryTime);
        if (now < exp) {
            return "REQUIRE_REFRESH";   //  깂이 있지만 시간상 이미 만료 되었다면 토큰 대신 "REQUIRE_REFRESH" 문구 전달
        } else {
            return _auth.access;    //  유효한 인증값이라면 인증 토큰 전송
        }
    }
}
export default getToken;
