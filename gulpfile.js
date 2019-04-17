const gulp = require('gulp')
const rename = require('gulp-rename')
const pump = require('pump')


gulp.task('default', async function () {
  // 将你的默认的任务代码放在这
  // gulp.src('dist/*')
  // .pipe(gulp.dest('egg-server/app/public'));

  // gulp.src('dist/index.html')

  // .pipe(gulp.dest('egg-server/app/view'));

  await pump([
    gulp.src('dist/**/*'),
    gulp.dest('egg-server/app/public')
  ])

  await pump([
    gulp.src('dist/index.html'),
    rename({extname:'.ejs'}),
    gulp.dest('egg-server/app/view')
  ])
});

