/************************/
/* Gulpfile for Front-End
*************************/

var cat = require('gulp-cat');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var hbsfy = require('hbsfy');
var minify = require('gulp-minify-css');
var sass = require('gulp-sass');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var browserify = require('gulp-browserify');
var changed = require('gulp-changed');
var compass = require('gulp-compass');
var gulp = require('gulp');
var stripDebug = require('gulp-strip-debug');

/*******************/
/* Erroring Function
********************/


var displayError = function(error) {

    var errorString = '[' + util.colors.magenta(error.plugin) + ']';
    errorString += ' ' + error.message.replace("\n",'');

    if(error.fileName)
        errorString += ' in ' + util.colors.yellow(error.fileName);

    if(error.lineNumber)
        errorString += ' on line ' + util.colors.magenta(error.lineNumber);

    console.error(errorString);
}


/***********************/
/* Paths for JS and SCSS
************************/


var paths = {

	js: {
		src: ['./src/js/**/*.js','./src/js/**/*.json'],
		files: './src/js/app.js',
		dest: './distribution/js'
	},

	styles: {
		src: './src/scss/**/*.scss',
		files: './src/scss/**/**',
		dest: './distribution/css'
	},

	html: {
		templates: './src/templates/*.hbs'
	}

}


/************************/
/* Starting a local server
*************************/


gulp.task('connect', function(){

	connect.server({
		root: 'distribution',
		port: 8889,
		livereload: true,
		fallback: 'distribution/index.html'
	})

});


/*****************/
/* Assets Compiling
******************/

// Javascript

gulp.task('scripts:dev', function() {
    gulp.src(paths.js.files)
        .pipe(browserify({
			extensions: ['.hbs'],
			transform: ['hbsfy']
		}))
        .on('error', function(err){
			displayError(err);
		})
        .pipe(concat('prod.js'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(size())
		.pipe(connect.reload());
});

gulp.task('scripts:prod', function() {
    gulp.src(paths.js.files)
        .pipe(browserify({
            extensions: ['.hbs'],
            transform: ['hbsfy']
        }))
        .on('error', function(err){
            displayError(err);
        })
        .pipe(concat('prod.js'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(concat('prod.min.js'))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest));
});

// SASS

gulp.task('styles:dev', function(){
	gulp.src(paths.styles.src)
		.pipe(sass())
		.on('error', function(err){
			displayError(err);
		})
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(connect.reload());
});

gulp.task('styles:prod', function(){
    gulp.src(paths.styles.src)
        .pipe(sass({
            outputStyle: 'compressed',
            sourceComments: 'map',
        }))
        .on('error', function(err){
            displayError(err);
        })
        .pipe(prefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(minify())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(connect.reload());
});

/**************************************/
/* Production
***************************************/

gulp.task('production', ['scripts:prod', 'styles:prod'])

/**************************************/
/* Watching for changes and default task
***************************************/


gulp.task('watch', function() {

    gulp.watch(paths.styles.files, ['styles:dev']);
    gulp.watch(paths.js.src, ['scripts:dev']);
    gulp.watch(paths.html.templates, ['scripts:dev']);

});

gulp.task('default', ['scripts:dev', 'styles:dev'],function() {

    gulp.start('watch');
    gulp.start('connect');

});
