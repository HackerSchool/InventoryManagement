process.env.VUE_APP_VERSION = process.env.npm_package_version || 'unknown';

module.exports = {
  publicPath: '/',
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:5000/',
        pathRewrite: { '^/api': '/' },
      },
      '^/upload': {
        target: 'http://localhost:5000/',
      },
    },
  },
};
