'use strict'

// module.exports = {
//   root: "lib",
//   clean: false,
//   sourceMap: true,
//   webpack: {
//     umd: {
//       entry: "./src/index.js",
//       library: "GorgeousUI",
//       filename: 'gorgeous-ui.js'
//     },
//     externals: {
//       vue: "vue"
//     }
//   }
// }

const path = require('path')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  devtool: 'source-map',

  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: '/build/',
    filename: 'gorgeous-ui.js',
    library: 'GorgeousUI',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  // 加载器
  module: {
    // https://doc.webpack-china.org/guides/migrating/#module-loaders-module-rules
    rules: [
      {
        // https://vue-loader.vuejs.org/en/configurations/extract-css.html
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postLoaders: {
            html: 'babel-loader?sourceMap'
          },
          sourceMap: true,
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          sourceMap: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]
}
