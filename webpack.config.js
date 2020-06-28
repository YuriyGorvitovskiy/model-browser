module.exports = {
    mode: "development",
    target: "web",
    entry: "./src/ts/index.tsx",
    output: {
        filename: "model-browser.js",
        path: __dirname + "/build/web"
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' and '.tsx' extensions will be handled by 'ts-loader'.
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between
    // builds.
    externals: []
};
