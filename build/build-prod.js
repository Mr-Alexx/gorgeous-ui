'use strict'

module.exports = {
  root: "lib",
  clean: true,
  sourceMap: false,
  webpack: {
    umd: {
      entry: "./src/index.js",
      library: "gorgeous-ui",
      filename: 'gorgeous-ui.min.js'
    },
    externals: {
      vue: "vue"
    }
  }
}