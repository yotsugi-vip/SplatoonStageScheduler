const path = require("path");

module.exports = {
    mode: "development",
    entry: [path.resolve(__dirname, "./src/index.tsx")],
    output:{
        filename:"bundle.js",
        path:path.resolve(__dirname,"dist")
    },

    module:{
        rules:[
            {
                test:/\.(js|ts|tsx)?$/,
                use:"ts-loader",
                exclude:/node_modules/
            }
        ]
    },

    resolve:{
        extensions:[".ts",".tsx",".js",".json"]
    },

    devtool:"source-map",
    devServer:{
        contentBase:"./dist"
    }
};