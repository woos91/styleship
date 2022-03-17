<template>
    <li>
        <div class="vdo" v-if="`${liData.type}` === 'video'">
            <iframe 
                frameborder="0" 
                allowfullscreen="1" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                :src="`https://www.youtube.com/embed/${liData.vdoLink}?autoplay=1&amp;playlist=${liData.vdoLink}&amp;playsinline=1&amp;loop=1&amp;mute=1`"
            ></iframe>
        </div>

        <div class="imgs" v-else>
            <img :src="require(`@/assets/images/sub/${liData.imageDt}`)" alt="" class="tm-hide" />
            <img :src="require(`@/assets/images/sub/${liData.imageMo}`)" alt="" class="d-hide" />
        </div>

        <div class="info">
            <p class="tit" v-html="title"></p> 
            <p class="date">{{liData.date}}</p>

            <a :href="`${liData.link}`" class="visit__btn">Visit Site</a>
        </div>
    </li>
</template>

<script>
export default {
    name : 'Thumb-a',
    props : {
        liData : Object,
    },
    computed: {
        title(){
            return this.liData.title.replaceAll('\n', '<br />')
        }
    }
}
</script>