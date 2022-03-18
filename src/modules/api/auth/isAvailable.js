"use strict";

import getLS from '@/modules/tools/getLS'

let isAvailable = ()=>{     // 인증토큰이 유효한지 여부 파악하는 매서드
    let _auth = getLS("app_auth");  // 로컬 스토리지에서 app_auth 읽어오기
    if (!_auth) return false;   //  _auth(app_auth) 없다면 false 리턴 종료
    else if (!_auth.memberID) return false;   //  .memberID값 없다면 false 리턴 종료
    else {
        let now = Date.parse(new Date()),   //  현재 시간값 설정
            exp = Date.parse(_auth.expiryTime); // 종료시간 값 설정
        if (now < exp) {    //  만약 현재 시간이 종료시간 보다 작다면 (아직 종료시간 안된거라면) 
            return true;    //  true 리턴
        } else {
            return false;   //  시간 만료된거라... false
        }
    }
}
export default isAvailable;
