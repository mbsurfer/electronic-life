'use strict';

var gulp		= require('gulp'),
    less		= require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss	= require('gulp-minify-css'),
    sourcemaps	= require('gulp-sourcemaps'),
    jshint		= require('gulp-jshint'),
    uglify		= require('gulp-uglify'),
    imagemin	= require('gulp-imagemin'),
    pngquant	= require('imagemin-pngquant'),
    rename		= require('gulp-rename'),
    concat		= require('gulp-concat'),
    notify		= require('gulp-notify'),
    cache		= require('gulp-cache'),
    inject		= require('gulp-inject'),
    debug		= require('gulp-debug'),
    del			= require('del'),
    replace		= require('gulp-replace'),

//TypeScript
    ts			= require('gulp-typescript'),
    tslint		= require('gulp-tslint'),

//server monitoring
    connect		= require('gulp-connect'),
    watch		= require('gulp-watch'),

//config
    Config = require('./gulpfile.config.js');

var config = new Config();

/**
 * Create and minify .css from .lss
 */
gulp.task('css', ['app-css'], function() {
    return gulp.src([
        'src/assets/less/styles.less',
        'src/components/bootstrap/less/bootstrap.less'
    ])

        //create .css files
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/assets/css'))

        //create .min.css files
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.init())
        .pipe(minifycss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/assets/css'))

        //notify completion
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('app-css', function() {
    return gulp.src([
        'src/app/**/*.less'
    ])
        .pipe(less())
        .pipe(concat('app.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/assets/css'))
});

/**
 * Simply copy fonts to dist dir
 */
gulp.task('fonts', function() {
    return gulp.src([
        'src/assets/css/fonts/**/*'
    ])
        .pipe(gulp.dest('dist/assets/css/fonts'))
        .pipe(notify({ message: 'Fonts task complete' }));
});


/**
 * SET API_ENPOINT value from environmental variable
 */
gulp.task('set-api-endpoint', function() {

    var endpoint =  process.env.WP_API_ENDPOINT;

    if (endpoint === undefined) {
        endpoint = 'http://209.61.160.204/';
    }

    gulp.src(['templates/constants.ts'])
        .pipe(replace('WP_API_ENDPOINT', endpoint))
        .pipe(gulp.dest(config.sourceApp))
        .pipe(notify("USING API_ENDPOINT: " + endpoint))
});


/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('gen-ts-refs', function () {
    var target = gulp.src(config.appTypeScriptReferences);
    var sources = gulp.src(config.allTypeScript, {read: false});

    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="..' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.typings));
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript).pipe(tslint()).pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', ['clean-ts'], function () {
    var sourceTsFiles = [
        config.allTypeScript,                       //path to typescript files
        config.libraryTypeScriptDefinitions,        //reference to library .d.ts files
        config.appTypeScriptReferences              //reference to app.d.ts files
    ];

    //first create all the js files
    return gulp.src(sourceTsFiles)
        .pipe(ts({
            target: 'ES5',
            declarationFiles: false,
            noExternalResolve: true
        }))
        .pipe(gulp.dest(config.tsOutputPath));

});

/**
 * Create our app.js file from all TypeScript
 */
gulp.task('compile-app', ['compile-ts'], function(){

    //concat js files
    return gulp.src([
        config.tsOutputPath + '**/*.module.js',     //concat modules first
        config.tsOutputPath + '**/*.js'             //concat the rest
    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.tsOutputPath));

});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function (cb) {
    var typeScriptGenFiles = [
        config.tsOutputPath + '**/*.js',        // path to generated JS files
        //config.sourceApp +'**/*.js',      // path to all JS files auto gen'd by editor
        //config.sourceApp +'**/*.js.map'   // path to all sourcemap files auto gen'd by editor
    ];

    // delete the files
    return del(typeScriptGenFiles, cb);
});

/**
 * Copy JS library dependencies
 */
gulp.task('scripts', function(){

    //jquery assets
    gulp.src('src/assets/js/**/*')
        .pipe(gulp.dest('dist/assets/js'));

    //bower libraries
    gulp.src([
        config.bowerComponentsPath + 'lodash/lodash.min.js',
        config.bowerComponentsPath + 'jquery/dist/jquery.min.js',
        config.bowerComponentsPath + 'bootstrap/dist/js/bootstrap.min.js',
        config.bowerComponentsPath + 'angular/angular.min.js',
        config.bowerComponentsPath + 'angular-bootstrap/ui-bootstrap.min.js',
        config.bowerComponentsPath + 'angular-bootstrap/ui-bootstrap-tpls.min.js',
        config.bowerComponentsPath + 'angular-ui-router/release/angular-ui-router.min.js',
        config.bowerComponentsPath + 'restangular/dist/restangular.min.js',
        config.bowerComponentsPath + 'a0-angular-storage/dist/angular-storage.min.js',
        config.bowerComponentsPath + 'oclazyload/dist/ocLazyLoad.min.js',
        config.bowerComponentsPath + 'angular-ui-sortable/sortable.min.js',
        config.bowerComponentsPath + 'd3/d3.min.js',
        config.bowerLibsPath + '*.js'
    ])
        .pipe(concat('bower_components.js'))
        .pipe(gulp.dest('dist'));

});

/**
 * Copy HTML template files using the same directory structure
 */
gulp.task('html', function(){
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'));


    gulp.src('./src/app/**/*.html')
        .pipe(gulp.dest('dist/app/'))
        .pipe(connect.reload())
        .pipe(notify({ message: 'HTML task complete' }));;
});

/**
 * Compress images
 */
gulp.task('images', function() {
    return gulp.src('src/assets/images/**/*')
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/assets/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('mock-data', function() {
    return gulp.src('src/mockData/**/*.json')
        .pipe(gulp.dest('dist/mockData/'));
});


/**
 * Empty dist dir
 */
gulp.task('clean', function(cb) {
    del(['dist/*'], cb)
});

/**
 * Default build when gulp is run
 */
gulp.task('default', ['clean'], function() {
    gulp.start('html', 'css', 'fonts', 'scripts', 'images', 'set-api-endpoint', 'gen-ts-refs', 'ts-lint', 'compile-app', 'mock-data');
});

/**
 * List file watchers and their associated actions
 */
gulp.task('watch', function() {
    gulp.watch('src/index.html', ['html']);
    gulp.watch('src/app/**/*.html', ['html']);
    gulp.watch('src/**/*.less', ['css']);
    gulp.watch('src/assets/images/*', ['images']);
    gulp.watch('src/app/**/*.ts', ['gen-ts-refs', 'ts-lint', 'compile-app']);
    gulp.watch('src/mockData/**/*.json', ['mock-data']);
});

/**
 * Start webserver
 */
gulp.task('webserver', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 8002
    });
});

// Dev task
gulp.task('dev', ['webserver', 'watch']);
