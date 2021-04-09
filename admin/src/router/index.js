import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

Vue.use(Router)
const router = new Router({
    routes,
    base: '/leadshop',
    mode: 'history' //history || hash
})

router.beforeEach((to, from, next) => {
    try {
        let whiteList = [];
        // 开启$Cloud
        const $heshop = router.app.$heshop;
        // 获取AppNmae
        const AppName = $heshop.AppAlias || $heshop.AppName;
        // 获取登录页面
        const loginPage = "/login/index";

        // 处理白名单列表
        whiteList = $heshop.AppConfig.whiteList || [];

        //判断用户是否登陆
        if ($heshop.getToken()) {
            if (to.path == loginPage) {
                next("/");
            } else {
                next();
            }
        } else {
            //处理白名单配置
            if (whiteList.includes(to.name)) {
                // 在免登录白名单，直接进入
                next();
            } else {
                let toPath = '/';
                if (to.path !== loginPage) {
                    toPath = to.fullPath;
                    next({ path: loginPage, query: { redirect: toPath } });
                } else {
                    next();
                }
            }
        }
    } catch (error) {
        console.error("err", error)
    }

})

router.afterEach(to => {
    // window.scrollTo(0, 0)
})

export default router