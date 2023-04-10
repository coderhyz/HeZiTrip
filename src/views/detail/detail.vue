<template>
    <div class="detail top-page" ref="detailRef">
        <tab-control v-if="ShowTabControl" class="tabs" ref="tabControlRef" :titles="names" @tab-item-click="tabClick" />
        <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
        <div class="main" v-if="mainPart" v-memo="[mainPart]">
            <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
            <detail-infos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule" />
            <detail-facility name="设施" :ref="getSectionRef"
                :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
            <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule" />
            <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule" />
            <detail-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
            <detail-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule" />
            <detail-intro :price-intro="mainPart.introductionModule" />
        </div>
        <div class="footer">
            <img src="@/assets/img/detail/icon_ensure.png" alt="">
            <div class="text">弘源旅途, 永无止境!</div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDetailInfos } from "@/service"

import TabControl from "@/components/tab-control/tab-control.vue"
import DetailSwipe from "./cpns/detail_01-swipe.vue"
import DetailInfos from "./cpns/detail_02-infos.vue"
import DetailFacility from "./cpns/detail_03-facility.vue"
import DetailLandlord from "./cpns/detail_04-landlord.vue"
import DetailComment from "./cpns/detail_05-comment.vue"
import DetailNotice from "./cpns/detail_06-notice.vue"
import DetailMap from "./cpns/detail_07-map.vue"
import DetailIntro from "./cpns/detail_08-intro.vue"
import useScroll from '@/hooks/useScroll'

const router = useRouter()

//返回按钮
const onClickLeft = () => {
    router.back()
}
//发送网络请求
const route = useRoute()
const houseId = route.params.id
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
// console.log(mainPart)
getDetailInfos(houseId).then(res => {
    detailInfos.value = res.data
})
// 控制tab栏的显示
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const ShowTabControl = computed(() => {
    // console.log(scrollTop.value);
    return scrollTop.value >= 300
})
//tab栏内容names动态显示
const sectionEls = ref({})
//获取根组件元素
const getSectionRef = (value) => {
    // console.log(value.$el)
    if (!value) return
    const name = value.$el.getAttribute('name')
    sectionEls.value[name] = value.$el
}
const names = computed(() => {
    return Object.keys(sectionEls.value)
})
//tab栏切换滚动事件
/*
1.获取根组件元素件键值
2.键值找到根组件元素
3.根组件元素里的元素方法获取到instance实例
4.detailref进行滚动
*/
let isClick = false
let currentDistance = -1
const tabClick = (index) => {
    const key = Object.keys(sectionEls.value)[index]
    const el = sectionEls.value[key]
    let distance = el.offsetTop
    if (index !== 0) {
        distance = distance - 44
    }
    isClick = true
    currentDistance = distance
    detailRef.value.scrollTo({
        top: distance,
        behavior: 'smooth'
    })
}
//详情页滚动
const tabControlRef = ref()
watch(scrollTop, (newValue) => {
    if (newValue === currentDistance) {
        isClick = false
    }
    if (isClick) return

    // 1.获取所有的区域的offsetTops
    const els = Object.values(sectionEls.value)
    const values = els.map(el => el.offsetTop)

    // 2.根据newValue去匹配想要索引
    let index = values.length - 1
    for (let i = 0; i < values.length; i++) {
        if (values[i] > newValue + 44) {
            index = i - 1
            break
        }
    }
    // console.log(index)
    tabControlRef.value?.setCurrentIndex(index)
})
</script>

<style lang="less" scoped>
.detail {
    .tabs {
        position: fixed;
        z-index: 9;
        left: 0;
        right: 0;
        top: 0;
    }

    .footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 120px;

        img {
            width: 123px;
        }

        .text {
            margin-top: 12px;
            font-size: 12px;
            color: #7688a7;
        }
    }
}
</style>