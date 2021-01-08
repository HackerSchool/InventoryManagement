const sharp = require('sharp');
const { v4: uuid } = require('uuid');
const path = require('path');

module.exports = {
  async upload(database, img) {
    const saveLocation = path.join(
      process.env.UPLOAD_PATH,
      `${path.parse(img.name).name}-${uuid()}.webp`
    );

    await sharp(img.data).webp().toFile(saveLocation);

    return path.basename(saveLocation);
  },

  buildSrc(src) {
    return path.join('/upload', src);
  },
};
