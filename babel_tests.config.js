//--require babel_tests.config.js
//"test": "mocha --config tests_config.mocharc.js --reporter=min --no-colors --require @babel/register --require @babel/polyfill --require @babel/preset-react"
module.exports = function (api) {
    api.cache(true);

    const presets = [
        '@babel/preset-env',
        "@babel/preset-typescript",
        "@babel/preset-react"
    ];
    const plugins = [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-optional-chaining"
    ];

    return {
        presets,
        plugins
    };
}