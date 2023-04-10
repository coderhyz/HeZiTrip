<template>
    <div class="city top-page">
        <div class="top">
            <!-- 搜索框 -->
            <van-search v-model="searchValue" placeholder="城市/区域/位置" shape="round" show-action @cancel="cancelClick" />
            <!-- tab栏 -->
            <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
                <template v-for="(value, key, index) in allCities">
                    <van-tab :title="value.title" :name="key"></van-tab>
                </template>
            </van-tabs>
        </div>
        <!-- 内容组件 -->
        <div class="content">
            <template v-for="(value, key) in allCities">
                <!-- <h2 v-show="tabActive === key">{{ value.title }}</h2> -->
                <city-group v-show="tabActive === key" :group-data="value" />
            </template>
        </div>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { computed } from '@vue/reactivity';
// import { getCityAll } from '@/service';
import useCityStore from '@/store/module/city';
import CityGroup from './cpn/city-group.vue';
const router = useRouter()
//搜索框绑定ref响应式变量
const searchValue = ref('')

//城市界面回退  主页面
const cancelClick = () => {
    router.back()
}
//tab的切换
const tabActive = ref()
//网络请求：请求城市的数据
/**
 * 这个位置发送网络请求有两个缺点 
 *  1.如果网络请求太多，这个页面会包含大量的对于网络球球和数据的处理逻辑
 * 2.如果页面封装了很多的子组件，子组件需要这些数据，我们必须一步步将数据传递过去（props）
 */
// const allCity = ref({})
// getCityAll().then(res => {
//     console.log(res)
//     allCity.value = res.data
// })
//从useCityStore获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)
// 获取选中标签的数据
// 1.获取正确的key,将tabs中绑定的tabaction正确绑定
//2.根据key从alcities中获取书库，默认直接获取的数不是响应式的，必须包裹一层computed
const currentGroup = computed(() => allCities.value[tabActive.value])
</script>

<style lang="less" scoped>
.city {
    .top {
        position: relative;
        z-index: 9;
    }

    // 布局滚动
    .content {
        height: calc(100vh - 98px);
        overflow-y: auto;
    }
}
</style>  









