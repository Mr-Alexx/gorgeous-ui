'use strict'

let gulp = require('gulp')
let sass = require('gulp-sass')
let autoprefixer = require('gulp-autoprefixer') // 根据需要自动补全浏览器前缀
let min = require('gulp-minify-css')
let rename = require('gulp-rename')

gulp.task('compile', () => {
  return gulp.src('../src/styles/theme-chalk/index.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(min())
    .pipe(rename('gorgeous-ui.css'))
    .pipe(gulp.dest('../lib'))
    // .pipe(gulp.dest('../lib/theme-chalk')) // 相对于gulpfile.js文件的路径
})

gulp.task('font', () => {
  return gulp.src('../src/styles/fonts/**')
    .pipe(min())
    .pipe(gulp.dest('../lib/fonts'))
    // .pipe(gulp.dest('../lib/theme-chalk/fonts'))
})

gulp.task('build', ['compile', 'font']) // 统一执行任务
