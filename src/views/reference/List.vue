<template>
    <div class="list-wrap">
        <section class="banner-box _type_thumb3">
            <h2 class="hidden">banner</h2>
            
            <ul>
                <Thumb v-for="(tl, i) in loadData.referenceList" :key="tl" :liData="loadData.referenceList[i]"/>               
            </ul>
        </section>
    </div>

   
</template>

<script>
import {computed, reactive, onMounted} from 'vue'
import api from '@/modules/api'
import ThumbList from '@/components/reference/Thumb.vue';
export default {
    name: 'ReferenceList',
    components: {
        Thumb : ThumbList
    },
    setup () {
        const loadData = computed(()=>state.apiData);
        const state = reactive({
            apiData: {}
        })
        
        let loadAPI = ()=>{
            console.log(1);
            api.request({
                type:"REFERENCE_LIST", //apiMap 의  name
                success: loadComplete,
            });
            console.log(2);
        }
        const loadComplete = (data) =>{
            console.log(3);
            state.apiData = data;
        }
        onMounted (()=>{
            loadAPI();
        })
        return {
            loadData,
            state, 
        }
    }
}
</script>

<!--
<template>
    <div class="list-wrap">
        <section class="banner-box _type_thumb3">
            <h2 class="hidden">banner</h2>
            
            <ul>
                <Thumb v-for="(tl, i) in thumbA" :key="tl" :liData="thumbA[i]"/>               
            </ul>
        </section>
    </div>
</template>


<script>
import ThumbData from '@/data/thumbData';
import ThumbList from '@/components/reference/Thumb.vue';

export default {
    name: 'Reference-2',
    data() {
        return {
            thumbA : ThumbData,
        }
    },
    components: {
        Thumb : ThumbList
    }
}
</script>
-->


<style lang="scss">
.list-wrap {
  padding: 0 0 160px;
  background: linear-gradient(rgb(0,0,0), rgb(15,69,155), rgb(132,103,66));
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
</style>