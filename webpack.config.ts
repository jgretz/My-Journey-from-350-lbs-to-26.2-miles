import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {Configuration, EnvironmentPlugin, ProvidePlugin} from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';

export default {
  mode: 'development',

  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    port: 8000,
    open: true,
  },

  entry: [
    'webpack-dev-server/client?http://localhost:8000',
    'webpack/hot/only-dev-server',
    './app/index.tsx',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'main.js',
  },

  plugins: [
    new EnvironmentPlugin({}),
    new HtmlWebpackPlugin({template: 'app/index.ejs'}),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          syntactic: true,
        },
      },
    }),
    new ReactRefreshWebpackPlugin(),
    new ProvidePlugin({
      process: 'process/browser',
    }),
  ],

  resolve: {
    modules: ['node_modules'],
    alias: {},
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: {
      util: require.resolve('util/'),
      assert: require.resolve('assert/'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(j|t)s(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'entry',
                  corejs: 3,
                  modules: false,
                },
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', {legacy: true}],
              ['@babel/plugin-proposal-class-properties', {loose: true}],
              ['@babel/plugin-proposal-private-methods', {loose: true}],
              'react-refresh/babel',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: ['asset/resource'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['asset/resource'],
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: ['asset/resource'],
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        use: ['asset/resource'],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: ['asset/resource'],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: ['asset/resource'],
      },
    ],
  },
} as Configuration;
