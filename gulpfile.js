const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');

// Gulp task to concatenate and minify css files
function packJs() {
    return gulp.src(['public/js/*.js'])
        .pipe(concat('bundle.js'))
        .pipe(minify({
            ext: { min: '.js' },
            noSource: true
        }))
        .pipe(gulp.dest('public/build/js'));
}

// Gulp task to concatenate and minfiy js files
function packCss() {
    return gulp.src(['public/css/*.css'])
        .pipe(concat('stylesheet.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/build/css'));
}

function watch(){
    gulp.watch('public/css/*.css', gulp.series(packCss));
    gulp.watch('public/js/*.js', gulp.series(packJs));
}

exports.packCss = packCss;
exports.packJs = packJs;
exports.watch = watch;
exports.default = gulp.series(packCss, packJs, watch);
