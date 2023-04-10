import { defineStore } from "pinia";
import { getHomeHotSuggests, getHomeCategories, getHomeHouselist } from '@/service'
const useHomeStore = defineStore('home', {
    state: () => ({
        hotSuggests: [],
        cateGories: [],
        currentPage: 1,
        houseList: []
    }),
    actions: {
        async fetchHotSuggestData() {
            const res = await getHomeHotSuggests()
            this.hotSuggests = res.data
        },
        async fetchCategoriestData() {
            const res = await getHomeCategories()
            this.cateGories = res.data
        },
        async fetchHouseListData() {
            const res = await getHomeHouselist(this.currentPage)
            //展开运算符加入到房屋列表中
            this.houseList.push(...res.data)
            this.currentPage++
        },

    }
})

export default useHomeStore