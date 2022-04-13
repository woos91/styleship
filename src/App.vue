<template>
  <div id="wrap" :class="(navMode ? 'gnb--open ' : '') + (contactMode ? 'contact--open ' : '')">
    <!-- start of :: header -->
    <header id="header" class="header--fix">
			<h1 class="logo">
        <router-link to="/">STYLESHIP</router-link>
      </h1>

      <!-- gnb -->
      <nav class="gnb">
        <ul>
          <li>
            <a href="#">COMPANY</a>
          </li>

          <li>
            <a href="#">SERVICE</a>
          </li>

          <li>
            <router-link to="/reference">REFERENCE</router-link>
          </li>

          <li>
            <a href="#">RECRUIT</a>
          </li>

          <li>
            <a href="javascript:void(0);" @click="contactOpen">CONTACT</a>
          </li>
        </ul>
      </nav>
      <!-- //gnb -->

      <button type="button" class="menu__btn" @click="navOpen">
        <span class="t"></span>
        <span class="m"></span>
        <span class="b"></span>
      </button>
		</header>
		<!-- // end of :: header -->

    <!-- start of :: gnb -->
    <nav class="mobile-gnb">
      <div class="menu">
        <ul>
            <li>
              <a href="#">COMPANY</a>
            </li>

            <li>
              <a href="#">SERVICE</a>
            </li>

            <li>
              <router-link to="/reference">REFERENCE</router-link>
            </li>

            <li>
              <a href="#">RECRUIT</a>
            </li>

            <li>
              <a href="javascript:void(0);" @click="contactOpen">CONTACT</a>
            </li>
        </ul>

        <a href="#" class="download">BRIEF.<br />DOWNLOAD</a>
      </div>

      <p class="copyright">2022. STYLESHIP.Co.ltd</p>
    </nav>
    <!-- // end of :: gnb -->

    <!-- contact layer -->
    <div class="contact__layer">
      <div class="con">
        <p class="tit">Contact</p>

        <button type="button" class="close__btn" @click="contactMode = false">close</button>

        <div class="inp-box">
          <div>
            <label for="contactEmail">From_</label>
            <input type="text" id="contactEmail" placeholder="메일 주소를 입력해 주세요." />
          </div>

          <div>
            <label for="contactSubject">Subject_</label>
            <input type="text" id="contactSubject" placeholder="제목을 입력해 주세요." />
          </div>

          <textarea placeholder="프로젝트 내용, 일정 등 &#10;자세한 정보를 알려주세요."></textarea>
        </div>

        <div class="btn-box">
          <p>To_contact@styleship.com</p>

          <button type="button" class="send__btn" @click="contactMode = false">Send</button>
        </div>
      </div>
    </div>
    <!-- //contact layer -->

		<!-- start of :: contents -->
		<div id="contents">
      <router-view /> <!-- router/index.js 에서 각 링크 확인--->
		</div>
		<!-- // end of :: contents -->
	
		<!-- start of :: footer -->
		<footer id="footer" class="footer--fix">
			<a href="#" class="download">BRIEF. DOWNLOAD</a>

      <p class="copyright">2022. STYLESHIP.Co.ltsdSSS</p>

      <button type="button" class="contact__btn" @click="contactOpen">contact</button>
		</footer>
		<!-- // end of :: footer -->
  </div>
</template>

<script>
import {reactive, computed, onMounted} from 'vue'
import SmoothScroll from '@/modules/ui/scroll/SmoothScroll'

export default {
  naem: 'App',
  setup() {
    const state = reactive({
      navMode: false,
      contactMode: false,
    })
    const navMode = computed(()=>state.navMode);
    const contactMode = computed(()=>state.contactMode);
    const navOpen = ()=>{
      state.navMode = !state.navMode;
    };
    const contactOpen = ()=>{
      state.contactMode = !state.contactMode;
    };
    onMounted( ()=>{
      new SmoothScroll();
    })
    return {
      navMode,
      contactMode,
      navOpen,
      contactOpen,
      state
    }
  }
}



// export default {
//     name: 'App',
//     data: () => ({
//       navMode: false,
//       contactMode: false,
//     }),
//     methods: {
//       navOpen(){
//         this.navMode = !this.navMode;    
//       },
//       contactOpen(){
//         this.contactMode = !this.contactMode;
//       }
//     }
// }

</script>

<style lang="scss">
// @import './styles/_variables.scss';
//@import './assets/css/normalize.css';
//@import './assets/css/opt-default.css';


/* header */

#header {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;

  &.header--fix {position: fixed;}

  .logo {
    position: absolute;
    top: 40px;
    left: 68px;

    transform: rotate(90deg);
    transform-origin: top left;

    a {
      display: block;
      @extend .ff-heve-blk-wt;
      font-size: 24px;
      letter-spacing: 2.5px;
      
    }
  }

  .gnb {
    position: absolute;
    top: 25px;
    right: 30px;

    ul {
      font-size: 0;

      li {
        display: inline-block;
        margin-left: 30px;
        vertical-align: top;
      }

      li:first-child {margin-left: 0;}

      a {
        display: block;
        padding: 10px;
        position: relative;
        top: 0;
        left: 0;
        @extend .ff-heve-blk-wt;
        font-size: 14px;
        letter-spacing: 1.5px;

        &:before {
          width: calc(100% + 5px);
          height: 1px;
          content: '';
          display: none;
          position: absolute;
          bottom: 5px;
          left: -10px;
          background-color: rgb(255,255,255);
        }
      }

      &.on a {display: block;}
    }
  }

  .menu__btn {
    width: 65px;
    height: 57px;
    display: none;
    position: absolute;
    top: 0;
    right: 0;

    span {
      width: 25px;
      height: 3px;
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: rgb(255,255,255);
      border-radius: 3px;
      transform: translate(-50%, -50%);

      &:nth-child(1) {top: calc(50% - 7px);}
      &:nth-child(3) {top: calc(50% + 7px);}
    }    
  } 
}

#wrap.gnb--open .menu__btn {
  span {
    &:nth-child(1) {
      top: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &:nth-child(2) {opacity: 0;}
    &:nth-child(3) {
      top: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
}
/* //header */

/* footer */
#footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;

  &.footer--fix {position: fixed;}

  .download {
    padding: 10px;
    position: absolute;
    bottom: 244px;
    left: 28px;
    @extend .ff-heve-blk-wt;
    font-size: 14px;
    letter-spacing: 1.5px;

    transform: rotate(90deg);
    transform-origin: bottom left;
  }

  .copyright {
    position: absolute;
    bottom: 36px;
    right: 40px;
    @extend .ff-heve-blk-wt;
    font-size: 10px;
  }

  .contact__btn {
    width: 40px;
    height: 40px;
    display: none;
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 0;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url(./assets/images/common/ico_contact_wt_80x80.png);
    background-size: 40px;
  }
}
/* //footer */

/* mobile gnb */
.mobile-gnb {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -5;
  opacity: 0;
  background-color: rgba(255,255,255,0.0);
	backdrop-filter: blur(30px);

  .menu {
    width: 100%;
    max-height: calc(100% - 150px);
    overflow-y: auto;
    position: absolute;
    top: 50%;
    left: 0;
    text-align: center;
    transform: translateY(-50%);
  }

  ul {
    li {
      margin-top: 15px;

      &:first-child {margin-top: 0;}
    }
    
    a {
      display: inline-block;
      @extend .ff-heve-blk-wt;
      font-size: 2.8rem;
      letter-spacing: 2.5px;
      vertical-align: top;
    }
  }

  .download {
    display: inline-block;
    margin-top: 52px;
    @extend .ff-heve-blk-wt;
    font-size: 1.4rem;
    line-height: 1.6rem;
    letter-spacing: 1.5px;
    vertical-align: top;
  }

  .copyright {
    width: 100%;
    display: block;
    position: absolute;
    bottom: 32px;
    left: 0;
    @extend .ff-heve-blk-wt;
    font-size: 0.8rem;
    text-align: center;
  }
}

#wrap.gnb--open .mobile-gnb {
  opacity: 1;
  z-index: 5;

  transition: opacity 0.3s;
}
/* //mobile gnb */

/* contact */
.contact__layer {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -5;
  opacity: 0;
  background-color: rgba(255,255,255,0.0);
	backdrop-filter: blur(30px);

  .close__btn {
    width: 30px;
    height: 30px;
    display: none;
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 0;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url(./assets/images/common/ico_x_gr_20x20.png);
    background-size: 10px;
  }

  .con {
    width: 100%;
    max-width: 1400px;
    height: calc(100% - 280px);
    max-height: 800px;
    overflow-y: auto;
    padding: 60px;
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: rgb(238,238,238);
    border-radius: 30px;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
  }

  .tit {
    @extend .ff-ita-bk;
    font-size: 80px;
    text-align: right;
  }

  .inp-box {
    margin-top: 0px;

    > div {
      padding: 24px 0 25px;
      border-bottom: 1px solid rgb(204,204,204);

      &:after {
        content: '';
        display: block;
        clear: both;
      }

      label {
        float: left;
        @extend .ff-ita-bk;
        font-size: 32px;
      }

      input {
        height: 48px;
        float: left;
        margin: 0;
        padding: 0;
        font-weight: 300;
        font-size: 24px;
        color: rgb(0,0,0);
        background: none;
        border: 0;
        box-sizing: border-box;
        outline: 0;

        &::placeholder {color: rgb(153,153,153);}
      }

      &:nth-of-type(1) {
        label {width: 103px;}
        input {width: calc(100% - 103px);}
      }

      &:nth-of-type(2) {
        label {width: 133px;}
        input {width: calc(100% - 133px);}
      }
    }

    textarea {
      width: 100%;
      height: 158px;
      margin: 20px 0 0;
      padding: 15px 0 15px;
      font-weight: 300;
      font-size: 24px;
      color: rgb(0,0,0);
      background: none;
      border: 0;
      box-sizing: border-box;
      outline: 0;
      resize: none;

      &::placeholder {color: rgb(153,153,153);}
    }
  }

  .btn-box {
    margin-top: 10px;

    &:after {
      content: '';
      display: block;
      clear: both ;
    }

    .send__btn {
      width: 200px;
      height: 60px;
      float: left;
      @extend .ff-ita-wt;
      font-size: 24px;
      background-color: rgb(0,0,0);
      border-radius: 60px;
    }

    p {
      float: right;
      @extend .ff-ita-bk;
      font-size: 24px;
      line-height: 60px;
    }
  }
}

#wrap.contact--open .contact__layer {
  opacity: 1;
  z-index: 7;

  transition: opacity 0.3s;
}
/* //contact */

/* desktop */
@media screen and (min-width: $desktop) {
	.d-hide {display:none !important;}

  .mobile-gnb {display: none;}
}
/* //desktop */

/* tablet & mobile */
@media screen and (max-width: $tablet){
  .tm-hide {display:none !important;}
}
/* //tablet & mobile */

/* tablet */
@media screen and (max-width: $tablet) and (min-width: #{$mobile + 1px}) {
	.t-hide {display:none !important;}

  /* contact */
  .contact__layer {
    .close__btn {display: block;}

    .con {
      max-width: 700px;
      width: 100%;
      height: calc(100% - 40px);
      max-height: 772px;
      padding: 40px;
    }
  }
  /* //contact */
}
/* //tablet */

/* mobile */
@media screen and (max-width: $mobile) {
	.m-hide {display:none !important;}

  /* header */
  #header {
    .logo {
      top: 20px;
      left: 35px;

      a {
        font-size: 1.4rem;
        letter-spacing: 1px;
      }
    }

    .gnb {display: none;}
    .menu__btn {display: block;}
  }
  /* //header */

  /* footer */
  #footer {
    .download, .copyright {display: none;}
    .contact__btn {display: block;}
  }
  /* //footer */

  /* contact */
  .contact__layer {
    .close__btn {display: block;}

    .con {
      max-width: 335px;
      width: 100%;
      height: calc(100% - 40px);
      max-height: 772px;
      padding: 55px 20px 40px;
    }

    .tit {
      font-size: 3.2rem;
      text-align: left;
    }

    .inp-box {
      margin-top: 14px;

      > div {
        margin-top: 8px;
        padding: 19px 0 16px;

        &:first-of-type {margin-top: 0;}

        label {font-size: 1.8rem;}

        input {
          height: 26px;
          font-size: 1.6rem;
        }

        &:nth-of-type(1) {
          label {width: 56px;}
          input {width: calc(100% - 56px);}
        }

        &:nth-of-type(2) {
          label {width: 74px;}
          input {width: calc(100% - 74px);}
        }
      }

      textarea {
        min-height: calc(100vh - 535px);
        height: 100%;
        margin: 10px 0 0;
        padding: 15px 0 15px;
        font-size: 1.6rem;
        line-height: 2.4rem;
      }
    }

    .btn-box {
      width: 100%;
      margin-top: 0;
      position: absolute;
      bottom: 40px;
      left: 0;

      .send__btn {
        width: calc(100% - 80px);
        height: 50px;
        float: none;
        display: block;
        margin: 22px auto 0;
        font-size: 1.6rem;
        border-radius: 50px;
      }

      p {
        float: none;
        font-size: 1.6rem;
        line-height: 1.5rem;
        text-align: center;
      }
    }
  }
  /* //contact */  
}
/* //mobile */

/* height 520px ↓ */
@media screen and (max-height: 520px) {
  /* contact */
  .contact__layer {
    .btn-box {
      width: 100%;
      margin-top: 0;
      position: relative;
      bottom: auto;
      top: 0;
      left: 0;

      .send__btn {
        width: calc(100% - 40px);
      }
    }
  }
  /* //contact */
}
/* //height 520px ↓ */
</style>