const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // JavaScript 执行入口文件
    entry: './src/main.js',
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: 'bundle.js',
        // 输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use : ['style-loader','css-loader?minimize'], 
                // use: [
                //     'style-loader',
                //     {
                //         loader: 'css-loader',
                //         options: {
                //             minimize: true,
                //         }
                //     }
                // ]
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        // you can specify a publicPath here
                        // by default it use publicPath in webpackOptions.output
                        publicPath: './'
                      }
                    },
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 从.js提取出来的 .css文件的名称
            filename: "[name].css"
        }),
        new HtmlWebpackPlugin({template: 'index.html'})
    ]
};