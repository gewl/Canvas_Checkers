var gulp = require('gulp')
var babel = require('gulp-babel')
var runSeq = require('run-sequence')
var notify = require('gulp-notify')
var livereload = require('gulp-livereload')
var plumber = require('gulp-plumber')
var eslint = require('gulp-eslint')
var sourcemaps = require('gulp-sourcemaps')
var concat = require('gulp-concat')

gulp.task('reload', function() {
	livereload.reload();
	console.log("Reload complete.")
})

gulp.task('lintJS', function() {

	return gulp.src(['./browser/js/**/*.js'])
		.pipe(plumber({
			errorHandler: notify.onError('Linting FAILED! Check your gulp process.')
		}))
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
})

gulp.task('buildJS', ['lintJS'], function() {
    return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel({
		            presets: ['es2015']
		        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'));
});


gulp.task('build', function() {
	runSeq(['buildJS'])
})

gulp.task('default', function() {
	gulp.start('build')
	gulp.watch('browser/js/**', function() {
	        runSeq('buildJS', 'reload');
	});
	gulp.watch('server/**/*.js', ['lintJS']);
	gulp.watch(['./server/index.html'], ['reload']);

	livereload.listen()
	console.log("Build complete.")
})
