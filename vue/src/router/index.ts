import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            path: "/test",
            name: "test",
            component: () => import("../views/TestView.vue")
        },
        {
            path: "/load-excel",
            name: "load-excel",
            component: () => import("../views/LoadExcel.vue")
        },
        {
            path: "/audio-test",
            name: "audio-test",
            component: () => import("../components/AudioTest.vue")
        },
        {
            path: "/audio-test2",
            name: "audio-test2",
            component: () => import("../views/AudioTest2.vue")
        },
        {
            path: "/1v1question",
            name: "1v1question",
            component: () => import("../views/1v1Question.vue"),
        },
        {
            path: "/test-animation",
            name: "test-animation",
            component: () => import("../views/TestAnimation.vue"),
        },
        {
            path: "/1v1Question",
            name: "1v1Question",
            component: () => import("../views/1v1Question.vue")
        },
        {
            path: "/scheduleTable",
            name: "ScheduleTable",
            component: () => import("../components/ScheduleTable.vue")
        }
    ]
})

export default router
