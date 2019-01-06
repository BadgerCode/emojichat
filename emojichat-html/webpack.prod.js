const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new HtmlWebpackInlineSourcePlugin()
    ],
});
