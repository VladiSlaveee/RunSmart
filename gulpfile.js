const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
 
gulp.task('server', function() {
 
    browserSync({
        server: {
            baseDir: "dist"                                                 //поменять на src
        }
    });
 
    gulp.watch("src/*.html").on('change', browserSync.reload);
});
 
gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))                                        //поменять на src
        .pipe(browserSync.stream());
});
 
gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));  //убрать сss
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));           // настройка плагинов (переноса)
});

gulp.task('html', function() {              //перенос html кода + сжатие html кода
    return gulp.src("src/*.html")
        .pipe(htmlmin({collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('scripts', function () {           //перенос scripts кода
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));
});

gulp.task('fonts', function () {           //перенос fonts кода (её в проекте нет)
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task('icons', function () {             //перенос icons кода
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"));
});

gulp.task('mailer', function () {            //перенос mailer кода
    return gulp.src("src/mailer/**/*")
        .pipe(gulp.dest("dist/mailer"));
});

gulp.task('images', function () {            //перенос images кода + сжатие картинок
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});
 
gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'icons', 'mailer', 'html', 'images', 'fonts'));  // добавил папки