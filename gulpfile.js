var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

gulp.task('test', mochaTask);
gulp.task('coverage', coverage());

gulp.task('watch-test', () => {
    gulp.watch(['test/**', 'src/**'], ['test']);
    mochaTask();
});

let coverage = (opts = {}) => {

    let coverageTask = (cb) => {
        gulp.src(['src/*.js'])
            .pipe(istanbul()) // Covering files
            .pipe(istanbul.hookRequire()) // Force `require` to return covered files
            .on('error', logMochaError)
            .on('finish', () => {
                gulp.src(['test/*.js'])
                    .pipe(mocha(opts))
                    .on('error', (err) => {
                        logMochaError(err);
                        if (cb) cb(err);
                    })
                    .pipe(istanbul.writeReports()) // Creating the reports after tests run
                    .on('end', () => {
                        if (cb) cb();
                    });
            });
    }

    return coverageTask;
}

let mochaTask = () => {
    return gulp.src(['test/*.js'], { read: false })
        .pipe(mocha({
            growl: true
        }))
        .on('error', logMochaError);
}

let logMochaError = (err) => {
    if (err && err.message) {
        gutil.log(err.message);
    } else {
        gutil.log.apply(gutil, arguments);
    }
}