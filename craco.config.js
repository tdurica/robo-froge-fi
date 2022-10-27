const webpack = require('webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    eslint: {
        enable: false,
        mode: 'extends' || 'file',
        configure: { /* https://eslint.org/docs/user-guide/configuring */ },
    },
    babel: {/* https://github.com/babel/babel-loader. */
        "plugins": [
            ["babel-plugin-macros"],
            [
                "babel-plugin-styled-components",
                {
                    "minify": false,
                    "transpileTemplateLiterals": false,
                    "pure": true,
                    "displayName": true, // generate another classname
                    "fileName": true, // generate another classname
                    "preprocess": false,
                    "meaninglessFileNames": ["index", "styles"]
                }
            ]
        ]
    },
    webpack: {
        alias: {},
        plugins: [
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
            new NodePolyfillPlugin()

        ],
        // configure: { /* Any webpack configuration options: https://webpack.js.org/configuration */ },
        // configure: (webpackConfig, { env, paths }) => { return webpackConfig; }
        configure({ resolve = {}, module: { rules, ...module }, ...config }) {
            const { fallback = {}, plugins = [] } = resolve

            return {
                ...config,
                // mode: "development", // "production" | "development" | "none"
                // devtool: "source-map",
                module: {
                    ...module,
                    // Exclude `node_modules` from `source-map-loader`.
                    rules: rules.map((rule) => {
                        if (typeof rule.loader === 'string' && /source-map-loader/.test(rule.loader)) {
                            return {
                                ...rule,
                                exclude: /@babel(?:\/|\\{1,2})runtime|node_modules/,
                            }
                        }

                        return rule
                    }),
                },
                resolve: {
                    ...resolve,
                    // Remove plugin that limits importing to `src`.
                    plugins: plugins.filter(({ constructor }) => (
                      !constructor || constructor.name !== 'ModuleScopePlugin'
                    )),
                    fallback: {
                        ...fallback,
                        stream: false,
                    },
                },
            }
        },

    },
    typescript: {
        enableTypeChecking: false
    },
};
