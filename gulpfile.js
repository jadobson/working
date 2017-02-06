var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var svgSprite = require('gulp-svg-sprite');
var webserver = require('gulp-webserver');

gulp.task('sass', function () {
  return gulp
    .src('app/styles/main.scss')
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/styles'));
});

gulp.task('sass-watch', function() {
  gulp.watch('app/styles/**/*.scss', ['sass']);
});

gulp.task('svg-icons', function () {
  gulp.src('app/img/icons/*.svg')
    .pipe(svgSprite({
      mode: {
        symbol: {
          render: {
            css: false,
            scss: false
          },
          dest: 'sprite',
          sprite: 'icon-sprite.svg'
        }
      }
    }))
    .pipe(gulp.dest('public/img'));
});

gulp.task('webserver', function () {
  gulp.src('public')
    .pipe(webserver());
});

gulp.task('default', ['sass', 'sass-watch', 'svg-icons', 'webserver']);
