const Identicon = require('identicon.js');
const crypto = require('crypto');

/**
 * Generate a profile image URL from the specified username.
 * @param {string} name The username to generate the profile image from.
 * @param {number} size The size of the profile image to generate.
 * @return {string|null} The generated profile image URL.
 */
const generateImage = (name, size = 64) => {
  try {
    const hash = crypto.createHash('md5').update(name).digest('hex');
    const option = {
      background: [255, 255, 255, 255],
      margin: 0.2,
      size: size,
      format: 'png'
    };
    const data = new Identicon(hash, option).toString();
    return `data:image/png;base64,${data}`;
  } catch (error) {
    console.log(error);
    return '';
  }
};

module.exports = generateImage;
