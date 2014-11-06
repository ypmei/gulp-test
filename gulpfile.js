var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var del = require('del');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');


gulp.task('clean',function(cb) {
	del(['build'],cb);
})

gulp.task('scripts',['clean'],function(){
	return gulp.src(['js/**/*.js'])
		.pipe(uglify())
		.pipe(concat('main.js'))
		.pipe(gulp.dest('build/js'));

});

gulp.task('compass',['clean'],function(){
	return gulp.src(['sass/*.scss'])
		.pipe(compass({
			css:'css',
			sass:'sass',
			sourcemap:false
		}))
		.pipe(gulp.dest('build/css'));
});

gulp.task('minifyCSS',['compass'],function(){
	return gulp.src('./build/css/*.css')
		.pipe(minifyCSS({keepBreaks:false}))
		.pipe(gulp.dest('./build/css'));
});
// gulp.task('sass',['clean'],function(){
// 	return gulp.src(['sass/*.scss'])
// 		.pipe(sass())
// 		.pipe(gulp.dest('./build/css'))
		
// })

gulp.task('images',['clean'],function(){
	return gulp.src(['img/**/*'])
		.pipe(imagemin({optimizationLevel:5}))
		.pipe(gulp.dest('build/img'));
});


gulp.task('watch',function(){
	gulp.watch(['js/**/*.js'],['scripts']);
	gulp.watch(['img/**/*'],['images']);
});


gulp.task('default',['watch','scripts','images','compass','minifyCSS']);


