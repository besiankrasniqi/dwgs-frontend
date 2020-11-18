const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  // watch: true,
  // mode: "production",

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.ts(x)?$/,
        use: ['awesome-typescript-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|sass|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },

      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
            },
          },
        ],
      },
    ],
  },

  resolveLoader: {
    modules: ['node_modules'],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.css'],
  },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  // devtool: "source-map", //enables source maps

  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve('src') + '/index.html',
      filename: 'index.html',
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: "static",
    //   openAnalyzer: false,
    // }),
  ],
  devServer: {
    contentBase: path.resolve('../../../..'),
    compress: true,
    publicPath: '/',
    historyApiFallback: {
      index: '/index.html',
    },
  },
}
