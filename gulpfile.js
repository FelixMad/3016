'use strict';
var  gulp         = require('gulp'),
	 gls          = require('gulp-live-server'),
	 sass         = require('gulp-sass'),
     sourcemaps   = require('gulp-sourcemaps'),
     cssbeautify  = require('gulp-cssbeautify'),
     ip           = require('ip'),
     open         = require('gulp-open'),
     $address     = ip.address(),
	 $build       = "build",
	 $source      = "source",
     $defaultPage = "index.html",
	 $src         = "source",
	 $port        = 3016;


gulp.task('sass', function(){
	return gulp.src( $source + '/scss/*.scss')
        .pipe(sourcemaps.init())
		.pipe(sass().on('error',sass.logError))
        .pipe(cssbeautify())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest($build + '/css'));    
});

gulp.task('sass:watch', function(){
	gulp.watch($source + '/scss/*.scss',['sass']);
});

gulp.task('server', function() {
	var server = gls.static($build, $port);
	server.start();
    
    var options = {
        uri: 'http://'+ $address +':' + $port,
        app: 'google chrome'
    };
    gulp.src(__filename)
        .pipe(open(options));


	gulp.watch([$build + '/css/*.css'], function (file) {
		server.notify.apply(server, [file]);
	});
});




