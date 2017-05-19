var gulp = require('gulp');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var concatcss = require('gulp-concat-css');
var htmlmin = require('gulp-htmlmin');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');

gulp.task('sass', function() {
  gulp.src('app/scss/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('app/temp/css'))
  .pipe(concatcss('all.min.css'))
  .pipe(uglifycss())
  .pipe(gulp.dest('app/dist/css'))
  .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  gulp.src('app/js/*.js')
  .pipe(concat('all.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/dist/js'));
});

// gulp.task('htmlminify', function() {
//   return gulp.src('src/*.html')
//     .pipe(htmlmin({collapseWhitespace: true}))
//     .pipe(gulp.dest('dist'));
// });

gulp.task('browserSync', ['nodemon'], function() {
  browserSync.init(null, {
		proxy: "http://localhost:5000",
    files: ["app/**/*.*"],
    // browser: "google chrome",
    port: 7000
	});
  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/js/*.js', ['scripts']);
  // gulp.watch('app/*.html', ['htmlminify']);
});

gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('watch', ['browserSync'], function() {
  gulp.watch('app/index.html', browserSync.reload);
  gulp.watch('app/js/*.js', browserSync.reload);
  gulp.watch('views/**/*.ejs', browserSync.reload);
});
