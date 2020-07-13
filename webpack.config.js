const path = require("path");

/** @type import('webpack').Configuration */
const main = {
    target: "electron-main",
    mode: "development",
    entry: "./src/main.ts",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "build")
    },

    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    devtool: "source-map",

}

/** @type import('webpack').Configuration */
const render = {
    target: "electron-renderer",
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build")
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    devtool: "source-map",
}

module.exports = [main, render];