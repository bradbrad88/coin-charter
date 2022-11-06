const sharp = require("sharp");
const IMG_SIZE = 300;

const resizeImage = async (image, crop) => {
  // Get height and width metadata
  const { height, width } = await sharp(image.buffer).metadata();

  // Crop values are initially percentages. Use the metadata to get absolute values to use in sharp.extract
  const cropAbsolute = {
    left: parseInt((crop["x"] * width) / 100),
    top: parseInt((crop.y * height) / 100),
    width: parseInt((crop.width * width) / 100),
    height: parseInt((crop.height * height) / 100),
  };

  // Crop the image
  let croppedImage = await sharp(image.buffer).extract(cropAbsolute).toBuffer();

  // Check size of image after cropping - if still too large, resize
  if (cropAbsolute.width > IMG_SIZE || cropAbsolute.height > IMG_SIZE)
    croppedImage = await sharp(croppedImage)
      .resize(IMG_SIZE, IMG_SIZE, { fit: "cover" })
      .png()
      .toBuffer();
  return croppedImage;
};

module.exports = resizeImage;
