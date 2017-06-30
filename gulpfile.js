var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require("gulp-notify"),
	browserSync = require('browser-sync').create();

gulp.task('sass', function () {
	var onError = function(err) {
		notify.onError({
			title:    "SASS ERROR",
			message:  'Message: ' + err.message + ', line: ' + err.line + ', column: ' + err.column,
			sound:    "Beep"
		})(err);
		this.emit('end');
	}

	return gulp.src('./css/style.scss')
				.pipe(plumber({ errorHandler: onError }))
				.pipe(sourcemaps.init())
				.pipe(sass({ outputStyle: 'compressed' }))
				.pipe(autoprefixer({ browsers: ['last 2 versions'] }))
				.pipe(sourcemaps.write('./css/'))
				.pipe(gulp.dest('./css/'))
				.pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', function(){
	gulp.watch('./css/**/*.scss', ['sass'])
});

gulp.task('default', ['sass', 'browser-sync', 'watch']);