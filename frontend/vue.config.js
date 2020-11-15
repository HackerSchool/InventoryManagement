module.exports = {
  publicPath: '/',
  runtimeCompiler: true,
  devServer: {
    proxy: 'http://localhost:5000/',
  },
};
