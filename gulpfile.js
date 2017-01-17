var gulp = require('gulp')
var babel = require('gulp-babel')
var runSeq = require('run-sequence')
var notify = require('gulp-notify')
var livereload = require('gulp-livereload')
var plumber = require('gulp-plumber')
var eslint = require('gulp-eslint')
var sourcemaps = require('gulp-sourcemaps')
var concat = require('gulp-concat')
var browserify = require('browserify')
var source = require('vinyl-source-stream')

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


// Clean task
// gulp.task('clean', function() {
// 	gulp.src('./dist/views', { read: false }) // much faster
// 		.pipe(rimraf({force: true}));
// })

// Browserify task
// gulp.task('browserify', function() {
// 	// Single point of entry (make sure not to src ALL your files, browserify will figure it out)
// 	gulp.src(['./browser/js/app.js'])
// 		.pipe(browserify({
// 			insertGlobals: true,
// 			debug: false
// 		}))
// 	// Bundle to a single file
// 		.pipe(concat('bundle.js'))
// 	// Output it to our dist folder
// 		.pipe(gulp.dest('dist/js'));
// });


// Browserify task
gulp.task('browserify', function() {
	var bundleStream = browserify({
		entries: ['./browser/js/app.js'],
		debug: true
	}).bundle().pipe(source('core.js'));
	return bundleStream.pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function() {
	livereload.listen()
	gulp.watch('browser/js/**', function() {
		runSeq('buildJS', 'browserify', 'reload');
	});
	gulp.watch('server/**/*.js', ['lintJS']);
	gulp.watch(['./public/index.html'], ['reload']);
})

gulp.task('default', ['build', 'browserify', 'watch'], function() {})
