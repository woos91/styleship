"use strict";
import isAvailable from './isAvailable'
import getLS from '@/modules/tools/getLS'
import setLS from '@/modules/tools/setLS'
import api from '@/modules/api'

const refresh = (successCallBack, errorCallBack)=> {    //  인증토큰 갱신 매서드 (successCallBack:인증토큰 갱신성공시 실행매서드, errorCallBack:인증토큰 갱신실패시 실행매서드)
    successCallBack = successCallBack || (()=>{});    //  실행 매서드가 없다면 빈 함수 생성
    errorCallBack = errorCallBack || (()=>{});    //  실행 매서드가 없다면 빈 함수 생성
    let _auth = getLS("app_auth"),    //  로컬 스토리지에서 읽어온 "app_auth"값이 없다면
        success = (res) =>{    //  갱신 성공 했을 때 실행될 스크립트
            _auth.access = res.accessToken;    //  _auth에 새로운 인증토큰 쓰기
            _auth.expiryTime = res.accessTokenExpirationTime;    //  _auth에 새로운 만료시간 쓰기
            _auth.refresh = res.refreshToken;    //  _auth에 새로운 리프레시토큰 쓰기
            setLS("app_auth", _auth);    //  로컬스토리지에 새로운 인증값으로 _auth 쓰기
            successCallBack(_auth.access);    //  인자값으로 들어온 인증토큰 갱신성공시 실행매서드 실행
        },
        failed = (res) =>{    //    갱신 실패 했을 때 실행될 스크립트
            setLS("app_auth", null);    //  로컬스토리지에 모든 인증값 지우기
            errorCallBack(res);    //  인자값으로 들어온 인증토큰 갱신실패시 실행매서드 실행
        };
    if (_auth) {    //  로컬 스토리지의 "app_auth"값이 있었다면
        if (isAvailable()) {    //  인증토큰 유효성 (인증정보 유효한건지, 만료된 건지 아닌지)파악하여 
            successCallBack(_auth.access);    //  유효하다면 인자값으로 들어온 인증토큰 갱신성공시 실행매서드 실행
            return true;    //  리턴값으로 인증 유효성 요구하는 상황 대비 리턴 true;
        } else if (_auth.refresh) {    //  액세스 토큰 만료된 시점이며, 리프레시토큰이 있다면
            api.request({    //   인증토큰 리프레시 API호출
                type:"REFRESH",    //  "REFRESH" (apiMap에서 리프레시토큰api의 오브젝트 키값)
                data:{refreshToken:_auth.refresh},    //  요청 데이터로 리프레시토큰 사용
                success:success,    //  리프레시 요청 성공 했을 경우의 실행 스크립트 명기
                error:failed,    //  리프레시 요청 실패 했을 경우의 실행 스크립트 명기
            });
            return true;    //  리턴값으로 인증 유효성 요구하는 상황 대비 리턴 true(리프레시 전이지만 true를 리턴하는것은 추후 고민할 부분임)
        } else {    // 리프레시 할 수 없는 상황일 경우
            errorCallBack("NO_AUTH");    //  로그인 전인 상황으로 판단하여 인자값으로 들어온 인증토큰 갱신실패시 실행매서드 호출
            return false;    //  리턴값으로 인증 유효성 요구하는 상황 대비 리턴 false;
        }
    } else {    //  로컬 스토리지의 "app_auth"값 이 없다면
        errorCallBack("NO_AUTH");    //  로그인 전인 상황으로 판단하여 인자값으로 들어온 인증토큰 갱신실패시 실행매서드 호출
        return false;    //  리턴값으로 인증 유효성 요구하는 상황 대비 리턴 false;
    }
}
export default refresh;