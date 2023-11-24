import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login',
        component: () => import('../layouts/LoginLayout.vue'),
        children: [
          {
            path: '/login',
            component: () => import('../pages/LoginPage.vue'),
            beforeEnter: (to, from, next) => {
              const token = localStorage.getItem('token')
              if (token) {
                next('/home')
              } else {
                next()
              }
            },
          },
        ],
    },
    {
        path: '/',
        redirect: '/home',
        component: () => import('../layouts/HomeLayout.vue'),
        children: [
          {
            path: 'home',
            component: () => import('../pages/HomePage.vue')
          }
        ]
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('../pages/404Page.vue'),
      }
]

export default routes;