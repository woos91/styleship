"use strict";

import getLS from '@/modules/tools/getLS'
import isAvailable from './isAvailable'
import refresh from './refresh'

class Auth {
    constructor(isLoginCB, isLogoutCB){ // 클래스 기본 생성 트리거. (isLoginCB:로그인 상태일 경우 콜백매서드, isLogoutCB:로그아웃 상태일 때 콜백매서드)
        let jm = this;
        if (isLoginCB || isLogoutCB) {  // 클래스 생성시 args값이 있다면 
            jm.init(isLoginCB, isLogoutCB); // args값으로 init 실행
        }
    }
    init(isLoginCB, isLogoutCB) {
        isLoginCB = isLoginCB || function(){};  // 로그인 상태일 경우 실행될 콜백매서드
        isLogoutCB = isLogoutCB || function(){};  // 로그아웃 상태일 경우 실행될 콜백매서드
        let jm = this;
        if (jm.memberID) {
            // memberID가 있는 경우. 
            if (jm.isAvailable) {// 로그인 상태가 아닌데 로컬스토리지에 아이디가 있었을 수 있으므로 로긴 상태 체크
                isLoginCB.call(jm, jm.memberID);    // 체크 결과 로그인 상태가 맞다면 로그인 콜백함수 실행
            } else {
                refresh(    // 체크 결과 로그인 상태가 아니라면 토큰 리프레시 실행
                    ()=>{   // 토큰 리프레시 성공했을 경우 실행될 매서드
                        isLoginCB.call(this, this.memberID);
                    },
                    ()=>{   // 토큰 리프레시 실패했을 경우 실행될 매서드
                        isLogoutCB.call(this);
                    }
                );
            }
        } else {
            // memberID가 없었다면 무조건 로그아웃 상태이므로 로그아웃 콜백함수 실행
            isLogoutCB.call(jm);
        }
    }
    get memberID() {
        let _auth = getLS("app_auth");  // 로컬스토리지에서 app_auth 데이터 가져오기
        if (_auth) {    // _auth(app_auth)가 있다면 app_auth.memberID 리턴
            return _auth.memberID ? _auth.memberID : '';
        } else {    // _auth(app_auth)가 없다면 '' 리턴
            return '';
        }
    }
    get isAvailable() {
        return isAvailable();
    }
}
export default Auth;