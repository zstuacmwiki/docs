import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  
  title: "ZSTU ACM",
  description: "A VitePress Site",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico'}]
  ],

  themeConfig: {
    outlineTitle: '目录',
    outline: [2,6],
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
              { text: '集训队管理条例', link: '/group/constitution' },
              { text: '教练', link: '/group/coach'},
              { text: '队员信息', link: '/group/members' },
              { text: '队员风采', link: '/group/demeanour'},
              { text: '校级比赛', link: '/group/contest'}
            ]
          }
        ],

        '/ACM/': [
          {
            text: 'ACM',
            items: [
              { text: 'ACM 是什么', link: '/ACM/instruction' },
              { text: '比赛赛季时间安排', link: '/ACM/schedule' },
              { text: '学习资料', link: '/ACM/training platform'}
            ]
          }
        ],

        '/honor/':[
          {
            text: '历史战绩',
            items:[
              { text: 'ICPC', link: '/honor/ICPC'},
              { text: 'CCPC', link: '/honor/CCPC'},
              { text: 'ZJCPC', link: '/honor/ZJCPC'},
              { text: 'CCCC', link: '/honor/CCCC'},
              { text: '蓝桥杯', link: '/honor/蓝桥杯'},
              { text: 'Astar', link: '/honor/Astar'} 
            ]
          }
        ]
    },
    

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zstuacmwiki/docs' }
    ]
  },

  markdown: {
    math: true
  },
  
})
