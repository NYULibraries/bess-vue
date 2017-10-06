// App name, used in naming the dist files
let appName = 'primo_search_embed';

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

// Browserify, uglify and babelify
//    usage: gulp js
gulp.task('js', function() {
  const jsFilename = appName + '.js';
  // Set up browserify
  const browserified = browserify({
    entries: 'js/' + jsFilename,
    debug: true,
  }).transform("babelify", {presets: ["es2015"]}).bundle();

  // Start piping
  return browserified
    .pipe(source(jsFilename))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
});

// Compile form SCSS and minify
//    usage: gulp css --vid NYU
gulp.task('css', function() {
  return gulp.src(['sass/**/*.scss'])
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(concat(gutil.env.vid.toLowerCase() + '-min.css'))
    .pipe(gulp.dest('./dist'))
});
