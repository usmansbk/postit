const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'js/src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'js')
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader' ],
      }
    ]
  }
};
