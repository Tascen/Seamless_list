const path = require('path'), fs = require('fs')
require("@babel/register");
require("@babel/polyfill");

let assets_folder = path.resolve(__dirname, 'src');

let tests_files = []
// found files with test.js or test.ts expansions. Later create
filefromDir(assets_folder, (/(?<=.)(test.js|test.ts)([^\\]*)$/mi), function (file) {
    tests_files.push(file)
});


module.exports = {
    exit: true,
    bail: true,
    slow: 1000,
    recursive: true,
    file: tests_files
};





















function filefromDir(startPath, filter, callback) {

    if (!fs.existsSync(startPath)) {
        console.log("found`t startPath ", startPath);
        return;
    }

    let files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        let filename = path.join(startPath, files[i]);
        let stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            filefromDir(filename, filter, callback);
        }
        else if (filter.test(filename)) { callback(filename); }
    };
};