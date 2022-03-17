import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Reference from '../views/reference/List.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/reference',
        name: 'Reference',
        component: Reference
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router