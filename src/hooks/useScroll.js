import { onDeactivated, onMounted, onUnmounted, ref } from 'vue';
import { throttle } from 'underscore'

//useScroll 函数
export default function useScroll(elRef) {
    let el = window
    const isReachBottom = ref(false)
    const clientHeight = ref(0)
    const scrollTop = ref(0)
    const scrollHeight = ref(0)
    //节流函数
    const scrollListenerHandler = throttle(() => {
        if (el === window) {
            clientHeight.value = document.documentElement.clientHeight
            scrollTop.value = document.documentElement.scrollTop
            scrollHeight.value = document.documentElement.scrollHeight
        } else {
            clientHeight.value = el.clientHeight
            scrollTop.value = el.scrollTop
            scrollHeight.value = el.scrollHeight
        }

        // console.log(scrollTop.value)
        if (clientHeight.value + scrollTop.value + 1 >= scrollHeight.value) {
            console.log('底部')
            isReachBottom.value = true
        }
    }, 100)

    onMounted(() => {
        if (elRef) el = elRef.value
        el.addEventListener('scroll', scrollListenerHandler)
    })
    onUnmounted(() => {
        el.removeEventListener('scroll', scrollListenerHandler)
    })
    //返回对象
    return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}