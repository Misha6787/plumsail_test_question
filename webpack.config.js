const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
    transpileDependencies: true,
    css: { extract: false },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
})
