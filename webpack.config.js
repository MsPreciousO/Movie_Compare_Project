const path = require('path')
// this handles converting 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')



module.exports = {
    mode: 'development',

    entry: {
        main: path.resolve(__dirname, 'src/script.js')
    },
    output:{
       path: path.resolve(__dirname, 'dist'),
       filename: '[main].[contenthash].bundle.js',
       clean: true 
    },

    devtool: 'inline-source-map',
    devServer: {
        port: 5002,
        open: true,
        hot: true,
    },

    // loaders - images, css files (have to be run through this) 
    module: {
        rules: [
            {test:/\.css$/, use: ['style-loader',
            'css-loader']}
            ]
        },

    // plugins
    plugins: [

        new HtmlWebpackPlugin ( {
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            inject: 'body'
        }),

        new Dotenv()

    ] 

    }
    