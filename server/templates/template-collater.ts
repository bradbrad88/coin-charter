import fs from "fs/promises";
import path from "path";
import url from "url";
import crypto from "crypto";

export interface Template {
  name: string;
  html?: string;
  subject?: string;
  text?: string;
  hash?: string;
}

const TEMPLATE_DIRECTORY = "./email-templates";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const directory = path.join(__dirname, TEMPLATE_DIRECTORY);

const dir = await fs.readdir(directory);

const regex = /.json$/i;

const unsupportedFile = dir.find((fileName) => {
  const test = regex.test(fileName);
  if (!test) return fileName;
  return false;
});

if (unsupportedFile)
  throw new Error(
    `Unsupported file type in ${TEMPLATE_DIRECTORY}: ${unsupportedFile}\nPlease use .json files only`,
  );

const templates = dir.map(async (fileName) => {
  try {
    const file = path.join(directory, fileName);
    const json = await fs.readFile(file, { encoding: "utf-8" });
    const parsedJson = JSON.parse(json);
    const name = fileName.split(".")[0];
    const hash = crypto.createHash("md5").update(json).digest("hex");
    if ("subject" in parsedJson) return { ...parsedJson, name, hash };
  } catch (error) {
    throw new Error(`Error occured when parsing ${fileName}`, { cause: error });
  }
});

export default (await Promise.all(templates)) as Template[];
