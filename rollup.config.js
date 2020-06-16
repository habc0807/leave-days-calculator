var buble = require('rollup-plugin-buble');
var terser = require('rollup-plugin-terser').terser;

module.exports = {
    input: 'index.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
    },
    plugins: [
        buble(),
        terser(),
    ]
}