const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]'
  },
};

module.exports = {
  mode: 'development',
  cache: false,
  entry:'./src/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: { presets: [ 'env', 'stage-0', 'react'] },
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          cssLoader,
        ],
      }, {
        test: /\.styl$/,
        use: [
          'style-loader',
          cssLoader,
          'stylus-loader',
        ],
      },
    ],
  },
};
