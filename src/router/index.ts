import { ref, shallowRef } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import sidebarItems from '@/layouts/full/vertical-sidebar/sidebarItem';

import { useNavbarStore } from '@/stores/navbar';
const sidebarMenu = shallowRef(sidebarItems);

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/authentication/Error.vue')
        },
        MainRoutes,
        AuthRoutes
    ]
});
// router.beforeEach((to, from, next) => { 
//     const store = useNavbarStore();  
//     const toRouter = sidebarMenu.value.filter((data) => data.to === to.path)
//     if(toRouter.length > 0){
//         store.setPath(toRouter[0].to)
//         store.setName(toRouter[0].title)
//     } 
//     next();
// }); 


router.beforeEach((to, from, next) => {
    // const auth = useAuthStore();
    let username = localStorage.getItem('username');
    console.log("to.meta.requiresAuth   : ", to.meta.requiresAuth );
    if (to.meta.requiresAuth && !username) {
        next('/auth/login');
    } else {
        const store = useNavbarStore();  
        const toRouter = sidebarMenu.value.filter((data) => data.to === to.path)
        if(toRouter.length > 0){
            store.setPath(toRouter[0].to || '')
            store.setName(toRouter[0].title || '')
        } 
        next();
    }
});
//export default router;