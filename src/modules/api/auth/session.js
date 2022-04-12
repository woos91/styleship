"use strict";

import setLS from '@/modules/tools/setLS'
import getLS from '@/modules/tools/getLS'
import api from '@/modules/api'

let refreshSessionTimer;    //  세션 갱신을 위한 타이머 변수
const session=(callback)=>{    //  세션 생성,갱신 등의 관리를 위한 매서드
    let _session = getLS("app_session");    //  로컬스토리지의 세션 데이터
    if (_session) {    //  세션 데이터가 있다면
        let date = new Date(),      //  현재 시간
            now = Date.parse(date),    //  현재 시간의 값
            exp = Date.parse(_session.expiryTime);    //  세션 데이터에 있는 만료 시간 값
        if (now < exp) {       //  아직 만료 전이라면
            _session.expiryTime = new Date(date.setHours(date.getHours()+1)).toISOString();    //  만료 시간을 한시간 더 연장하기
            setLS("app_session", _session);     //  로컬스토리지에 세션 데이터 새로 쓰기
            if (callback) {     //  만약 인자값으로 받은 콜백함수가 있다면
                callback(_session.sessionID);     //  이를 실행
            }
        } else {     //  세션이 만료되었다면 
            createSession();    //  새로운 세션 정보 만들기 실행
        } 
    } else {     //  세션 데이터가 없다면
        createSession();    //  새로운 세션 정보 만들기 실행
    }
    function createSession() {    //  새로운 세션 정보 만들
        _session = {};    //  새로운 세션 데이터
        api.request({    //  세로운 세션 데이터 요청 API
            type:"SESSION_ID",  //  apiMap에 있는 세션값 받는 API명
            success:(data)=>{   //  세션값 받기 성공하면
                let date = new Date();  //  현재 Date
                _session.sessionID = data.result;  //  넘겨받은 값은 sessionID값임.
                _session.expiryTime = new Date(date.setHours(date.getHours()+1)).toISOString();  //  만료시간을 현재보다 한시간 뒤로 설정
                setLS("app_session", _session);  //  세션아이디와 만료시간값으로 만들어진 세션 정보를 로컬스토리지에 쓰기
                if (callback) callback(_session.sessionID);  //  인자값으로 받은 콜백 함수가 있다면 이를 실행
                callback = null;  //  최초 1회만 콜백함수 사용하고 이후 리프레시 시점엔 실행 않도록 이를 제거
                if (refreshSessionTimer) {  //  현재의 세션 생성 말고 추가로 자동 리프레시 걸려있는게 있다면
                    clearTimeout(refreshSessionTimer);  //  자동 리프레시 타이머 삭제.
                    refreshSessionTimer = null;  //    자동 리프레시 타이머 삭제.
                }
                refreshSessionTimer = setTimeout(()=>{  //    자동 리프레시 타이머 생성.
                    createSession();  //  세션 서버 리프레시를 실행
                }, 3500000);  //  3500000/1000(밀리초)/60(초)/60(분) = 0.972222 즉 한시간 약간 안되는 시점에 리프레시 실행...
            }
        });
    }
}
export default session;
