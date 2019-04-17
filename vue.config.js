let path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

var PUBLIC_PATH = '/'

if (process.env.NODE_ENV == 'production'){
  // PUBLIC_PATH = '/caradmin/'
  PUBLIC_PATH = './'    //
}

module.exports = {
  // 选项...
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  }
}