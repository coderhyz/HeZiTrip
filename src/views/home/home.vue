<template>
    <div class="home" ref="homeRef">
        <home-nav />
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <home-search />
        <home-categories />
        <div class="search-bar" v-if="isShowSearchBar">
            <search-bar />
        </div>
        <home-content />
    </div>
</template>

<script>
export default {
    name: "home"
}
</script>
<script  setup>
import HomeNav from './cpn/home-nav.vue'
import HomeSearch from './cpn/home-search.vue'
import HomeCategories from './cpn/home-categories.vue'
import HomeContent from './cpn/home-content.vue'
import useHomeStore from '@/store/module/home';
import useScroll from '@/hooks/useScroll';
import SearchBar from '@/components/search-bar/search-bar.vue'
import { watch, ref, onActivated } from 'vue';
import { computed } from '@vue/reactivity';
//发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriestData()
homeStore.fetchHouseListData()
// const moreBtnClick = () => {
//     homeStore.fetchHouseListData()
// }
//滚动监听
const homeRef = ref()
// console.log(homeRef)
const { isReachBottom, scrollTop } = useScroll(homeRef)
watch(isReachBottom, (newValue) => {
    if (newValue) {
        homeStore.fetchHouseListData().then(() => {
            isReachBottom.value = false
        })
    }
})
//监听滚动事件控制搜索框隐藏显示
const isShowSearchBar = computed(() => {
    // console.log(scrollTop.value)
    return scrollTop.value >= 360
})

// 跳转回home时, 保留原来的位置
onActivated(() => {
    homeRef.value?.scrollTo({
        top: scrollTop.value
    })
})
</script>

<style lang="less" scoped>
.home {
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
    padding-bottom: 60px;

    .banner {
        img {
            width: 100%;
        }
    }

    .search-bar {
        position: fixed;
        z-index: 9;
        top: 0;
        left: 0;
        right: 0;
        height: 45px;
        // padding: 16px 16px 10px;
        background-color: #fff;
    }
}
</style>