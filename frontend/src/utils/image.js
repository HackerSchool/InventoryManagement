module.exports = {
  getImageSrc(id) {
    return (process.env.VUE_APP_IMAGE_URL || '/api/image/src/%id%').replace('%id%', id);
  },
};
