const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: 'dist/',
  },
  plugins: [
    new CopyPlugin([
      { from: './src/css', to: './css' },
      { from: './src/fonts', to: './fonts' },
      { from: './src/img', to: './img' },
      { from: './src/index.html', to: './' },
      { from: './src/addBook.html', to: './' },
    ]),
  ],
};

module.exports = config;
