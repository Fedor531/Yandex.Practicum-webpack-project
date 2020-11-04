const webpack = require('webpack');

const path = require('path'); // Переменная превращает относительный путь в абсолютный

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {

  entry: { main: './src/scripts/main.js' }, // Точка входа

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },

  resolve: {
    extensions: ['.js', '.json'],// Для того чтобы при импорте не указывать тип расширения
  },

  module: {

    rules: [{ // тут описываются правила
      test: /\.js$/, // регулярное выражение, которое ищет все js файлы
      use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
      exclude: /node_modules/ // исключает папку node_modules
    },
    {
      test: /\.css$/i,
      use: [
        (isDev ? 'style-loader' : MiniCssExtractPlugin.loader), 'css-loader', 'postcss-loader'
      ]
    },
    {
      test: /\.(png|jpg|gif|ico|svg)$/,
      use: [
        'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
        {
          loader: 'image-webpack-loader',
          options: {
            esModule: false
          },
        },
      ]
    },
    {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file-loader?name=./vendor/[name].[ext]'
    }
    ],

  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      // Означает, что:
      inject: false, // стили НЕ нужно прописывать внутри тегов
      hash: true,
      template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })

  ]

};
