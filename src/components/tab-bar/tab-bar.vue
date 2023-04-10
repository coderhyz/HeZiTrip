<template>
    <div class="tab-bar">
        <div class="tab-bar-item">
            <img src="@/assets/img/tabbar/tab_home.png" alt="">
            <span class="text">首页</span>
        </div>
        <div class="tab-bar-item">
            <img src="@/assets/img/tabbar/tab_favor.png" alt="">
            <span class="text">收藏</span> 
        </div>
        <div class="tab-bar-item">
            <img src="@/assets/img/tabbar/tab_order.png" alt="">
            <span class="text">订单</span>
        </div>
        <div class="tab-bar-item">
            <img src="@/assets/img/tabbar/tab_message.png" alt="">
            <span class="text">消息</span>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.tab-bar {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: pink;
    height: 50px;

    .tab-bar-item {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    img {
        width: 36px;
    }

    .text {
        font-size: 1px;
        margin-top: 2px;
    }
}
</style>