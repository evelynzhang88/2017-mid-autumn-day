// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename'),
    sourcemaps = require("gulp-sourcemaps"),
    del = require('del'),
    babel = require("gulp-babel"),
    browserSync = require('browser-sync').create();
var tinypng = require('gulp-tinypng-compress');

//Define the app path
var path = {
    all:[
        '*.html',
        './src/assets/css/*.css',
        './src/assets/js/*.js',
        './src/assets/js/lib/*.js'
    ],
    template:['./template/*.html'],
    css:['./src/assets/css/*.css'],
    jsScenes:[
        './src/assets/js/lib/zepto.min.js',
        './src/assets/js/lib/pre-loader.js',
        './src/assets/js/lib/reqAnimate.js',
        './src/assets/js/lib/swiper.min.js',
        './src/assets/js/rem.js',
        './src/assets/js/common.js',
        //'./src/assets/js/wxshare.js',
        './src/assets/js/api.js',
        './src/assets/js/scenes.js'
    ],
    jsDiscover:[
        './src/assets/js/lib/zepto.min.js',
        './src/assets/js/rem.js',
        './src/assets/js/common.js',
        //'./src/assets/js/wxshare.js',
        './src/assets/js/discover.js'
    ],
    images:[
        './src/assets/*/*.{png,jpg,jpeg}',
        //'./src/assets/*/*.{png,jpg,jpeg}',
        //'./src/assets/*/*/*.{png,jpg,jpeg}'
    ],
};
// Browser-sync
gulp.task('browser-sync', function() {
    browserSync.init(path.all,{
        server: {
            baseDir: "./",
            startPath: ''
        }
    });
});

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['build']);
});


//css
gulp.task('css',['clean'],function () {
    // 1. 找到文件
    gulp.src(path.css)
        //.pipe(concat('style.css'))
        // 2. 压缩文件
        .pipe(minify())
        // 3. 另存为压缩文件
        .pipe(gulp.dest('./src/dist/css'));
});

// Concatenate & Minify
gulp.task('scripts_scenes',['clean'], function() {
    return gulp.src(path.jsScenes)
        .pipe(concat('all_scenes.js'))
        .pipe(gulp.dest('./src/dist'))
        .pipe(rename('all_scenes.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/dist/js'));
});
gulp.task('scripts_discover',['clean'], function() {
    return gulp.src(path.jsDiscover)
        .pipe(concat('all_discover.js'))
        .pipe(gulp.dest('./src/dist'))
        .pipe(rename('all_discover.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/dist/js'));
});
//jsDiscover

// Concatenate & Minify
gulp.task("tinypng", function(){
    gulp.src(path.images)
        .pipe(tinypng({
            key: '-ID8TBnbSlRuMCc_mMagta65Q7IDyaQ-',
            sigFile: './src/.tinypng-sigs',
            log: true
        })).on('error', function(err) {
            console.error(err.message);
        })
        .pipe(gulp.dest('./src/dist/'));
});

// Watch Files For Changes
gulp.task('watch', ['clean'],function() {
    gulp.watch(path.css,['css']);
    gulp.watch(path.jsScenes,['scripts_scenes']);
    gulp.watch(path.jsDiscover,['scripts_discover']);
});

// Default Task
gulp.task('default', ['watch', 'css','scripts_scenes','scripts_discover','browser-sync']);


