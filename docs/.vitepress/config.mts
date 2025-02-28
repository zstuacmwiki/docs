import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZSTU ACM",
  description: "A VitePress Site",
  
  themeConfig: {
    logo: '/logo2.jpg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '集训队', link: '/markdown-examples' },
      { text: '荣誉殿堂', link: '/'}
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/IceIns/docs' }
    ]
  },

  markdown: {
    math: true
  },

  base: '/docs/'
  
})
