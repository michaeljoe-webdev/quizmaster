const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   resolve: {
//     fallback: {
//       util: require.resolve('util/'),
//       stream: require.resolve('stream-browserify'),
//     },
//   },
  
// })
// vue.config.js
module.exports = defineConfig({
  // ...other webpack configurations
  transpileDependencies: true,
  target: 'web',
  configureWebpack: {
    resolve: {
      fallback: {
        "os": require.resolve("os-browserify/browser"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "url": require.resolve("url/"),
        "fs": false,
        "util": require.resolve('util/'),
        "querystring": require.resolve("querystring-es3"),
        "stream": require.resolve("stream-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "assert": require.resolve("assert/"),
        "path": require.resolve("path-browserify"),
        "net": false,
        "tls": false,
        "child_process": false,
      }
  }

  }
});