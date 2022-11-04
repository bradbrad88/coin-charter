const { S3 } = require("aws-sdk");
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

module.exports = upload;
