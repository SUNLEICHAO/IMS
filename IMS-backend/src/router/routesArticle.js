const ArticleLayout = () => import('@/components/Layout/ArticleLayout.vue');
const ArticleIndex = () =>
  import(/* webpackChunkName: "article" */ '@/views/Article/ArticleIndex.vue');
const ArticleEdit = () =>
  import(/* webpackChunkName: "article" */ '@/views/Article/ArticleEdit.vue');
const ArticleShow = () =>
  import(/* webpackChunkName: "article" */ '@/views/Article/ArticleShow.vue');
const ArticleCreate = () =>
  import(/* webpackChunkName: "article" */ '@/views/Article/ArticleCreate.vue');
const ArticleClassify = () =>
  import(/* webpackChunkName: "article" */ '@/views/Article/ArticleClassify.vue');

export default [
  {
    path: '/article',
    name: 'Article',
    redirect: { name: 'ArticleIndex' },
    component: ArticleLayout,
    meta: {
      permission: 'article-index,article-classify',
      title: '文章管理',
      nav: {
        // icon: 'el-icon-goods',
        // icon: 'icon-file',
        icon: 'icon-article',
        title: '文章管理'
      },
      breadcrumb: {
        name: '文章'
      }
    },
    children: [
      {
        path: '',
        name: 'ArticleIndex',
        component: ArticleIndex,
        meta: {
          permission: 'article-index',
          nav: {
            title: '文章列表'
            // icon: 'icon-setting'
          },
          breadcrumb: {
            name: '文章列表'
          }
        }
      },
      {
        path: ':id',
        name: 'ArticleShow',
        component: ArticleShow
      },
      {
        path: ':id/edit',
        name: 'ArticleEdit',
        component: ArticleEdit,
        meta: {
          breadcrumb: {
            name: '文章编辑'
          }
        }
      },
      {
        path: 'create',
        name: 'ArticleCreate',
        component: ArticleCreate,
        meta: {
          // permission: 'article-create',
          nav: {
            title: '文章创建',
            icon: 'icon-setting'
          },
          breadcrumb: {
            name: '文章创建'
          }
        }
      },
      {
        path: 'classify',
        name: 'ArticleClassify',
        component: ArticleClassify,
        meta: {
          permission: 'article-classify',
          nav: {
            title: '文章分类'
          },
          breadcrumb: {
            name: '文章分类'
          }
        }
      }
    ]
  }
];
