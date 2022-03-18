"use strict";
class SmoothScroll {
    container;  // 스크롤 적용 대상 DOM
    constructor(scrollElement) {    // 클래스 생성시 발동
        let jm=this;
        jm.container=scrollElement || document.scrollingElement;    // 스크롤 타겟 설정. 없다면 DOM기본 스크롤 엘리먼트
        jm.#buildStyleSheet();  //  기본 적용 스타일 임배드
        jm.container.classList.add(jm.#useCssName); // 기본 사용 클래스네임 적용
        jm.#setWatcher();   // 기본 사용될 enterframe 메서드
    }
    options={
        scrollbar:{
            enabled:true,
            color:'rgba(100,100,100,0.4)',
            width:10,
            margin:5,
        },
        accelValue:0.3, // 0 이상, 1 이하 
        decelValue:0.05, // 0 이상, 1 이하
    };
    #useCssName="_smooth_scroll_container"; // class 적용 대상 class name
    #scroll={   // 스크롤 연산에 사용될 데이터 
        current:null,
        height:null,
        view:null,
        max:null,
        goal:null,
        beforeTS:null,
        speed:0,
    };
    #acceleration=1.3;    // 갑자기 빨라지지 않도록 이전 속도 대비 가속 되는 정도(반드시 1초과 값)
    #deceleration=0.05;   // 목표 스크롤 값 까지 거리중 이 값을 곱한 만큼만 한번에 이동(1이상 값이면 띠옹~되니 주의)
    #moving(ts) {
        // 애니메이션 시점의 연산
        let jm=this, con=jm.container, sc=jm.#scroll, spd, positive1, positive2, abs1, abs2, interval;
        if (sc.beforeTS) { // 만약 이전의 TS(timestamp)가 있다면
            interval = Math.round(ts-sc.beforeTS);
        }
        sc.beforeTS = ts; // 다음 타임 무빙 시점의 계산을 위한 이전 타임스탬프 정의
        if (sc.current!==sc.goal) { // 시스템 리소스 절약을 위한 스크롤 변경 시점에만 연산
            spd = (sc.goal-sc.current) * jm.#deceleration;    // 이동되는 스피드 계산.
            positive1 = jm.#positiveNum(spd);   // 이동되는 거리 계산을 위한 속도의 방향값(-1,0,1).
            positive2 = jm.#positiveNum(sc.speed);   // 이동되는 거리 계산을 위한 이전 속도의 방향값(-1,0,1).
            if (positive1 == positive2 || positive2==0) {   
                // 이전과 지금 타임의 스크롤 방향이 같거나 새로운 방향의 처음 이동이라면...
                abs1 = Math.abs(spd);   // 이번 타임 이동되는 거리
                abs2 = Math.abs(sc.speed);  // 이번 타임 이동되는 거리 계산을 위한 이전 타임 이동된 거리
                if (abs1 > abs2 ) { // 만약 급 가속일 경우
                    spd = Math.min( Math.max(abs2, 1) * jm.#acceleration, abs1) * positive1;  // 
                }
            } else {
                // 이전과 지금 타임의 스크롤 방향이 같지 않을 경우 스크롤 반응에 딜레이 생기지 않게 반대 방향 스크롤 스피드 0 처리
                spd = 0;
            }
            spd *= interval/16.66; //   속도에 프레임레이트에 해당하는 가감 계산. 즉 느린 프레임 속도일 경우 큰 값으로 (60fps 기준 속도 16.66)
            if (Math.abs(sc.current-sc.goal)>0.1) { // 이동중일 경우 계산 및 처리
                sc.current += spd;
                sc.speed = spd;
                con.scrollTop = sc.current;
                if (jm.options.scrollbar.enabled) jm.#refreshScrollBar(true);   // 스크롤바 모드시 스크롤바 보이는 상태로 갱신
            } else {    // 이동이 마무리 된 시점의 계산 및 처리
                sc.current = sc.goal;
                sc.speed = 0;
                con.scrollTop = sc.current;
                if (jm.options.scrollbar.enabled) jm.#refreshScrollBar(false);   // 스크롤바 모드시 스크롤바 안보이는 상태로 갱신
            }
        }
        window.requestAnimationFrame((timestamp)=>{jm.#moving(timestamp)}); // 다음 무빙 타임 호출
    }
	#buildStyleSheet() {
        // 사용될 스타일 준비 및 임배드
        let jm=this;
        let cssStr=`<style id="smoothScrollStyle">
    .`+jm.#useCssName+` {
        -ms-overflow-style: none; scrollbar-width: none;
    }
    .`+jm.#useCssName+`::-webkit-scrollbar {
        display: none;
    }
</style>`;  //  head에 들어갈 style text
        if (!document.querySelector('#smoothScrollStyle')) {    // 만약 smooth scrolling 의 스타일이 정의되지 않았다면 head에 입력하기
            document.head.insertAdjacentHTML('beforeend', cssStr);
        }
    }
    #setWatcher() { // enterframe 개념으로 휠 스크롤 관찰 및 이동 처리
        let jm=this, con=jm.container, sc=jm.#scroll;
        if (con.classList.contains('_smooth_scroll_watch')) return; //   중복으로 실행되는 것 방지
        con.classList.add('_smooth_scroll_watch');
        con.addEventListener('wheel',(e)=>{     // 휠이벤트 리스너 정리 휠 이벤트 발생때 마다 스크롤 높이, 영역크기, 현재 스크롤, 목표 스크롤 등의 재설정
            e.preventDefault();
            sc.current = con.scrollTop;
            sc.height = con.scrollHeight;
            sc.view = jm.#getHeight(con);
            jm.#acceleration = Math.max(0, Math.min(1, jm.options.accelValue))+1;
            jm.#deceleration = Math.max(0, Math.min(1, jm.options.decelValue))+0;
            if (sc.height > sc.view) {
                sc.max = sc.height-sc.view;
                sc.goal = Math.max(0, Math.min(sc.max, sc.goal - e.wheelDelta));
            } else {
                sc.max = 0;
                sc.goal = 0;
            }
        }, {passive: false});   // eventcancelable 불가한 엘리먼트의 preventDefault 처리를 위한 passive: false 설정
        window.requestAnimationFrame((timestamp)=>{jm.#moving(timestamp)});     //  스크롤처리 enterframe 시작
    }
    #refreshScrollBar(visible) {
        
    }
    #getHeight(dom){    // 높이값 읽기. <html>,<body>와 일반적인 HTMLElement들의 높이 읽기 방법이 다름.
        if (dom.constructor.name === "HTMLHtmlElement") return window.innerHeight;
        else if (dom.constructor.name === "HTMLDocument") return document.body.clientHeight;
        else return dom.offsetHeight;
    }
    #positiveNum(num) {    // 해당 숫자가 음수인지 0인지 양수인지에 따라 -1, 0, 1 리턴.
        if (num>0) return 1;
        else if (num<0) return -1;
        else return 0;
    }
}
let smoothScroll = new SmoothScroll();
// export default SmoothScroll;