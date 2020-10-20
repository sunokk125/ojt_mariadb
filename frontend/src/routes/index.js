import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import Main from '../components/Index.vue'
import InsertPost from '../components/InsertPost.vue'
import DetailPost from '../components/DetailPost.vue'
import UpdatePost from '../components/UpdatePost.vue'
import MyPage from '../components/MyPage.vue'
import UpdateUser from '../components/UpdateUser.vue'
import UpdateCorp from '../components/UpdateCorp.vue'



Vue.use(VueRouter)

export const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/',
            name:'login',
            component: Login,
        },{
            path: '/signUp',
            name:'signUp',
            component: SignUp,
        },{
            path: '/main',
            name:'main',
            component: Main,
        },{
            path: '/insertPost',
            name:'insertPost',
            component: InsertPost,
        },{
            path: '/detailPost/:postId',
            name:'detailPost',
            component: DetailPost,
        },{
            path: '/updatePost',
            name:'updatePost',
            component: UpdatePost,
        },{
            path: '/mypage',
            name:'mypage',
            component: MyPage,
        },{
            path: '/updateUser',
            name:'updateUser',
            component: UpdateUser,
        },{
            path: '/updateCorp',
            name:'updateCorp',
            component: UpdateCorp,
        }
    ]
})  