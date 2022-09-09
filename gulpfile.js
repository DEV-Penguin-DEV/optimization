import gulp from 'gulp';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import svgo from 'gulp-svgmin';
import del from 'del';
import browser from 'browser-sync';



// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Reload

const reload = (done) => {
  browser.reload();
  done();
};

// Watcher

const watcher = () => {
  gulp.watch('source/assets/css/**/*.css', gulp.series(styles, reload));
  gulp.watch('source/assets/js/**/*.js', gulp.series(scripts, reload));
  gulp.watch('source/*.html', gulp.series(html, reload));
};


// Default

export default gulp.series(
  gulp.series(
    server
  ));
