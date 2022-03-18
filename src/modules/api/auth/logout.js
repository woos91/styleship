"use strict";

import getLS from '@/modules/tools/getLS'
import setLS from '@/modules/tools/setLS'
import api from '@/modules/api'
import router from '@/router'

let logout = (callBack, error)=>{   // 로그아웃 매서드  (callBack:로그아웃 완료시 매서드, error:로그아웃 실패시 매서드)
    if (!getLS("app_auth")) {   // 로컬스토리지에 인증 정보가 없었다면...
        error("NO_AUTH");   // 어차피 로그아웃 할 인증정보 자체가 없으므로 그냥 에러 "NO_AUTH" 투척하고 종료
        return;
    }
    callBack = callBack || function(){};    //  에러 방지를 위해 인자값이 없다면 빈 함수 생성
    error = error || function(){};    //  에러 방지를 위해 인자값이 없다면 빈 함수 생성

    let success = ()=> {    //  로그아웃 완료시 실행될 스크립트 정의
        setLS("app_auth", null);    //  로컬스토리지 인증정보 비우기
        setLS("app_session", null);    //  로컬스토리지 세션정보 비우기
        callBack.call(this);        //  인자값으로 받은 로그아웃 완료시 콜백함수 실행
        router.push('/');   //  홈으로 링크 이동
        window.location.reload();   //  페이지 강제로 새로 고침
    };

    api.request({   //  로그아웃 API호출
        type:"LOGOUT",  //   apiMap의 로그아웃 api명
        success:success,    //  로그아웃 완료시 실행될 스크립트 연결
        error: error   //  인자값으로 받은 로그아웃 실패시 콜백함수 실행
    });
}
export default logout;
