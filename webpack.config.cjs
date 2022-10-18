const path = require("path");

module.exports = {
    entry: "./compiledTS/main.js",
    mode: "production",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "script.js"
    },
    resolveLoader: {
        modules: [
            path.join(__dirname, 'node_modules')
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules')
        ]
    },
    stats: "none"
}
