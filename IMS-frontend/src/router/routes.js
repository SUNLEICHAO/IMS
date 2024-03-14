import BasicLayout from '@/components/Layout/BasicLayout.vue';
import Home from '@/views/HomeIndex.vue';
import Article from '@/views/ArticleIndex.vue';
import NotFound from '@/views/Common/NotFound.vue';
import routesAcademy from './routesAcademy';

export default [
  {
    path: '/',
    name: 'Root',
    component: BasicLayout,
    redirect: {
      name: 'Home'
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/classification/:id',
        name: 'classification',
        component: Home
      },
      {
        path: '/article/:id',
        name: 'article',
        component: Article
      },
      ...routesAcademy,
      // ...routesClassification
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
];
