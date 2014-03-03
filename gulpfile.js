var gulp = require('gulp');
var fs = require('fs');
var path = require('path');

var jsdoc = require('gulp-jsdoc');
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');

// File paths to use for tasks.
var paths = require('./settings').paths;

// Recursive delete method to remove all files and folder from non-empty directories.
var deleteDir = function(argPath) {
  if (fs.existsSync(argPath)) {
    var fileList = fs.readdirSync(argPath);
    var filePath;

    for (var i = 0, n = fileList.length; i < n; ++i) {
      // Set the path of each file.
      filePath = path.join(argPath, fileList[i]);

      if (fs.lstatSync(filePath).isDirectory()) {
        // Recursive call.
        deleteDir(filePath);
      } else
        fs.unlinkSync(filePath);
    }

    fs.rmdirSync(argPath);
  }
};

gulp.task('test', function() {
  // Use karma to run tests and output results + coverage in html format if the module is client compatible.
  return gulp.src(paths.specs)
    .pipe(mocha());
});

gulp.task('jsdoc', function() {
  deleteDir(paths.jsdocs);

  return gulp.src([paths.scripts, 'README.md'])
    .pipe(jsdoc(paths.jsdocs));
});

gulp.task('uglify', function() {
  deleteDir(paths.bin);

  return gulp.src(paths.scripts)
    .pipe(uglify({
      outSourceMap: false
    }))
    .pipe(gulp.dest(paths.bin));
});

gulp.task('default', ['test', 'jsdoc', 'uglify']);

module.exports = gulp;
