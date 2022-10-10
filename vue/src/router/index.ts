import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestView from "../views/TestView.vue";
import TestAnimation from "../views/TestAnimation.vue";
import LoadExcel from "../views/LoadExcel.vue";
import AudioTest from "../components/AudioTest.vue";
import AudioTest2 from "../views/AudioTest2.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
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
            component: TestView
        },
        {
            path: "/load-excel",
            name: "load-excel",
            component: LoadExcel
        },
        {
            path: "/audio-test",
            name: "audio-test",
            component: AudioTest
        },
        {
            path: "/audio-test2",
            name: "audio-test2",
            component: AudioTest2
        },
        {
            path: "/1v1question",
            name: "1v1question",
            component: () => import('../views/1v1Question.vue'),
        },
        {
            path: "/test-animation",
            name: "test-animation",
            component: TestAnimation
        },
        {
            path: "/1v1Question",
            name: "1v1Question",
            component: () => import('../views/1v1Question.vue')
        }
    ]
})

export default router
