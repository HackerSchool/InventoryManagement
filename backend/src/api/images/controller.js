const sharp = require('sharp');
const { v4: uuid } = require('uuid');
const path = require('path');

module.exports = {
  async buildSrc(src) {
    return path.join('/upload', encodeURIComponent(src));
  },

  async upload(database, img) {
    const saveLocation = path.join(
      process.env.UPLOAD_PATH,
      `${path.parse(img.name).name}-${uuid()}.webp`
    );
    const src = path.basename(saveLocation);

    await sharp(img.data).webp().toFile(saveLocation);

    const ids = await database.insert({ src }).into('images');

    return { id: ids[0], src: await this.buildSrc(src) };
  },
};
