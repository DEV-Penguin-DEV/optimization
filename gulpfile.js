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

// Styles

export const styles = () => gulp.src('source/assets/css/*.css', {
  sourcemaps: true
})
  .pipe(plumber())
  .pipe(postcss([
    autoprefixer(),
    csso()
  ]))
  .pipe(gulp.dest('build/assets/css', {
    sourcemaps: '.'
  }))
  .pipe(browser.stream());

// HTML

const html = () => gulp.src('source/*.html')
  .pipe(htmlmin({
    collapseWhitespace: true
  }))
  .pipe(gulp.dest('build'));

// Scripts

const scripts = () => gulp.src('source/assets/js/**/*.js')
  .pipe(gulp.dest('build/assets/js'))
  .pipe(browser.stream());

// PHP
const php = () => gulp.src('source/assets/php/**/*.php')
  .pipe(gulp.dest('build/assets/php'))
  .pipe(browser.stream());

// Images

const optimizeImages = () => gulp.src('source/assets/img/**/*.{png,jpg,jpeg}')
  .pipe(imagemin())
  .pipe(gulp.dest('build/assets/img'));
const copyIco = () => gulp.src('source/assets/img/**/*.{ico}')
  .pipe(gulp.dest('build/assets/img/favicons'));

const copyImages = () => gulp.src('source/assets/img/**/*.{png,jpg,jpeg,ico}')
  .pipe(gulp.dest('build/assets/img'));


// Video

const optimizeVideos = () => gulp.src('source/assets/video/**/*.{mp4}')
  .pipe(gulp.dest('build/assets/video'));

const copyVideos = () => gulp.src('source/assets/video/**/*.{mp4}')
  .pipe(gulp.dest('build/assets/video'));

// SVG

const svg = () =>
  gulp.src('source/assets/img/**/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('build/assets/img'));


// Clean

const clean = () => del('build');

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
  gulp.watch('source/assets/css/**/*.css', gulp.series(styles));
  gulp.watch('source/assets/js/**/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
};

// Build

export const build = gulp.series(
  clean,
  copyIco,
  optimizeImages,
  optimizeVideos,
  gulp.parallel(
    styles,
    html,
    php,
    scripts,
    svg
  ),
  gulp.series(
    server
  ));

// Default

export default gulp.series(
  clean,
  copyImages,
  copyVideos,
  gulp.parallel(
    styles,
    html,
    php,
    scripts,
    svg
  ),
  gulp.series(
    server,
    watcher
  ));
