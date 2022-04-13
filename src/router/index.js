import { createWebHistory, createRouter } from "vue-router";

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ('@/views/Home.vue')
    },
    {
        path: '/reference',
        name: 'Reference',
        component: () =>
            import ('@/views/reference/List.vue')
    }
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

//  원래 있던 createWebHashHistory() 를 사용할 경우 브라우저의 히스토리모드를 사용하는것이 아닌 해시"#" 링크 방식을 사용함. 
//  서버에서 지원을 안해주더라도 새로고침시 원래 페이지 잘 링크 들어가나 seo에 문제가 생김.
//  createWebHistory()를 사용하면 서버사이드(asp-윈도우서버)에서 설정을 해줘야 원활한 새로고침이 되며(송실장이 해줄 수 있음)
//  페이지의 링크에 "#"이 빠져서 깔끔하고 SPA 서비스라 문제가 없을 수는 없지만 그래도 "#" 사용하는 링크보다는 SEO문제가 덜 생김.
//  괄호() 안에 루트... 그러니까 Base URL이 들어가야 하며, 이는 env세팅 파일에 있는 설정을 활용하기 위해 process.env.BASE_URL 사용.

//  그리고 여러 페이지 사용시에 번거롭게 되는 상황. 즉 스크립트 상단에서 임포트 하고 그 컴포넌트명으로 routes의 각 componunt에서 이를 사용하는 방식보다는 
//  각 라우팅 항목별 "component: ()=> import('@/views/Home.vue')" 처럼 펑션 임포트로 바로 연결해주는 더 직관적인 코딩방식으로 변경.

export default router;


// import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home.vue'
// import Reference from '../views/reference/List.vue'



// const routes = [{
//         path: '/',
//         name: 'Home',
//         component: Home
//     },
//     {
//         path: '/reference',
//         name: 'Reference',
//         component: Reference
//     }
// ]

// const router = createRouter({
//     history: createWebHashHistory(),
//     routes
// })

// export default router