var gulp = require('gulp'),
		uglify = require('gulp-uglify'),
		jshint = require('gulp-jshint'),
		browserSync = require('browser-sync'),
		reload = browserSync.reload,
		concat = require('gulp-concat'),
		mincss = require('gulp-minify-css'),
		sass = require('gulp-sass'),
		plumber = require('gulp-plumber'),
		notify = require('gulp-notify'),
		autoprefixer = require('gulp-autoprefixer');

gulp.task('scripts', function(){
	return gulp.src('js/main.js')
		.pipe(plumber({
			errorHandler: notify.onError('Oh fuck: <%= error.message %>')
		}))
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'))
		.pipe(reload({stream: true}));
});

gulp.task('styles', function(){
	return gulp.src('styles/styles.scss')
	.pipe(plumber({
		errorHandler: notify.onError('Oh fuck: <%= error.message %>')
	}))
	.pipe(sass())
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
	.pipe(mincss())
	.pipe(gulp.dest('styles/'))
	.pipe(reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: { baseDir: "./" }
	});
});

gulp.task('watch', function() {
	gulp.watch('**/*.html', reload);
	gulp.watch('js/**/*.js', ['scripts']);
	gulp.watch('styles/**/*.scss', ['styles']);
});

gulp.task('default', ['browser-sync','watch']);

