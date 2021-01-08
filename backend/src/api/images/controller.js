const sharp = require('sharp');
const { v4: uuid } = require('uuid');
const path = require('path');

const fields = ['id', 'src'];

async function buildSrc(src) {
  return path.join('/upload', encodeURIComponent(src));
}

const formatResponse = async (response) => ({
  id: response.id,
  src: await buildSrc(response.src),
});

module.exports = {
  async upload(database, img) {
    const saveLocation = path.join(
      process.env.UPLOAD_PATH,
      `${path.parse(img.name).name}-${uuid()}.webp`
    );
    const src = path.basename(saveLocation);

    await sharp(img.data).webp().toFile(saveLocation);

    const ids = await database.insert({ src }).into('images');

    return { id: ids[0], src: await buildSrc(src) };
  },

  async findAll(database) {
    const result = await database.select(...fields).from('images');

    return Promise.all(result.map(formatResponse));
  },

  async findOne(database, id) {
    const result = await database
      .select(...fields)
      .from('images')
      .where('id', id);

    if (result.length === 0) return;
    return formatResponse(result[0]);
  },

  buildSrc,
};
