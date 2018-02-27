var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // плагин минимизации

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'app': './src/main.ts'
    },
    output:{
        path: path.resolve(__dirname, './built'),
        publicPath: '/built/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules:[ //загрузчик для ts
            {
                test: /\.ts$/, // определяем тип файлов
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: path.resolve(__dirname, 'tsconfig.json') }
                    },
                   'angular2-template-loader'
               ]               
            }
        ]
    },
    plugins: [
        // позволяет управлять путями к файлам вне зависимости используем мы Windows или Linux
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            path.resolve(__dirname, 'src'), // каталог с исходными файлами
            {} // карта маршрутов
        ),
        // позволяет оптимизировать код сборок. Например, сборки импортирут одни и те же пакеты, то плагин позволяет избежать дублирования этих пакетов в сборках
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'polyfills']
        }),
        // минифицирует код сборок
        // new UglifyJSPlugin() 
  ]
}