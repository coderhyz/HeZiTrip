<template>
    <div class="tab-bar">
        <van-tabbar v-model="currentIndex" active-color="#ff9854">
            <template v-for="(item, index) in tabbarData">
                <van-tabbar-item :to="item.path">
                    <template #default>
                        <span> {{ item.text }}</span>
                    </template>
                    <template #icon>
                        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                        <img v-else :src="getAssetURL(item.imageActive)" alt="">
                    </template>
                </van-tabbar-item>
            </template>
        </van-tabbar>
    </div>
</template>

<script setup>
import tabbarData from '@/assets/data/tabbar'
import { getAssetURL } from '@/utils/load_assets'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router';
// import { useRouter } from "vue-router"

// const router = useRouter()
// const itemClick = (item, index) => {
//     currentIndex.value = index
//     router.push(item.path)
// }
//监听路由改变时，找到对应的索引，设置currentIndex
const route = useRoute()
const currentIndex = ref(0)
watch(route, (newValue) => {
    const index = tabbarData.findIndex(item => item.path === newValue.path)
    // console.log(index)
    if (index === -1) return
    currentIndex.value = index

})
</script>

<style lang="less" scoped>
.tab-bar {
    // display: flex;
    // position: fixed;
    // bottom: 0;
    // left: 0;
    // right: 0;
    // // background-color: pink;
    // height: 50px;

    // .tab-bar-item {
    //     display: flex;
    //     flex: 1;
    //     flex-direction: column;
    //     justify-content: center;
    //     align-items: center;
    // }

    // &.active {
    //     color: var(--primary-color);
    // }

    img {
        height: 26px;
    }

    .text {
        font-size: 8px;
        margin-top: 2px;
    }
}
</style>