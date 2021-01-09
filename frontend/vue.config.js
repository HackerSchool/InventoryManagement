process.env.VUE_APP_VERSION = process.env.npm_package_version || 'unknown';

module.exports = {
  publicPath: '/',
  pwa: {
    name: 'Hackerschool Inventory',
    manifestOptions: {
      short_name: 'HS Inventory',
      background_color: '#2B2A29',
      icons: [
        {
          src: '/img/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/img/icons/icon-256x256.png',
          sizes: '256x256',
          type: 'image/png',
        },
        {
          src: '/img/icons/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png',
        },
        {
          src: '/img/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    themeColor: '#2B2A29',
    msTileColor: '#6dba83',
  },
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
