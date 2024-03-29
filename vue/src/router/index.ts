import {createRouter, createWebHistory} from 'vue-router'
// @ts-ignore
import pages from '~pages'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../vue/views/HomeView.vue')
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../vue/views/AboutView.vue')
        },
        {
            path: "/test",
            name: "test",
            component: () => import("../vue/views/TestView.vue")
        },
        {
            path: "/load-excel",
            name: "load-excel",
            component: () => import("../vue/views/LoadExcel.vue")
        },
        {
            path: "/audio-test",
            name: "audio-test",
            component: () => import("../vue/components/contents/AudioPlayer/AudioTest.vue")
        },
        {
            path: "/audio-test2",
            name: "audio-test2",
            component: () => import("../vue/views/AudioTest2.vue")
        },
        {
            path: "/1v1question",
            name: "1v1question",
            component: () => import("../vue/views/1v1Question.vue"),
        },
        {
            path: "/test-animation",
            name: "test-animation",
            component: () => import("../vue/views/TestAnimation.vue"),
        },
        {
            path: "/1v1Question",
            name: "1v1Question",
            component: () => import("../vue/views/1v1Question.vue")
        },
        {
            path: "/scheduletable",
            name: "ScheduleTable",
            component: () => import("../vue/components/contents/Scheduler/ScheduleTable.vue")
        },
        {
            path: "/loginform",
            name: "LoginForm",
            component: () => import("../vue/components/contents/LoginForm/LoginForm.vue")
        }, ...pages,
        {
            path: "/file-list/:path*",
            name: "file-list",
            component: () => import("../vue/components/contents/fileoperator/file-list.vue")
        },
    ]
})

export default router
