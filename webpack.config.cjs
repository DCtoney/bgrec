// This is the file that Webpack uses as its config. Webpack bundles together all of our JavaScript
// files into a single JS file that can be linked by the HTML file. 

// Import the path library. This can be done with an import statement but I've had issues in the past with
// using Webpack with ES6 module syntax. That's why this is a .cjs file and not .js.
const path = require("path");

module.exports = {
    /** The entry point. The main JavaScript file that imports others and acts as the primary script. */
    entry: "./compiledTS/main.js",

    /** The production mode. can be either "production" or "development". */
    mode: "production",

    /** 
     * Specifies how webpack handles the output. In this case it is set to output into the public folder and name the bundled file
     * script.js.
     */
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "script.js"
    },

    /** 
     * resolve and resloveLoader are some magic Node.js related properties, I don't remember entire what they do
     * but I do know I've had issues without them so I've included them just in case.
     */
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

    optimization: {
        /** 
         * Whether or not to minify the final file into unreadable (but very small and fast) garbage. 
         * If you're struggling to debug, set this to true. It will make the final product slower but for dev purposes it's nice.
         * This is already true by default but I've left it in to make everyone aware of the option.
         */
        minimize: false
    },

    /** 
     * Indicates whether or not to print debug statements in the console when building. Comment this line out if you're getting
     * weird webpack errors and need a console log.
     */
    stats: "none"
}
