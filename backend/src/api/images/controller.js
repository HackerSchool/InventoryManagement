const sharp = require('sharp');
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
    const imageBuffer = await sharp(img.data)
      .webp()
      .resize(600, 600, { withoutEnlargement: true, fit: 'inside' })
      .toBuffer();

    const ids = await database.insert({ image: imageBuffer }).into('images');

    return ids[0];
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

  async findBuffer(database, id) {
    const result = await database.select('image').from('images').where('id', id);

    return result[0]?.image;
  },

  buildSrc,
};
