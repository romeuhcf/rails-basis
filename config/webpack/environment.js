const { environment } = require('@rails/webpacker')
const { VueLoaderPlugin } = require('vue-loader')
const vue =  require('./loaders/vue')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const { resolve } = require('path')

environment.plugins.append('html',
new HtmlWebpackPlugin({
  inject: 'body',
  alwaysWriteToDisk: true,
  filename: '../index.html',
  template: resolve('public', '_index.html')
}))

environment.plugins.append('hardisk', new HtmlWebpackHarddiskPlugin())

environment.plugins.append('VueLoaderPlugin', new VueLoaderPlugin())
environment.loaders.append('vue', vue)
module.exports = environment
