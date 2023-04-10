<template>
    <div class="swipe">
        <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
            <template v-for="(item, index) in swipeData">
                <van-swipe-item class="item">
                    <img :src="item.url" alt="">
                </van-swipe-item>
            </template>
            <template #indicator="{ active, total }">
                <div class="indicator">
                    <template v-for="(value, key, index) in swipeGroup" :key="key">
                        <div class="item" :class="{ active: swipeData[active]?.enumPictureCategory == key }">
                            <span class="text">{{ getName(value[0].title) }}</span>
                            <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                                {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
                            </span>
                        </div>
                    </template>
                </div>
            </template>
        </van-swipe>

    </div>
</template>

<script setup>
const props = defineProps({
    swipeData: {
        type: Array,
        default: () => []
    }
})
//进行数据转换
const swipeGroup = {}
//一次循环
for (const item of props.swipeData) {
    let valueArray = swipeGroup[item.enumPictureCategory]
    if (!valueArray) {
        valueArray = []
        swipeGroup[item.enumPictureCategory] = valueArray
        // console.log(valueArray)
    }
    valueArray.push(item)
}
// console.log(swipeGroup)
// 定义转换数据的方法
const nameReg = /【(.*?)】/i
const getName = (name) => {
    // return name.replace("：", "").replace("】", "").replace("【", "")
    const results = nameReg.exec(name)
    return results[1]
}
//获取类别索引
const getCategoryIndex = (item) => {
    const valueArray = swipeGroup[item.enumPictureCategory]
    return valueArray.findIndex(data => data === item) + 1
}
</script>

<style lang="less" scoped>
.swipe {
    box-sizing: border-box;

    .swipe-list {
        .item {
            img {
                width: 100%;
            }
        }

        .indicator {
            position: absolute;
            right: 5px;
            bottom: 5px;
            display: flex;
            padding: 2px 5px;
            font-size: 12px;
            color: #fff;
            background: rgba(0, 0, 0, 0.8);

            .item {
                margin: 0 3px;

                &.active {
                    padding: 0 3px;
                    border-radius: 5px;
                    background-color: #fff;
                    color: #333;
                }
            }
        }
    }
}
</style>