const path = require('path');

module.exports = {
    entry: './main.ts',
    output: {
        path: path.resolve(__dirname, '../../build/web-ui'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    mode: 'development'
}