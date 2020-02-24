let gulp = require('gulp'),
    /* тут мы создаем разные переменные и присуждаем им свойства разных плагинов, чтобы потом использовать эти короткие переменные */
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin');

gulp.task('sass', function() {
    return gulp.src('app/scss/style.scss') /* задаем путь к основному файлу */
        .pipe(sass({ outputStyle: 'compressed' })) /* задаем тип файла на выходе(сжатый) */
        .pipe(rename({ suffix: '.min' })) /* этот плагин для переименования файла, добавляем суффикс .min */
        .pipe(autoprefixer({ /* для того, чтобы была поддержка старых версий и все отображалось корректно, ибо на старых версиях display и некоторые другие свойства имеют другие названия */
            overrideBrowserslist: ['last 8 versions']
        }))
        .pipe(gulp.dest('app/css')) /* задаем конечный путь для создания нового файла css */
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('style', function() {
    return gulp.src([
            'node_modules/normalize.css/normalize.css',
            'node_modules/slick-carousel/slick/slick.css',
            'node_modules/magnific-popup/dist/magnific-popup.css'
        ])
        .pipe(concat('libs.min.css')) /* вверху указали путь к двум файлам, а с помощью pipe объединили их в один и сразу же прописали название */
        .pipe(cssmin())
        .pipe(gulp.dest('app/css'))
});

gulp.task('script', function() {
    return gulp.src([
            'node_modules/slick-carousel/slick/slick.js',
            'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
        ])
        .pipe(concat('libs.min.js')) /* вверху указали путь к двум файлам, а с помощью pipe объединили их в один и сразу же прописали название */
        .pipe(uglify()) /* минифицируем */
        .pipe(gulp.dest('app/js'))
});


gulp.task('html', function() { /* часть функции для обновления веб-страницы после изменений в файле */
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function() { /* часть функции для обновления веб-страницы после изменений в файле */
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function() { /* функция для того, чтобы страница в браузера обновлялась автоматически после каких-либо изменений  */
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('watch', function() { /* функция для того, чтобы файл css обновлялся автоматически, если мы что-то поменяли в scss */
    gulp.watch('app/scss/style.scss', gulp.parallel('sass')) /* watch то есть смотрит за файлом, к которому мы указали путь и дальше обновляет наш файл css (parallel('sass')) */
    gulp.watch('app/*.html', gulp.parallel('html')) /* следит за файлом html и обновляет страницу, если там обновление */
    gulp.watch('app/js/*.js', gulp.parallel('js')) /* следит за файлом js и обновляет страницу, если там обновление  */
});

gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync')) /* каждый из gulp watch и browser sync занимают полностью консоль, что делает невозможным работу с ней в случае необходимости по этому мы задаем такой таск и пишем несколько тасков, которые будут запускаться по дефолту при вызове галпа */