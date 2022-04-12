"use strict";

import setLS from '@/modules/tools/setLS'
import api from '@/modules/api'

let login = (id, pw, callBack, errorCallBack)=>{    //  로그인 매서드
    let jm= this;
    callBack = callBack || (()=>{});    //  
    errorCallBack = errorCallBack || (()=>{});    //  
    if (!id) {  // 아이디가 없다면
        errorCallBack.call(jm, "NO_ID"); //  에러 콜백 실행"NO_ID"
        return;
    }
    if (!pw) {    //  
        errorCallBack.call(jm, "NO_PASSWORD"); //  에러 콜백 실행"NO_PASSWORD"
        return;
    }
    let success = (res) =>{ //  로그인 성공시 실행할 스크립
            let _auth = {}; //  로컬스토리지에 쓰게될 인증값 생성
            _auth.memberID = id;    // 아이디
            _auth.access = res.accessToken; //  액세스 토큰
            _auth.expiryTime = res.accessTokenExpirationTime;   //  만료시간
            _auth.refresh = res.refreshToken;   //  리프레시 토큰
            setLS("app_auth", _auth); //  로컬스토리지에 인증 정보 쓰기
            callBack.call(jm, _auth);    //  인자값으로 설정된 로그인 성공시 매서드 실행
        },
        failed = (res)=> { //  로그인 실패시 실행할 스크립트
            errorCallBack.call(jm, res);    //  인자값으로 설정된 로그인 실패시 매서드 실행
        }
    
    api.request({   //  로그인 API 실행
        type:"LOGIN",   //  apiMap의 로그인 API명
        data:{memberID:id, memberPassword:pw}, 
        success:success, //  로그인 성공시 실행할 스크립트 연결
        error:failed //  로그인 실패시 실행할 스크립트 연결
    });
}
export default login;
