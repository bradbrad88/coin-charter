const router = require("express").Router({ mergeParams: true });
const multer = require("multer")().single("image");
const upload = require("../../utils/s3");
const resize = require("../../utils/resize-image");
const { v4: uuidv4 } = require("uuid");

router.post("/upload-image", multer, async (req, res) => {
  try {
    const { userId } = req.params;
    const crop = JSON.parse(req.body.crop);
    const image = await resize(req.file, crop);
    const key = `${userId}-profile.png`;
    const url = await upload(image, key);
    res.json({ url });
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post("/chart/:symbol", multer, async (req, res) => {
  try {
    const { userId, symbol } = req.params;
    const image = await resize(req.file, crop);
    const key = `${userId}${symbol}${uuidv4()}`;
    const url = await upload(image, key);
    res.json({ url });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
