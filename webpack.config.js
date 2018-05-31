const path = require('path');
// const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',

  entry: {
    index: './index.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "lib"),
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
        options: {
          'presets': [
            ['env', { modules: false }],
            'react',
            'stage-1'
          ]
        }
      },
      { 
        test: /\.css$/, 
        use: ['style-loader','css-loader']
      }
    ]
  },

  plugins: [
    //  // 定义变量，此处定义NODE_ENV环境变量，提供给生成的模块内部使用
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    //   }
    // }),
    new CleanWebpackPlugin(['lib'])
  ]
}