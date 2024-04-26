import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/pages/login.vue")
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/pages/register.vue")
    },
    {
        path: "/",
        name: "home",
        component: () => import("@/views/home/home.vue")
    },
    {
        path: "/list-borrow",
        name: "listBorrow",
        component: () => import("@/views/pages/listBorrow.vue"),
        children: [
            {
                path: "borrow1",
                name: "borrow1",
                component: () => import("@/components/borrow1.vue")
            },
            {
                path: "borrow2",
                name: "borrow2",
                component: () => import("@/components/borrow2.vue")
            },
            {
                path: "borrow3",
                name: "borrow3",
                component: () => import("@/components/borrow3.vue")
            },
            {
                path: "borrow4",
                name: "borrow4",
                component: () => import("@/components/borrow4.vue")
            },
        ]
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});


export default router;