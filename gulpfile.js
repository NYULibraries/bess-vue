// App name, used in naming the dist files
let appName = 'primo_explore_search_embed';

// Dependencies
let gulp = require('gulp');
let browserify = require('browserify');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let gutil = require('gulp-util');
let uglify = require('gulp-uglify');
let sourcemaps = require('gulp-sourcemaps');
let sass = require('gulp-sass');
let cleanCss = require('gulp-clean-css');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let watch = require('gulp-watch');
let plumber = require('gulp-plumber');

// Browserify, uglify and babelify
//    usage: gulp js
gulp.task('js', function() {
  // Set up browserify
  const browserified = browserify({
    entries: 'js/' + appName + '.js',
    debug: true
  }).transform("babelify", { presets: ["es2015"] }).bundle().on('error', handleError);

  // Start piping
  return browserified
    .pipe(plumber())
    .pipe(source(appName + '-min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
});

// Compile form SCSS and minify
//    usage: gulp sass
gulp.task('sass', function() {
  // gulp.start('materialize-fonts');
  return gulp.src(['sass/**/*.scss'])
    .pipe(plumber())
    .pipe(sass({ errLogToConsole: true }))
    .on('error', handleError)
    .pipe(cleanCss())
    .pipe(rename({ suffix: '-min' }))
    .pipe(gulp.dest('./dist'))
});

// gulp.task('materialize-fonts', function() {
//   return gulp.src(['node_modules/materialize-css/dist/fonts/**/*'])
//     .pipe(gulp.dest('./dist/fonts'));
// });

gulp.task('watch-js', () => {
  gulp.watch(['js/**/*.js'], ['js']);
});

gulp.task('watch-sass', () => {
  gulp.watch(['sass/**/*.scss'], ['sass']);
});

// Default task: build all js and css
//    usage: gulp
gulp.task('default', ['js','sass']);

// Watch all files for changes
//    usage: gulp watch
gulp.task('watch', ['default', 'watch-js','watch-sass']);

// Helper functions

function handleError(e) {
  console.log(e);
  this.emit('end');
}
