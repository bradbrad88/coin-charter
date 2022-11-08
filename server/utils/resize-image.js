const sharp = require("sharp");
const IMG_SIZE = 300;

const resizeImage = async (
  imageBuffer,
  imgWidth = IMG_SIZE,
  imgHeight = IMG_SIZE,
) => {
  // Get height and width metadata
  const { height, width } = await sharp(imageBuffer).metadata();

  let resizedImage = imageBuffer;

  // Check size of image after cropping - if still too large, resize
  if (width > imgWidth || height > imgHeight)
    resizedImage = await sharp(resizedImage)
      .resize(width, height, { fit: "cover" })
      .toBuffer();

  return await sharp(resizedImage).avif().toBuffer();
};

const cropImage = async (imageBuffer, crop) => {
  // Get height and width metadata
  const { height, width } = await sharp(imageBuffer).metadata();

  // Crop values are initially percentages. Use the metadata to get absolute values to use in sharp.extract
  const cropAbsolute = {
    left: parseInt((crop["x"] * width) / 100),
    top: parseInt((crop.y * height) / 100),
    width: parseInt((crop.width * width) / 100),
    height: parseInt((crop.height * height) / 100),
  };

  // Crop the image
  return await sharp(imageBuffer).extract(cropAbsolute).toBuffer();
};

module.exports = { resizeImage, cropImage };
