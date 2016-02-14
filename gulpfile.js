'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer')

gulp.task('autoprefixer', ['sass'], function() {
	return gulp.src('www/css/main.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('www/css/'))
});

gulp.task('sass', function() {
	gulp.src('./src/sass/*.scss')
	.pipe(sass({
		outputStyle: 'compressed'
	}).on('error', sass.logError))
	.pipe(gulp.dest('./www/css'))
});

gulp.task('default', ['autoprefixer']);