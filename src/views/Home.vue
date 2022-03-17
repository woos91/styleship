<template>
  <div class="main-wrap">
    <section class="banner-box _type_full">
      <h2 class="hidden">banner</h2>

      <ul>
          <Thumb v-for="(tl, i) in thumbA" :key="tl" :liData="thumbA[i]"/>         
      </ul>          
    </section>

    <section class="banner-box _type_thumb1_big">
      <h2 class="hidden">banner</h2>
      
      <ul>
          <Thumb v-for="(tl, i) in thumbB" :key="tl" :liData="thumbB[i]"/>
      </ul>
    </section>

    <section class="banner-box _type_thumb1_small">
      <h2 class="hidden">banner</h2>
      
      <ul>
          <Thumb v-for="(tl, i) in thumbC" :key="tl" :liData="thumbC[i]"/>
      </ul>
    </section>

    <section class="banner-box _type_thumb3">
      <h2 class="hidden">banner</h2>
      
      <ul>          
          <Thumb v-for="(tl, i) in thumbD" :key="tl" :liData="thumbD[i]"/>
      </ul>
    </section>
  </div>
</template>

<script>
import ThumbDataA from '@/data/thumbData_2';
import ThumbDataB from '@/data/thumbData_3';
import ThumbDataC from '@/data/thumbData_4';
import ThumbDataD from '@/data/thumbData';
import ThumbList from '@/components/reference/Thumb.vue';

export default {
    name: 'Reference-1',
    data() {
        return {
            thumbA : ThumbDataA,
            thumbB : ThumbDataB,
            thumbC : ThumbDataC,
            thumbD : ThumbDataD,
        }
    },
    components: {
        Thumb : ThumbList
    }
}
</script>


<style lang="scss">
//@import '@/styles/_variables.scss';

/* main */
.main-wrap {
  padding: 0 0 160px;
  background: linear-gradient(rgb(132,103,66), rgb(0,0,0), rgb(15,69,155));
}
.banner-box {
  img {width: 100%;}

  .vdo {
    width: 100%;
    height: 0;
    padding-top: 56.25%;
    position: relative;
    top: 0;
    left: 0;

    &:before {
      width: 100%;
      height: 100%;
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      background-color: rgba(0,0,0,0);
    }
    
    iframe {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  ul {
    margin: 0 5.2083%;
    font-size: 0;

    &:after {
      content: '';
      display: block;
      clear: both;
    }

    li {
      position: relative;
      top: 0;
      left: 0;

      .info {margin: -25px 40px 0;}
    }
  }

  .info {
    .tit {
      @extend .ff-ita-wt;
      font-size: 50px;
      line-height: 54px; 
      word-break: break-all;
    }

    .date {
      margin-top: 0px;
      @extend .ff-ita-wt;
      font-size: 20px;
    }

    .visit__btn {
      width: 134px;
      height: 60px;
      display: block;
      margin-top: 38px;
      @extend .ff-ita-wt;
      font-size: 20px;
      line-height: 58px;
      text-align: center;
      border: 1px solid rgb(255,255,255);
      border-radius: 60px;
      box-sizing: border-box;
    }
  }

  &._type_full {
    ul {
      margin: 0;

      li {
        width: 100%;
        margin: 0;
      }
    }

    .info {
      width: 100%;
      margin: 0;
      padding: 0 250px;
      position: absolute;
      top: 50%;
      left: 0;
      z-index: 3;
      box-sizing: border-box;
      transform: translateY(-50%);

      .tit {
        font-size: 136px;
        line-height: 120px;
      }
      .date {
        margin-top: 17px;
      }
    }
  }

  &._type_thumb1_big {
    ul {
      margin: 0;

      li {
        width: 100%;
        margin: 0 auto;
        padding: 160px 100px 0;
        box-sizing: border-box;

        .info {
          margin-top: -30px;

          .tit {
            font-size: 68px;
            line-height: 64px;
          }
        }      
      }
    }    
  }

  &._type_thumb1_small {
    li {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 160px 100px 0;
      box-sizing: border-box;      

      .info {
        margin-top: -30px;

        .tit {
          font-size: 68px;
          line-height: 64px;
        }
      } 
    }
  }

  &._type_thumb3 {
    li {
      width: 30.2325%;
      display: inline-block;
      margin: 160px 4.65125% 0 0;
      position: relative;
      top: 0;
      left: 0;
      vertical-align: top;

      &:nth-child(3n - 2) {margin-top: 340px;}
      &:nth-child(3n) {margin: 260px 0 0 0;}

      .info {margin: -25px 40px 0;}
    }
  }
}
/* //main */

/* desktop */
@media screen and (min-width: $desktop) {
	
}
/* //desktop */

/* tablet & mobile */
@media screen and (max-width: $tablet){
  /* main */
  .main-wrap {
    padding: 0 0 60px;
  }
  .banner-box {
    .vdo {
      padding-top: 100vh;     
    }

    ul {
      margin: 0 10.666%;

      li {
        .info {margin: -25px 20px 0;}
      }
    }

    .info {
      .tit {
        font-size: 2.8rem;
        line-height: 3.2rem; 
      }

      .date {
        margin-top: 9px;
        font-size: 1.6rem;
      }

      .visit__btn {
        width: 100px;
        height: 30px;
        margin-top: 17px;
        font-size: 1.4rem;
        line-height: 2.8rem;
        border-radius: 30px;
      }
    }

    &._type_full {
      ul {
        margin: 0;

        li {
          width: 100%;
          margin: 0;
        }
      }

      .info {
        padding: 0 10.666%;
        top: auto;
        bottom: 80px;
        transform: translateY(0%);

        .tit {
          font-size: 5.4rem;
          line-height: 5.4rem;
        }
        .date {
          margin-top: 8px;
        }
        .visit__btn {
          width: 130px;
          height: 50px;
          font-size: 1.6rem;
          line-height: 4.8rem;
        }
      }
    }

    &._type_thumb1_big {
      ul {
        li {
          padding: 60px 5.333% 0;

          .info {
            margin-top: -15px;

            .tit {
              font-size: 2.8rem;
              line-height: 3.2rem;
            }
          }      
        }
      }    
    }

    &._type_thumb1_small {
      ul {
        margin: 0;
        li {
          padding: 60px 5.333% 0;

          .info {
            margin-top: -15px;

            .tit {
              font-size: 2.8rem;
              line-height: 3.2rem;
            }
          } 
        }
      }
    }

    &._type_thumb3 {
      ul {
        margin: 0;
        li {
          width: 66.666%;
          display: inline-block;
          margin: 60px 22.668% 0 10.666%;
          position: relative;
          top: 0;
          left: 0;
          vertical-align: top;

          &:nth-child(3n - 2) {margin-top: 60px;}
          &:nth-child(3n) {margin: 60px 22.668% 0 10.666%;}
          &:nth-child(even) {margin: 60px 10.666% 0 22.668%;}

          .info {margin: -13px 8% 0;}
        }
      }
    }
  }
  /* //main */
}
/* //tablet & mobile */

/* tablet */
@media screen and (max-width: $tablet) and (min-width: #{$mobile + 1px}) {
 
}
/* //tablet */

/* mobile */
@media screen and (max-width: $mobile) {

}
/* //mobile */


/* width 359 ↓ */
@media screen and (max-width: 359px) {
  .banner-box._type_full .info .tit {
      font-size: 3.6rem;
      line-height: 3.4rem;
  }
}
/* //width 359 ↓ */
</style>