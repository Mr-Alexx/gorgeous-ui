module.exports = {
  // examples入口, vue-cli3中只有VUE_APP_开头的自定义环境变量才会被解析
  pages: {
    index: {
      entry: process.env.VUE_APP_DEMO_ENV ? 'examples/demo.js' : 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  }
}
