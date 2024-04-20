const MusicIndex = () => import('@/views/Music/MusicIndex.vue');
const MusicUpload = () => import('@/views/Music/MusicUpload.vue');

export default [
  {
    path: '/music',
    name: 'Music',
    redirect: { name: 'MusicIndex' },
    meta: {
      // permission: 'music-index',
      title: '音乐管理',
      nav: {
        icon: 'icon-music',
        title: '音乐管理'
      },
      breadcrumb: {
        name: '音乐'
      }
    },
    children: [
      {
        path: '',
        name: 'MusicIndex',
        component: MusicIndex,
        meta: {
          // permission: 'music-index',
          nav: {
            title: '音乐列表'
            // icon: 'icon-setting'
          },
          breadcrumb: {
            name: '音乐列表'
          }
        }
      },
      {
        path: '/upload',
        name: 'MusicUpload',
        component: MusicUpload,
        meta: {
          nav: {
            title: '音乐上传'
          },
          breadcrumb: {
            name: '音乐上传'
          }
        }
      }
    ]
  }
];
