import {
    createRouter,
    createWebHashHistory,
} from 'vue-router';
import routes from './routes';

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (!token && to.fullPath !== '/login') {
        next('/login')
    }
    next()  
})

export default router;