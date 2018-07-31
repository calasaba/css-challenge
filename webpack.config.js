/*
* @Author: calasaba
* @Date:   2018-07-03 09:22:38
* @Last Modified by:   calasaba
* @Last Modified time: 2018-07-31 22:00:21
*/
const path                     = require('path');
const HtmlWebpackPlugin        = require('html-webpack-plugin');
const MiniCssExtractPlugin     = require("mini-css-extract-plugin");
//const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin       = require('clean-webpack-plugin');
const config = {
    mode      : 'development',
    entry     : {
        one : './src/one/index.js',
        two : './src/two/index.js',
    },
    output    : {
        path       : path.resolve(__dirname,'dist'),
        //path : './dist',
        filename   : "js/[name].js",
        publicPath : '/'
    },
    module    : {
        rules : [
            {
                test : /\.css$/,
                //use  : ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
                use  : [
                    {
                        loader : MiniCssExtractPlugin.loader,
                    },'css-loader'
                ],
                include : path.join(__dirname,'./src'),
                exclude : /node_modules/
            },
            //图片或字体在css文件或者js文件中引用,大于limit的图片用file-loader,小于limit的用url-loader
            {
                test   : /\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)$/,
                loader : {
                    loader  : 'url-loader',
                    options : {
                        limit      : 5 * 1024,
                        outputPath : 'images/' //指定打包后的图片位置
                    }
                },
                include : path.join(__dirname,'./src'),
                exclude : /node_modules/
            },
            //图片在html文档中被引用
            {
                test : /\.(html|html)$/,
                use  : 'html-withimg-loader',
                include : path.join(__dirname,'./src'),
                exclude : /node_modules/

            },
            {
                test : /\.jsx$/,
                use  : {
                    loader  : 'babel-loader',
                    options : {
                        presets : ["env", "stage-0"]
                    }
                },
                include : path.join(__dirname,'./src'),
                exclude : /node_modules/
            }
        ],
    },
    plugins   : [
        new HtmlWebpackPlugin({
            template : './src/one/index.html',
            filename : 'view/one.html',
            chunks   : ['one'],
            hash     : true,
            title    : 'one-css-challenge',
            minify   : {
                removeAttributeQuotes : true
            }
        }),
        new HtmlWebpackPlugin({
            template : './src/two/index.html',
            filename : 'view/two.html',
            chunks   : ['two'],
            hash     : true,
            title    : 'two-css-challenge',
            minify   : {
                removeAttributeQuotes : true
            }
        }),
        new MiniCssExtractPlugin({
            filename      : "css/[name].css",
            chunkFilename : "[id].css"
        }),
        //new CleanWebpackPlugin([path.join(__dirname,'dist')]),
        //new ExtractTextWebpackPlugin('css/[name].css'),
    ],
    devServer : {
        contentBase : path.resolve(__dirname,'dist'),
        host        : 'localhost',
        compress    : true,
        port        : 8080
    }
};

module.exports = config;