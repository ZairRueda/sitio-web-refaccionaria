const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const imagemin  = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
// const concat = require('gulp-concat');



const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    
}

function css() {
  return src(paths.scss)
      .pipe(sass({
          outputStyle: 'expanded'
      }))
      .pipe(dest('./build/css'))
}

// function javascript() {
//     return src(paths.js)
//         .pipe(sourcemaps.init())
//         .pipe( concat('bundle.js') )
//         .pipe( terser() )
//         .pipe(sourcemaps.write('.'))
//         .pipe( rename({ suffix: '.min' }))
//         .pipe( dest('./build/js') )
// }

function imagenes() {
    return src(paths.imagenes)
        .pipe( imagemin() )
        .pipe( dest( './build/img' ))
        .pipe( notify({ message: 'Imagen Minificada'}) );
}

function versionWebp() {
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe( dest('./build/img'))
        .pipe( notify({message: 'Versión webP lista'}));
}

function watchArchivos() {
    watch( paths.scss, css ); // * = La carpeta actual - ** = Todos los archivos con esa extensión
    // watch(paths.js, javascript);
}

// function imagenEspecifica() {
//     return src('src/img/whatsapp-logo.png')
//     .pipe( webp() )
//     .pipe( dest('./build/img'))
//     .pipe( notify({message: 'Versión webP lista'}));
// }

// exports.imagenEspecifica = imagenEspecifica;

exports.css = css;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;
exports.versionWebp = versionWebp;

exports.default = series( css, imagenes, versionWebp, watchArchivos );