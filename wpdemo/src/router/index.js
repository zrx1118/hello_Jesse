import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由实例
const  router = new Router({
    mode: 'hash',
    routes: [
        { path: '/', component: home }
    ]
})

// 全局守卫
router.beforeEach((to, from, next) => {
    //to and from are Route Object,next() must be called to resolve the hook
    // to: Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    // next: Function: 一定要调用该方法来 resolve 这个钩子
    
})