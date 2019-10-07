import Vue from "vue";

// 路由：1.导入路由构造函数
import VueRouter from "vue-router";
// 导入vant-ui组件
import Vant from 'vant';
// 导入axios
import axios from "axios";

// 导入组件
import App from "@/App";
import {Toast} from "vant";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Personal from "@/pages/Personal";
import EditProfile from "@/pages/EditProfile";
import UserFollow from "@/pages/UserFollow";
import UserComment from "@/pages/UserComment";
import Index from "@/pages/Index";
import PostDetail from "@/pages/PostDetail";
import Search from "@/pages/Search";


// 在.vue文件中要使用router-link或者router-view.需要注册下插件
Vue.use(VueRouter);
Vue.use(Vant);

// 把axios挂载到原型
Vue.prototype.$axios = axios; // this.$axios
// 基准路径，以后每次请求都会自动在前面加上该路径
axios.defaults.baseURL = "http://localhost:3000";

// 路由：2.创建路由配置
const routes = [
    {path: "/login", component: Login},
    {path: "/register", component: Register},
    {path: "/personal", component: Personal},
    {path: "/edit_profile", component: EditProfile},
    {path: "/user_follow", component: UserFollow },
    {path: "/user_comment", component: UserComment},
    {path: "/", component: Index},
    {path: "/post_detail/:id", component: PostDetail},
    {path: "/search", component: Search},
]

// 路由：3.创建对象
const router = new VueRouter({
    routes,
});

//路由守卫：可以理解为页面跳转之前的拦截手段，可以在拦截时判断验证用户信息，再决定是否允许用户跳转到该页面。
//to：表示要跳转到哪个页面
//from：表示从哪个页面跳转过来
//next：是一个函数，必须要调用才能跳转到下一个页面，不调用则不跳转
//next()：表示正常跳转到下一页
//next("/login")：表示重定向到指定的页面
router.beforeEach((to, from, next) => {
    // 是否有token
    const hasToken = localStorage.getItem("token");

    // 判断是否是需要登陆权限的页面
    if (to.path === "/personal" || to.path === "/edit_profile") {

        // 判断本地是否有token
        if (hasToken) {
            //表示正常跳转到下一页
            next();
        } else {
            //表示重定向到指定的页面，没有token正常跳转到登录
            next("/login")
        }

    } else {
        // 所有人都可以访问的页面正常浏览
        next();
    }

})

//响应拦截器 拦截响应信息
axios.interceptors.response.use(res => {
    const {message, statusCode} = res.data
    if (statusCode === 401) {
        Toast.fail(message)
    }
    //token过期了，或者token无效，一般引起的原因可能是token被清空或者密码被修改
    //token过期后接口会返回{message:"用户信息验证失败", statusCode:401}
    if(message === "用户信息验证失败"){
        //跳转到登录
        router.push('/login')
    }
    //必须要返回res
    return res;
})

new Vue({
    el: "#app",

    // 路由：4.挂载到根实例
    router,

    // 指定一个组件渲染根实例，这个组件可以成为最底层的组件
    render(createElement) {
        // render函数使用固定的写法，只有App是可变；
        // 在webpack中，如果想要通过vue把一个组件放到页面中去展示，render函数可以实现
        return createElement(App);
    }
})