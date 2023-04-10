<template>
    <div class="city-group">
        <van-index-bar :index-list="indexList">
            <!-- 热门部分 -->
            <van-index-anchor index="热门" />
            <!-- 热门列表部分 -->
            <div class="list">
                <template v-for="(city, index) in groupData.hotCities">
                    <div class="city" @click="CityClick(city)">{{ city.cityName }}</div>
                </template>
            </div>
            <!-- 索引导航部分 -->
            <template v-for="(group, index) in groupData?.cities" :key="index">
                <van-index-anchor :index="group.group" />
                <template v-for="(city, indey) in group.cities" :key="indey">
                    <van-cell :title="city.cityName" @click="CityClick(city)" />
                </template>
            </template>
        </van-index-bar>
    </div>
</template>
<script setup>
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import useCityStore from '@/store/module/city'
//定义props
const props = defineProps({
    groupData: {
        type: Object,
        default: () => ({})
    }
});
//自定义索引
const indexList = computed(() => {
    const list = props.groupData.cities.map(item => item.group)
    list.unshift('#')
    return list
})

//监听城市的点击
const router = useRouter()
const cityStore = useCityStore()
const CityClick = (city) => {
    cityStore.currentCity = city
    // console.log(city)

    //路由回显
    router.back()
}
</script>

<style lang="less" scoped>
.list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
    padding-right: 25px;

    .city {
        width: 70px;
        height: 28px;
        border-radius: 14px;
        font-size: 12px;
        color: #000;
        text-align: center;
        line-height: 28px;
        background-color: #fff4ec;
        margin: 6px 0;
    }
}
</style>