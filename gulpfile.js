// generated on 2018-05-14 using generator-webapp 3.0.1
// 自动化前端工程

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
const runSequence = require('run-sequence');
const $ = gulpLoadPlugins();
let dev = true;


const config = {
  //第三方代码
  vendor_js: [],
  vendor_css: [],

  //压缩配置
  uglify: {
    compress: {
      drop_console: true
    },
    ie8: true,
    output: {
      keep_quoted_props: true,
      quote_style: 3
    }
  }
}


gulp.task('styles', () => {
  if (config.vendor_css.length) {
    gulp.src(config.vendor_css)
      .pipe($.concat('vendor.css'))
      .pipe($.sass.sync({
        outputStyle: 'compressed', //'expanded'
        precision: 10,
        includePaths: ['.']
      }).on('error', $.sass.logError))
      .pipe($.if(dev, gulp.dest('public/.tmp/css'), gulp.dest('public/dist/css'))) //连接第三方css
  }
  gulp.src('public/src/css/*.scss')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.sass.sync({
      outputStyle: 'compressed', //'expanded'
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
    }))
    .pipe($.if(dev, $.sourcemaps.write()))
    .pipe($.if(dev, gulp.dest('public/.tmp/css'), gulp.dest('public/dist/css')))
});


gulp.task('scripts', () => {
  return gulp.src('public/src/js/**/*.js')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.babel())
    .pipe($.if(dev, $.sourcemaps.write('.')))
    .pipe($.if(!dev, $.uglify(config.uglify)))
    .pipe($.if(dev, gulp.dest('public/.tmp/js'), gulp.dest('public/dist/scripts')))
});


gulp.task('images', () => {
  return gulp.src('public/src/images/**/*')
    // .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('public/dist/images'));
});


gulp.task('extras', () => {
  return gulp.src([
    'public/*',
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});


gulp.task('clean', del.bind(null, ['public/.tmp']));


gulp.task('vendorJs', () => {
  if (config.vendor_js.length) {
    return gulp.src(config.vendor_js)
      .pipe($.concat('vendor.js'))
      .pipe($.plumber())
      .pipe($.babel())
      .pipe($.uglify(config.uglify))
      .pipe($.if(dev, gulp.dest('public/.tmp/js'), gulp.dest('public/dist/scripts')))
  }
});


gulp.task('serve', () => {
  runSequence(['clean'], ['styles', 'scripts', 'vendorJs'], () => {
    gulp.watch('public/src/css/**/*.scss', ['styles']);
    gulp.watch('public/src/js/**/*.js', ['scripts']);
    gulp.src('public/src/images/**/*').pipe(gulp.dest('public/.tmp/images'));
  });
})


//整体打包
gulp.task('build-start', ['vendorJs', 'styles', 'scripts', 'images', 'extras'], () => {
  return gulp.src('public/**/*').pipe($.size({
    title: 'build',
    gzip: true
  }));
});
gulp.task('build', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence(['clean'], 'build-start', resolve);
  });
});


// 帮助
gulp.task('default', () => {
  console.log(`gulp build            整体打包`);
  console.log(`gulp serve            启动开发服务`);
  console.log(`gulp css              单独编译scss`);
  console.log(`gulp js               单独编译main.js`);
  console.log(`gulp vjs              单独编译vendor.js`);
  console.log(`gulp images           单独图片`);
});


// css、js 编译
gulp.task('css', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence(['styles'], resolve);
  });
});
gulp.task('js', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence(['scripts'], resolve);
  });
});
gulp.task('vjs', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence(['vendorJs'], resolve);
  });
});