'use strict';

import gulp 		from 'gulp';
import stylus 		from 'gulp-stylus';
import sGrid		from 's-grid';
import jeet 		from 'jeet';
import koutoSwiss 	from 'kouto-swiss';
import rupture 		from 'rupture';
import browserSync 	from 'browser-sync';
import browserify 	from 'browserify';
import babelify 	from 'babelify';
import uglify 		from 'gulp-uglify';
import concat 		from 'gulp-concat';
import changed 		from 'gulp-changed';
import plumber 		from 'gulp-plumber';
import fileinclude 	from 'gulp-file-include';
import source 		from 'vinyl-source-stream';
import buffer 		from 'vinyl-buffer';
import tinypng 		from 'gulp-tinypng';

let reload = browserSync.reload;

const path = {
	js: ['dev/assets/js/**/*.js', '!dev/assets/js/**/*.min.js'],
	stylusIndex: ['dev/assets/stylus/style.styl'],
	stylus: ['dev/assets/stylus/**/*.styl'],
	css: ['dev/assets/css/**/*.css', '!dev/assets/css/**/*.min.css'],
	img: ['dev/assets/img/**/*'],
	html: ['dev/views/pages/**/*.html', '!dev/views/partials/*.html']
};

function fileInclude(){
	return gulp.src(path.html)
	.pipe(fileinclude({
		prefix: '@@',
		basepath: '@file',
		indent: true
	}))
	.pipe(gulp.dest('./dev'))
	.pipe(reload({stream:true}));
}

function cssStylus(){
	return gulp.src(path.stylusIndex)
	.pipe(plumber({
		errorHandler: err => {
			console.log([
				'Errrrooooouuu!',
				'    Erro: ' + err.name + '',
				'  plugin: ' + err.plugin + '',
				'Mensagem: ' + err.message + '',
				].join('\n'));
			this.emit('end');
		}
	}))
	.pipe(stylus({
		compress: true,
		use: [jeet(), rupture(), koutoSwiss(), sGrid()]
	}))
	.pipe(gulp.dest('dev/assets/css/'))
	.pipe(reload({stream:true}));
}


function sync(done){
	browserSync.init({
		server: {
			baseDir: "./dev"
		}
	});
	done();
}


function watchFiles(){
	gulp.watch(path.stylus, gulp.series('cssStylus'));
	gulp.watch('dev/views/**/*.html', gulp.series('fileInclude'));
	gulp.watch('dev/assets/js/scripts.js', gulp.series('javascript'));
}


function javascript(done){
	browserify('dev/assets/js/scripts.js')
	.transform(babelify)
	.bundle()
	.pipe(source('scripts.min.js'))
	.pipe(buffer())
	.pipe(uglify())
	.pipe(plumber({
		errorHandler: err => {
			console.log([
				'Errrrooooouuu!',
				'    Erro: ' + err.name + '',
				'  plugin: ' + err.plugin + '',
				'Mensagem: ' + err.message + '',
				].join('\n'));
			this.emit('end');
		}
	}))
	.pipe(gulp.dest('dev/assets/js/'))
	.pipe(browserSync.reload({ stream:true }));
	done();
}

function compactImg(){
	return gulp.src('dev/assets/img/**/*.{png, jpg}')
				.pipe(tinypng('Oinscz5ubG5wniC5WAbgXIG3ybndzutP'))
				.pipe(gulp.dest('dev/assets/img/'))
}

function buildMove(){
	return gulp.src([
		'dev/**',
		'!dev/views',
		'!dev/views/**',
		'!dev/views/**/*',
		'!dev/views/**/*.html',
		'!dev/assets/stylus',
		'!dev/assets/stylus/**/*.styl',
		'!dev/assets/js/scripts.js'
		])
	.pipe(gulp.dest('build/'));
}


const watch = gulp.parallel(javascript, cssStylus, fileInclude, sync, watchFiles);
const build = gulp.series(compactImg, buildMove);


//export tasks
exports.fileInclude = fileInclude;
exports.cssStylus 	= cssStylus;
exports.sync 		= sync;
exports.watchFiles 	= watchFiles;
exports.javascript 	= javascript;
exports.buildMove 	= buildMove;
exports.compactImg	= compactImg;
exports.build 		= build;
exports.default 	= watch;