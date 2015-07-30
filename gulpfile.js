// @author Kelsay

// IMPORTS
//=========
// This section imports all needed libraries

// Require gulp itself
var gulp = require('gulp');

// Use Gulp-Load-Plugins to lazy load all plugins into $ object
// The change in the default pattern is needed to allow gulp-load-plugins to identify main-bower-files as gulp plugin
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files', 'streamqueue']
});


// CONFIG
//========

var config = {

    // Build targets
    targets: {
        'dir': 'build',
        'js': 'main.js',
        'css': 'main.css',
        'templates': 'build/templates',
        'images': 'build/images'
    },

    // Build source files / watch paths
    sources: {
        'scripts': 'app/components/**/*.js',
        'styles': 'app/styles/**/*.scss',
        'images': 'app/images/**/*.{jpg,png}',
        'templates': 'app/components/**/*.html'
    },

    // SCSS files - order
    styles: [
        "app/styles/layout/*.scss",
        "app/styles/modules/*.scss"
    ],

    // JS Files - order
    scripts: [
        "app/components/app.js",
        "app/components/**/*.js"
    ]

};

// TASKS
//=======

// BOWER task
// Imports all bower components into one minified file

gulp.task('bower', function () {
    return gulp.src($.mainBowerFiles())
        .pipe($.concat(config.targets.js))
        .pipe($.uglify())
        .pipe(gulp.dest(config.targets.dir));
});


// SCRIPTS task
// Imports all bower components and (ordered) custom files into one minified file

gulp.task('scripts', function () {

    var bower = gulp.src($.mainBowerFiles());
    var custom = gulp.src(config.sources.scripts)
        .pipe($.order(config.scripts));

    return $.streamqueue({ objectMode: true }, bower, custom)
        .pipe($.print())
        .pipe($.uglify())
        .pipe($.concat(config.targets.js))
        .pipe(gulp.dest(config.targets.dir))
        .pipe($.livereload())

});

// STYLES task
// Imports all (ordered) sass stylesheets into one minified file

gulp.task('styles', function () {
    return gulp.src(config.sources.styles)
        .pipe($.order(config.scripts))
        .pipe($.concat(config.targets.css))
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe($.minifyCss())
        .pipe(gulp.dest(config.targets.dir))
        .pipe($.livereload())
});


// TEMPLATES task
// Copy all the templates to the build folder

gulp.task("templates", function () {
    return gulp.src(config.sources.templates)
        .pipe($.compressor())
        .pipe($.flatten())
        .pipe(gulp.dest(config.targets.templates))
        .pipe($.livereload())
});

// IMAGES task
// Copy all the images to the build folder

gulp.task("images", function () {
    return gulp.src(config.sources.images)
        .pipe($.flatten())
        .pipe(gulp.dest(config.targets.images))
        .pipe($.livereload())
});


// WATCH task
// Watches files for changes and trigger livereload

gulp.task('watch', function () {
    $.livereload.listen();
    gulp.watch(config.sources.styles, ['styles']);
    gulp.watch(config.sources.scripts, ['scripts']);
    gulp.watch(config.sources.templates, ['templates']);
    gulp.watch(config.sources.images, ['images']);
});

// BUILD task
// A wrapper that executes all sub-tasks

gulp.task('build', ['scripts', 'styles', 'templates', 'images']);

// DEFAULT task
gulp.task('default', ['build', 'watch']);