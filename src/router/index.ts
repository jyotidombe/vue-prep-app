import {createRouter, createWebHistory} from 'vue-router';
import login from '../views/login.vue';
import dashboard from '../views/dashboard.vue';
import adminView from '../views/adminView.vue';
import { useAuthStore } from '../store/auth';
import ManagerView from '../views/managerView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/',component: login},
        { path: '/login',component: login},
        { path: '/dashboard', component: dashboard, meta: { requiresAuth: true } },
        { path: '/admin', component: adminView, meta: { requiresAuth: true, role:['admin']} },
        { path: '/manager', component: ManagerView, meta: { requiresAuth: true, role:['manager','admin']} },
        { path: '/tasks', component: () => import('../views/taskPage.vue'), meta: { requiresAuth: true } }
    ]
});

function getDefaultRoute(role: string) {
    switch(role){
        case 'admin':
            return '/admin';
        case 'manager':
            return '/manager';
        default:
            return '/dashboard';
    }
}

router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    if(to.meta.requiresAuth && !auth.user){
        return next('/login');
    } 

    if(to.meta.role && (!Array.isArray(to.meta.role) || !to.meta.role.includes(auth.user?.role))){
        return next(getDefaultRoute(auth.user?.role || ''));
    }
    
    if(to.path === '/login' && auth.user){
        return next(getDefaultRoute(auth.user?.role || ''));
    }
    
    next();
});

export default router;