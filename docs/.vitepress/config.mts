import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  
  title: "ZSTU ACM",
  description: "A VitePress Site",
  head: [
    ['link', { rel: 'icon', href: '/docs/favicon.ico'}]
  ],

  themeConfig: {
    outlineTitle: '目录',
    outline: [1,6],
    logo: '/logo2.jpg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'ACM', link: '/ACM/instruction'},
      { text: '集训队', link: '/group/instruction' },
      { text: '荣誉殿堂', link: '/honor/ICPC'}
    ],

    sidebar: {
        '/group/':  [
          {
            text: '集训队',
            items: [
              { text: '集训队简介', link: '/group/instruction'},
              { text: '集训队章程', link: '/group/constitution' },
              { text: '教练', link: '/group/coach'},
              { text: '队员信息', link: '/group/members' }
            ]
          }
        ],

        '/ACM/': [
          {
            text: 'ACM',
            items: [
              { text: 'ACM 是什么', link: '/ACM/instruction' },
              { text: '比赛赛季时间安排', link: '/ACM/schedule' },
              { text: '训练平台', link: '/ACM/training platform'}
            ]
          }
        ],

        '/honor/':[
          {
            text: '历史战绩',
            items:[
              { text: 'ICPC', link: '/'},
              { text: 'CCPC', link: '/'},
              { text: 'ZJCPC', link: '/'},
              { text: 'CCCC', link: '/'},
              { text: '蓝桥杯', link: '/'},
              { text: 'Astar', link: '/'} 
            ]
          }
        ]
    },
    

    socialLinks: [
      { icon: 'github', link: 'https://github.com/IceIns/docs' }
    ]
  },

  markdown: {
    math: true
  },  
})
