const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

require("dotenv").config({
    path: ".env",
})

module.exports = {
    entry: {
        main: "./src/app.ts"
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use:[
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                        },
                    },
                    {
                        loader: "eslint-loader",
                        options: {
                            quiet: true,
                        },
                    },
                ]
            },
            {
                test: /\.css$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader'
                ]
              },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true},
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new webpack.DefinePlugin({
            "process.env.PUBLIC_MAPBOX_ACCESS_TOKEN": JSON.stringify(process.env.PUBLIC_MAPBOX_ACCESS_TOKEN),
        }),
        new MiniCssExtractPlugin({
            filename: "style.css",
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            'base': path.resolve(__dirname, "src/base"),
            'components': path.resolve(__dirname, "src/components"),
            'pages': path.resolve(__dirname, "src/pages"),
            'utils': path.resolve(__dirname, "src/utils"),
            'state': path.resolve(__dirname, "src/state"),
            'global': path.resolve(__dirname, "src/global")
        }
      },
}