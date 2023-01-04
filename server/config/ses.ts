import "dotenv/config";
import { SESClient } from "@aws-sdk/client-ses";

const { SES_KEY, SES_SECRET } = process.env;

if (!SES_KEY || !SES_SECRET)
  throw new Error("AWS SES credentials missing from environment variables");

const client = new SESClient({
  credentials: { accessKeyId: SES_KEY, secretAccessKey: SES_SECRET },
  region: "us-east-1",
});

export default client;
