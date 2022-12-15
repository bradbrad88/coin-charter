// const { S3 } = require("aws-sdk");
import pkg from "aws-sdk";
const { S3 } = pkg;
const { AWS_KEY, AWS_SECRET, AWS_BUCKET, AWS_REGION } = process.env;

const s3 = new S3({
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_SECRET,
  region: AWS_REGION,
});

const upload = async (image, key) => {
  const params = {
    Body: image,
    Bucket: AWS_BUCKET,
    Key: key,
    ACL: "public-read",
  };
  const res = await s3.upload(params).promise();
  return res.Location;
};

export default upload;
