import { Router } from "express";
import multer from "multer";
import upload from "../../utils/s3.js";

const router = Router({ mergeParams: true });
const imageParser = multer().single("image");

// const { resizeImage, cropImage } = require("../../utils/resize-image");
import { resizeImage, cropImage } from "../../utils/resize-image.js";
// const { v4: uuidv4 } = require("uuid");
import { v4 as uuidv4 } from "uuid";

router.post("/upload-image", imageParser, async (req, res) => {
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

router.post("/chart/:symbol", imageParser, async (req, res) => {
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

export default router;
