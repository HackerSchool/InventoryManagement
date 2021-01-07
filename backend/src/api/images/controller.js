const sharp = require('sharp');
const { v4: uuid } = require('uuid');
const path = require('path');

module.exports = {
  async upload(database, img) {
    const saveLocation = path.join(
      process.env.ROOT_PATH,
      'static',
      `${path.parse(img.name).name}-${uuid()}.webp`
    );

    await sharp(img.data).webp().toFile(saveLocation);

    return path.basename(saveLocation);
  },
};
