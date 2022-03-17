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


<style lang="scss">
.list-wrap {
  padding: 0 0 160px;
  background: linear-gradient(rgb(0,0,0), rgb(15,69,155), rgb(132,103,66));
}
</style>