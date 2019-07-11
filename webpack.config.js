const path = require('path');

let indexConfig = {
    entry: './src/app.js',
    output: {
        path: __dirname,
        filename: 'index.js',
    },
}

let TrollHunterConfig = {
    entry: './src/app.js',
    output: {
        path: __dirname,
        filename: 'trollhunter.min.js',
    },
}

module.exports = [
    indexConfig,TrollHunterConfig
]