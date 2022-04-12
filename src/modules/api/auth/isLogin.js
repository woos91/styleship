"use strict";

import getLS from '@/modules/tools/getLS'
import isAvailable from './isAvailable'
import refresh from './refresh'

//////////////////////////////// 로그인이 되어있는지 아닌지. 
//////////////////////////////// 로그인되어 있다면 인증 만료전인지 아닌지
//////////////////////////////// 인증 만료되었다면 갱신까지 시도하여
//////////////////////////////// 로그인 상태를 정리 후 로그인, 로그아웃 상태의 매서드 실행
let isLogin = (isLoginMethod, isLogoutMethod)=>{
    
    isLoginMethod = isLoginMethod||function(){};    // 넘겨받은 콜백함수 인자값이 없다면 빈 함수 생성
    isLogoutMethod = isLogoutMethod||function(){};    // 넘겨받은 콜백함수 인자값이 없다면 빈 함수 생성
    let _auth = getLS("app_auth")   //  로컬스토리지에서 인증정보 읽어오기
    if (!_auth) {   //  인증 정보가 없다면
        isLogoutMethod.call(this);  //  로그아웃 상태의 콜백함수 실행
    } else if (!_auth.memberID) {   //  인증 정보는 있지만 로그인 상태가 아니라면(아이디가 없다면)
        isLogoutMethod.call(this);  //  로그아웃 상태의 콜백함수 실행
    } else {   //  인증 정보가 있다면
        if (isAvailable) {  //  인증 정보가 아직 유효하다면
            isLoginMethod.call(this);  //  로그인 상태의 콜백함수 실행
        } else {  //  인증 정보가 만료등의 이유로 유효하지 않다면
            refresh(    //  액세스토큰 리프레시를 실행하기
                isLoginMethod,  //  리프레시 성공 했다면 로그인 상태이므로 성공 실행 매서드로 로그인 상태의 콜백함수 연결
                isLogoutMethod  //  리프레시 실패 했다면 로그인 상태가 아니므로 실패 실행 매서드로 로그아웃 상태의 콜백함수 연결
            );
        }
    }
}
export default isLogin;
