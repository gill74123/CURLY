import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/front/Home.vue'),
    children: [
      {
        path: '/',
        component: () => import('../views/front/Index.vue')
      },
      {
        path: 'about',
        component: () => import('../views/front/About.vue')
      },
      {
        path: 'products',
        component: () => import('../views/front/Products.vue')
      },
      {
        path: 'carts',
        component: () => import('../views/front/Carts.vue')
      },
      {
        path: 'order',
        component: () => import('../views/front/Order.vue')
      },
      {
        path: 'pay/:id',
        component: () => import('../views/front/Pay.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/front/ProductItem.vue')
      },
      {
        path: 'articles',
        component: () => import('../views/front/Articles.vue')
      },
      {
        path: 'article/:id',
        component: () => import('../views/front/ArticleItem.vue')
      }
    ]
  },
  // 後台
  {
    path: '/admin',
    component: () => import('../views/admin/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/Products.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/admin/Orders.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/Coupons.vue')
      },
      {
        path: 'articles',
        component: () => import('../views/admin/Articles.vue')
      }
    ]
  },
  // 登入
  {
    path: '/login',
    component: () => import('../views/front/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active' // Bootstrap
})

export default router
