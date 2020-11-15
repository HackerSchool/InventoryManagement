module.exports = {
  publicPath: '/',
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:5000/',
        pathRewrite: { '^/api': '/' },
      },
    },
  },
};
