const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') },
      {
        path: '/pages/:page_url',
        name: 'Pages',
        component: () => import('pages/Pages.vue')
      },
      {
        path: '/pages/edit/:id',
        name: 'Pages Edit',
        component: () => import('components/Editor.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
