"use strict";

import memberID from './auth'
import getToken from './auth/getToken'
import refresh from './auth/refresh'
import apiMap from './apiMap'
import session from './auth/session'

class API {
    #reqBuffer = []; // 순차로딩을 위한 읽기 요청 리스트
    #memberID;
    constructor() {
    }
    request(apiType, args) {
        let jm=this, 
            _cfg;   // 요청된 리퀘스트의 설정들이 저장될 값
        if (arguments.length ==1) return;   // 요청 인수 값이 없다면 실행 중지.
        if (typeof apiType == "string") {   //  첫번째 arguments값이 문자일 경우
            _cfg = args||{};    //  두번째 arguments값이 있으면 기본 사용, 아니면 새 오브젝트
            _cfg.type = apiType;    //  요청 타입 설정
        } else {
            _cfg = apiType; // 첨 arguments값이 문자가 아니라면 
        }
        _cfg.success = _cfg.success||function(){};  //  요청 성공시 실행될 매서드. 없다면 빈 매서드 생성
        _cfg.error = _cfg.error||function(){};  //  요청 실패시 실행될 매서드. 없다면 빈 매서드 생성
        _cfg.config = {};  //  요청 설정에 config 데이터 생성
        _cfg.config.params = _cfg.data||{}; //  config.param에 인수값으로 들어온 요청에 사용될 데이터 넣기
        if (!_cfg.type) {
            console.error("API.request - require value:apiType");  //  만약 요청할 타입이 없다면 에러
        }
        if (typeof _cfg.config.params =="string") { //  만약 인수로 들어온 data값이 오브젝트가 아닌 String일 경우 Object로 변경하기
            let tempData, list = _cfg.config.params.split("&"); //  "&"로 문자열 쪼개서 배열 만들기
            for (let i=0; i<list.length; i++) {
                if (list[i].split("=").length >1) { // 쪼개진 배열에서 항목별 "="로 나눠 key, value로 만들기 
                    if (tempData === undefined) tempData = {};
                    tempData[list[i].split("=")[0]] = list[i].split("=")[1];
                }
            }
            if (tempData !== undefined) _cfg.config.params = tempData;  //  만들어진 object값으로 요청data(params) 교체
        }

        /******************************** 세션 데이터 사용 여부에 따른 처리 부분 - 여기서부터 */
        if (!apiMap.SESSION_ID) {       // API에서 'SESSION_ID' type을 사용 않는 경우
            jm.#buildRequest(_cfg);
        } else {       // API에서 'SESSION_ID' type을 사용하는 경우
            //  세션 처리가 되어있어야 이후의 API 요청에 문제가 없으므로 세션 처리를 먼저 하여야 함.
            //  그러므로 지금 들어온 요청이 SESSION_ID가 아닌 경우 지금 요청보다 먼저 SESSION_ID 요청을 자동으로 실행 후
            //  이후 순번으로 지금 들어온 요청을 넣는 작업이 필요함으로 이러한 스크립팅이 진행됨.
            if (_cfg.type === "SESSION_ID") {       // 현재의 요청 type이 'SESSION_ID' 인 경우
                jm.#addBuffer(_cfg);
            } else {                                // 현재의 요청 type이 'SESSION_ID'가 아닌경우 세션값 요청
                session(
                    (ssID)=>{
                        jm.#setParam(_cfg.config.params, "sessionID", ssID);
                        jm.#buildRequest(_cfg);
                    }
                );
            } 
        }
        /******************************** 세션 데이터 사용 여부에 따른 처리 부분 - 여기까지 */
    }
    #addBuffer(cfg) {   //  요청 목록(#reqBuffer)에 API요청 추가하기
        let jm = this,
            _method = apiMap[cfg.type].method,  // 요청 매서드 (post, get, put...)
            _name = apiMap[cfg.type].name,  //  요청 API 이름(경로값)
            _url;
        if (_name.split("{").length>1) {    //  만약 요청 API 이름(경로값)에 파라메터 용도의 값({})이 들어가 있는 경우
            let dataName = _name.split("{")[1].split("}")[0];   //  중괄호({})안의 문자값을 요청할 변수명으로 사용 
            if (jm.#getParam(cfg.config.params, dataName) !== undefined) {   //  만약 API요청 인수값 내에 해당 변수명의 값이 있다면 
                _name = _name.split("{")[0]+jm.#getParam(cfg.config.params, dataName);   //  만약 요청 API 이름(경로값)을 해당 변수명의 값으로 변경
                jm.#delParam(cfg.config.params, dataName);   //  API요청 인수값 내에 해당 변수 삭제
            } else {
                console.error('There is no "'+dataName+'" value in the request data.'); //  해당 되는 값이 매칭이 안되므로 에러 마무리
            }
        }
        _url = process.env.VUE_APP_API_PATH+_name;  //  .env.* 에서 정의한 API 경로를 토대로 최종 요청할 API의 최종 요청 URL 만들기
        jm.#reqBuffer.push({ 
            type:cfg.type,  //  API TYPE(ex: 'PRODUCT_LIST', 'SESSION_ID'...)
            method:_method,     // API method (ex: 'post', 'get'...)
            url:_url,      // API 요청 URL (ex: 'https://api.example.com/api/v1/Cart')
            config:cfg.config,  // API 요청 Data
            success:cfg.success,    //  API 요청 완료시 실행 매서드
            error:cfg.error     //  API 요청 실패시 실행 매서드
        });     //  생성된 값과 넘겨 받은 인수값을 토대로 api 버퍼(#reqBuffer)에 해당 요청 추가
        if (jm.#reqBuffer.length == 1) jm.#sendRequest();   // 버퍼에 목록이 1개일 경우는 리퀘스트가 끝나고 다음 버퍼의 실행 단계가 없으므로 이 건은 바로 요청 실행
    }
    #buildRequest(cfg) {
        let jm = this, 
            _useAuth=apiMap[cfg.type].useAuth,  //  해당 API요청이 인증 토큰이 필요한 매서드일 경우인지 여부 값
            _useHeaders = apiMap[cfg.type].headers||null,  //  해당 요청의 apiMap에 별도의 headers(요청헤더)값이 정의되어있다면 이를 사용함
            access = getToken();    //  인증토큰 값 구하기
            jm.memberID = memberID;

        /******************************** 인증토큰 사용 여부에 따른 처리 부분 - 여기서부터 */
        if (access == "REQUIRE_REFRESH") {  //  만약 인증토큰이 만료된 상태라면...
            refresh(    //  인증토큰 리프레시 실행
                (accToken)=>{   // 토큰 리프레시 성공시 
                    cfg.config.headers = {Authorization: 'Bearer ' + accToken}; //  API 요청 헤더에 새로 갱신한 Bearer 인증 정보 기입
                    jm.#setParam(cfg.config.params, "memberID", jm.memberID);    //  API 요청 data에 memberID 자동 추가
                    buildHeaders(); //  API 요청헤더 만들기
                    jm.#addBuffer(cfg); //  버퍼에 추가
                }, 
                ()=>{   // 토큰 리프레시 실패의 경우엔 
                    if (_useAuth === true) {    // 반드시 인증이 있어야 하는 경우
                        cfg.error.call(jm, "REQUIRE_LOGIN");    //  api요청 인수값으로 정의 된 실패의 경우 매서드 ("REQUIRE_LOGIN"인자값으로) 실행
                    } else {    // 반드시 인증이 있어야 하는 경우가 아니면 그냥 실행
                        buildHeaders(); //  API 요청헤더 만들기
                        jm.#addBuffer(cfg); //  버퍼에 추가
                    }
                }
            );
        } else if (access) {  //  만약 인증토큰이 정상 상태라면...
            cfg.config.headers = {Authorization: 'Bearer ' + access}; //  API 요청 헤더에 Bearer 인증 정보 기입
            jm.#setParam(cfg.config.params, "memberID", jm.memberID);    //  API 요청 data에 memberID 자동 추가
            buildHeaders(); //  API 요청헤더 만들기
            jm.#addBuffer(cfg); //  버퍼에 추가
        } else {  //  만약 로그인 전 상태라면...
            if (_useAuth === true) {    // 반드시 인증이 있어야 하는 경우인데 로그인 전인경우
                cfg.error.call(jm, "REQUIRE_LOGIN");    //  api요청 인수 값으로 정의 된 실패의 경우 매서드 ("REQUIRE_LOGIN"인자값으로) 실행
            } else {                    // 인증이 없어도 되는 경우
                buildHeaders(); //  API 요청헤더 만들기
                jm.#addBuffer(cfg); //  버퍼에 추가
            }
        }
        /******************************** 인증토큰 사용 여부에 따른 처리 부분 - 여기까지 */
        
        function buildHeaders() { //  API 요청헤더 만들기
            if (!_useHeaders) return;   //  해당 요청의 apiMap에 별도의 headers(요청헤더)값이 정의되어있지 않다면 buildHeaders 실행 안함.
            if (!cfg.config.headers) cfg.config.headers = {};   //  먼저 헤더값이 정의 되어있다면 그걸 기본으로 사용하고 아니면 빈 오브젝트 사용
            for (let key in _useHeaders) {
                if (key == "contentType")  {    //  Content-Type헤더의 경우 헤더의 사용방식...
                    cfg.config.headers["Content-Type"] = _useHeaders[key]; 
                }
                else cfg.config.headers[key] = _useHeaders[key]; // 그게 아니라면 그냥 헤더의 키, 값으로 사용
            }
        }
    }
    #sendRequest() {
        let jm = this, 
            etcCfg = null;  //  이번 타임의 요청 헤더 등의 처리를 위한 기타 설정 정보 오브젝트
        if (jm.#reqBuffer.length == 0) return;   // 만약 더이상 요청할 API가 버퍼목록에 없다면 그냥 종료
        let buffer = this.reqBuffer[0],     //  이번 타임의 요청할 API
            success = buffer.success,      //  이번 타임의 요청 완료시 실행될 매서드
            error = buffer.error,     //  이번 타임의 요청 실패시 실행될 매서드
            frm;    //  이번 타임 요청에 사용될지 모를 폼데이터 값 준비
        if (buffer.method == "post" || buffer.method == "put") {    //  만약 이번타임 요청이 post, put일 경우
            if (buffer.config.headers) {    //  요청 헤더 값이 있다면 기타 설정 정보 오브젝트에 정의
                etcCfg = {
                    headers:buffer.config.headers
                }
            }
            if (buffer.config.params.constructor.name == "FormData") {     //  이번 타임의 요청 데이터 값이 FormData라면
                frm = new FormData();
                for (let pair of buffer.config.params.entries()) {  //  폼데이터내의 키,값을 쌍으로 읽어서
                    frm.append(pair[0], pair[1]);   //  사용될 폼데이터에 쓰기
                }
                buffer.config = frm;    //  사용될 폼데이터를 요청할 정보로
            } else if (buffer.config.params.constructor.name == "Object") {     //  이번 타임의 요청 데이터 값이 Object값이라면
                for (let k in buffer.config.params) {     // buffer.config.params의 값들을 buffer.config로 옮기기
                    buffer.config[k] = buffer.config.params[k];
                }
                delete(buffer.config.params);   //   요청에 사용될 위치로 데이터의 정의가 끝났으므로 buffer.config.params의 값 없애기
                delete(buffer.config.headers);   //  요청에  사용될 위치로 헤더의 정의가 끝났으므로 buffer.config.headers의 값 없애기
            }
        }
        
        jm.axios[buffer.method](buffer.url, buffer.config, etcCfg)  //  main.js에서 axios의 vue전역설정을 마쳤으므로 이렇게 사용. 그게 아니라면 axios 임포트 후 사용해야함.
            .then((res) =>{     //  요청 성공시
                let value = (res.data === "true") ? true: (res.data === "false") ? false: res.data; //  리턴 값이 json이나 String이 아닌 Boolean값일 경우 true/false처리. 아니면 그대로.
                if (res.data.message) console.log(res.data.message);    //  만약 메시지 값이 있다면 이를 콘솔로그... alert처리 해야한다면...이부분 alert로 변경
                success.call(jm, value);    // 요청 성공시 실행해야할 매서드 실행.
                jm.#callNextBuffer.call(jm);     //  다음 버퍼의 요청 실행하기
            })
            .catch((res)=>{     // 요청 실패시
                error.call(jm, res);    // 요청 실패시 실행해야할 매서드 실행.
                jm.#callNextBuffer.call(jm);     //  다음 버퍼의 요청 실행하기
            });
    }
    #callNextBuffer() {      //  다음 버퍼의 요청 실행하기
        let jm = this;
        jm.reqBuffer.splice(0,1);     //  이전 실행된 요청의 버퍼 삭제하기.
        jm.sendRequest.call(jm);     //  버퍼의 다음 요청 실행하기
    }

    /******************************** 전송파라메터 데이터의 타입에 따른 값 제어 - 여기서부터 */
    #getParam(data, key) {
        if (data.constructor.name == "FormData") {
            for (let pair of data.entries()) {
                if (pair[0] == key) return pair[1];
            }
            return undefined;
        }
        return data[key];
    }
    #setParam(data, key, value) {
        if (data.constructor.name == "FormData") {
            data.append(key, value);
        } else if (data.constructor.name == "Object") {
            data[key] = value;
        }
    }
    #delParam(data, key) {
        if (data.constructor.name == "FormData") {
            data.delete(key);
        } else if (data.constructor.name == "Object") {
            delete(data[key]);
        }
    }
    /******************************** 전송파라메터 데이터의 타입에 따른 값 제어 - 여기까지 */
}
export default new API();   // 객체 만들어서 익스포트