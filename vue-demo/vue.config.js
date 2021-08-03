module.exports = {
  /**
   * 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，
   * 例如 https://www.my-app.com/。如果应用被部署在一个子路径上，
   * 你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，
   * 则设置 publicPath 为 /my-app/
   */
  publicPath: '/',

  outputDir: 'dist',

  assetsDir: '',

  indexPath: 'index.html',

  // 在生成的静态资源在它们的文件名中添加 hash
  filenameHashing: true,

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  lintOnSave: false,

  productionSourceMap: true, // 生产环境下css 分离文件
  
  // 覆盖webpack默认配置
  configureWebpack: {
    resolve: {
      alias: {
        src: '@',
      },
    },
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    open: true,
    https: true,
    // proxy: {
    //   '/api': {
    //     target: 'https://gmstest.gtmc.com.cn/GMSAPPIF',
    //     changeOrigin: true, //如果接口跨域，需要进行这个参数配置
    //     secure: false, // 如果是https接口，需要配置这个参数?
    //     pathRewrite: { '^/api': '/' }, //重写之后url为 https://gmstest.gtmc.com.cn/xxxx
    //   },
    // },
  },
};
