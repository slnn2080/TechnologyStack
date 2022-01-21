import { resolve } from 'path'
import path from "path"

import Sass from "sass"


export default {
  // 疑似JAMSTACKなのでSTATICを指定
  target: 'static',
  generate: {
    dir: "html_02"
  },
  // 共通head
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    title: 'KINTO ラインアップ | 株式会社KINTO',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=1.0, maximum-scale=1.0, shrink-to-fit=no' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { hid: 'og:title', property: 'og:title', content: 'title' },
      { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      // TODO:URL差し替え
      // { hid: 'og:url', property: 'og:url', content: 'https://' },
      { name: 'robots', content: 'noindex' },
    ],
    script: [
      { src: '/customer/assets/js/jquery-3.4.1.min.js' },
      { src: '/assets/js/writeGlonav.js' },
      {
        // head GTM
        hid: 'gtmHead',
        innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MVQP2NZ')`,
        type: 'text/javascript'
      }
    ],
    noscript: [
      {
        // body GTM
        hid: 'gtmBody',
        innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MVQP2NZ" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        pbody: true
      }
    ],
    // GTM設定
    __dangerouslyDisableSanitizersByTagID: {
      'gtmHead': ['innerHTML'],
      'gtmBody': ['innerHTML']
    },
    link: [
      { rel: 'canonical', href: 'url' },
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/assets/img/ic_favicon_001.ico'},
      { rel: 'stylesheet', href: '/assets/customer/css/base_layout.css' },
      { rel: 'stylesheet', href: '/assets/style/style.css' }
    ]
  },
  modules: [
    '@nuxtjs/style-resources',
  ],
  alias: {
    'scss': resolve(__dirname, './assets/scss'),
    '@': path.resolve(__dirname)
  },
  build: {
    loaders: {
      // dart-sassを使用
      scss: {
        implementation: require('sass'),
        // sassOptions: {
        //   fiber: require('fibers'),
        // },
      },
    },
  },
  // 共通で使いたい変数等
  styleResources: {
    scss: ['~/assets/css/faundation/_global.scss'],
  },
  // 共通css
  css: [
    "~/assets/css/base/_reset.scss",
    { src: '~/src/style/module/style.scss', lang: 'scss' },
    { src: '~/src/style/utility/style.scss', lang: 'scss' },
    { src: '~/src/style/layout/_container.scss', lang: 'scss' }
  ],
  plugins: [
    '~/plugins/itemCard.js',
    '~/plugins/vueLazy.js',
    '~/plugins/compositionAPI.js',
    { src: '~/plugins/init.js', ssr: false },
  ]
};
