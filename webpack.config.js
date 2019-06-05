var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './bin'),
        filename: 'app.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: [/node_module/, /coverag/],
            loader: "babel-loader"
        }]
    },
    resolve: {
        extensions: [' ', '.js']
    }
    
}