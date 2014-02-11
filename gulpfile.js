var gulp = require('gulp');
var fs = require('fs');
var path = require('path');

var jsdoc = require('gulp-jsdoc');
var karma = require('gulp-karma');
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');

// File paths to use for tasks.
var paths = require('./settings').paths;
var compatibility = require('./settings').compatibility;

var pkg = JSON.parse(fs.readFileSync('./package.json').toString());

// Recursive delete method to remove all files and folder from non-empty directories.
var cleanDir = function (argPath) {
	var fileList = fs.readdirSync(argPath);
	var filePath;
	for (var i = 0, n = fileList.length; i < n; ++i) {
		// Set the path of each file.
		filePath = path.join(argPath, '/');
		filePath = path.join(filePath, fileList[i]);
		if (fs.statSync(filePath).isDirectory()) {
			// Recursive call.
			cleanDir(filePath);
			fs.rmdirSync(filePath);
		}
		else
			fs.unlinkSync(filePath);
	}
};

gulp.task('test', function () {
	// If the package is client compatible clear the old coverage .json files because karma-coverage creates a new one each time.
	if (compatibility.client) {
		cleanDir(paths.coverage);
	}

	// Use karma to run tests and output results + coverage in html format if the module is client compatible.
	return gulp.src(paths.specs)
		.pipe((compatibility.client)
			? karma({
			configFile: 'karma.conf.js',
			action    : 'run'
		})
			: mocha());
});

gulp.task('jsdoc', function () {
	cleanDir(paths.docs);

	return gulp.src([paths.scripts, 'README.md'])
		.pipe(jsdoc(paths.docs));
});

gulp.task('uglify', function () {
	cleanDir(paths.bin);

	return gulp.src(paths.scripts)
		.pipe(uglify({
			outSourceMap: false
		}))
		.pipe(gulp.dest(paths.bin));
});

gulp.task('default', function () {
	gulp.run('test');
	gulp.run('jsdoc');
	gulp.run('uglify');
});

module.exports = gulp;