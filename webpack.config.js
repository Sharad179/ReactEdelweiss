var path  = require('path');

const webpack = require('webpack');


module.exports = {
    entry: './src/app.js',
    output:{
       filename: 'bundle.js',
       path: path.resolve(__dirname,'public'),
       publicPath: '/'
    },
    watch: true,
    module: {
        loaders:[
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            {
                test: /\.js$/,
                exclude:/node_modules/,
                loader: 'babel-loader',
                query: {
                    presets:['react', 'es2015','stage-1']
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: [
                    'file-loader','url-loader'
                ]
            }
        ]
    },
    devServer:{
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:8000'
        })
    }
}