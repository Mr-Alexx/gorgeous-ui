const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer') // 根据需要自动补全浏览器前缀
const min = require('gulp-min')

gulp.task('compile', () => {
  return gulp.src('../styles/theme-chalk/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(min())
    .pipe(gulp.dest('../../lib'))
})

gulp.task('font', () => {
  return gulp.src('../styles/fonts/**')
    .pipe(min())
    .pipe(gulp.dest('../../lib/fonts'))
})

gulp.task('build', ['compile', 'font']) // 统一执行任务
