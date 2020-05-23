const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const image = require('gulp-image');
let uglify = require('gulp-uglify-es').default;
let rename = require("gulp-rename");
sass.compiler = require('node-sass');

sassTocss = function(){
  return src('./src/sass/style.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(dest('dist/public/stylesheets/'))
}

minifyCss = function(){
  return src('public/stylesheets/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(dest('dist/public/stylesheets/'));
}

minimizeImage = function () {
  return src('./public/images/*')
    .pipe(image())
    .pipe(dest('dist/public/images/'));
};

exports.uglify = function(){
  return src('./public/javascripts/transfer.js')
  .pipe(rename("transfer.min.js"))
  .pipe(uglify())
  .pipe(dest('dist/public/javascripts/'));
}

exports.default = function(){
  watch('./src/sass/**/*.scss', sassTocss);
  watch('./public/stylesheets/*.css', minifyCss);
  watch('./public/images/*', minimizeImage);
};