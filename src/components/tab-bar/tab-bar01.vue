<template>
    <div class="tab-bar">
        <template v-for="(item, index) in tabbarData">
            <div class="tab-bar-item" :class="{ active: currentIndex === index }" @click="itemClick(item, index)">
                <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                <img v-else :src="getAssetURL(item.imageActive)" alt="">
                <span class="text">{{ item.text }}</span>
            </div>
        </template>
    </div>
</template>

<script setup>
import tabbarData from '@/assets/data/tabbar';
import { getAssetURL } from '@/utils/load_assets'
import { ref } from 'vue'
import { useRouter } from "vue-router";
const currentIndex = ref(0)
const router = useRouter()
const itemClick = (item, index) => {
    currentIndex.value = index
    router.push(item.path)
}

</script>

<style lang="less" scoped>
.tab-bar {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    // background-color: pink;
    height: 50px;

    .tab-bar-item {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    &.active {
        color: var(--primary-color);
    }

    img {
        width: 36px;
    }

    .text {
        font-size: 10px;
        margin-top: 2px;
    }
}
</style>