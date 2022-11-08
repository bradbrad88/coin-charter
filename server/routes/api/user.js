const router = require("express").Router({ mergeParams: true });
const multer = require("multer")().single("image");
const upload = require("../../utils/s3");
const { resizeImage, cropImage } = require("../../utils/resize-image");
const { v4: uuidv4 } = require("uuid");

router.post("/upload-image", multer, async (req, res) => {
  try {
    const { userId } = req.params;
    const crop = JSON.parse(req.body.crop);
    const croppedImage = await cropImage(req.file.buffer, crop);
    const image = await resizeImage(croppedImage);
    const key = `${userId}-profile.avif`;
    const url = await upload(image, key);
    res.json({ url });
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/chart/:symbol", multer, async (req, res) => {
  const imageSizes = [
    {
      size: "thumbnail",
      height: 1000,
      width: 1000,
    },
    {
      size: "medium",
      height: 700,
      width: 700,
    },
    {
      size: "small",
      height: undefined,
      width: undefined,
    },
  ];
  try {
    const { userId, symbol } = req.params;
    // const image = await resizeImage(req.file.buffer);
    const responseData = imageSizes.map(async (iteration) => {
      const image = await resizeImage(
        req.file.buffer,
        iteration.width,
        iteration.height,
      );
      const key = `${userId}${symbol}${uuidv4()}${iteration.size}.avif`;
      const url = await upload(image, key);
      return { url, size: iteration.size };
    });

    const responses = await Promise.all(responseData);
    const imageResponse = responses.reduce((map, response) => {
      map[response.size] = response.url;
      return map;
    }, {});

    console.log(imageResponse);
    res.json(imageResponse);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
