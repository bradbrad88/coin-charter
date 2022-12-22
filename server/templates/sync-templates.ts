import "dotenv/config";
import path from "path";
import fs from "fs/promises";
import url from "url";
import {
  getTemplates,
  createTemplates,
  updateTemplates,
  deleteTemplates,
} from "./ses-templater.js";
import localTemplates, { Template } from "./template-collater.js";

interface TemplateMap {
  [key: string]: string;
}

// __dirname not natively available in ESM - recreate with the following:
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// File and folder to store generated file to track changes
const generatedDir = path.join(__dirname, "./__generated__");
const generatedFile = path.join(generatedDir, "template-map.json");

try {
  // Template map is a generated file that tracks which templates have been uploaded - works like migrations
  const templateMap = await getTemplateMap();
  // Live templates are obtained at run-time from the service; eg AWS SES
  const liveTemplates = await getTemplates();

  // Create template if they're in localTemplates but not in templateMap
  const createdTemplates = localTemplates.filter((localTemplate) => {
    return !liveTemplates.some(
      (liveTemplate) => liveTemplate.name === localTemplate.name,
    );
  });
  console.log(
    `---- created templates ----\n`,
    createdTemplates.map((t) => t.name),
  );
  const createdPromises = createTemplates(createdTemplates);

  // Update template if they're in sesTemplates, templateMap as well as listedTemplates
  const updatedTemplates = localTemplates.reduce((arr, template) => {
    // Filter where local template exists in map but has a different hash
    const hash = templateMap[template.name];
    if (hash && template.hash !== hash) {
      arr.push(template);
    }
    return arr;
  }, [] as Template[]);
  console.log(
    `---- updated templates ----\n`,
    updatedTemplates.map((t) => t.name),
  );
  const updatedPromises = updateTemplates(updatedTemplates);

  // Delete template if in listedTemplates but not in sesTemplates
  const deletedTemplates = liveTemplates.filter(
    (liveTemplate) =>
      !localTemplates.some(
        (localTemplate) => localTemplate.name === liveTemplate.name,
      ),
  );
  console.log(
    `---- deleted templates ----\n`,
    deletedTemplates.map((t) => t.name),
  );
  const deletedPromises = deleteTemplates(deletedTemplates);

  await Promise.all([
    ...createdPromises,
    ...updatedPromises,
    ...deletedPromises,
  ]);

  const updatedList = await getTemplates();
  const newMap = updatedList.reduce((map, template) => {
    const localTemplate = localTemplates.find(
      (localTemplate) => localTemplate.name === template.name,
    );
    if (!localTemplate) return map;
    map[localTemplate.name] = localTemplate.hash!;
    return map;
  }, {} as TemplateMap);
  createTemplateMap(newMap);
} catch (error) {
  throw new Error(
    "An error occurred while trying to retrieve current email templates",
    { cause: error },
  );
}

async function createTemplateMap(templateMap: TemplateMap) {
  try {
    const data = JSON.stringify(templateMap);
    await fs.mkdir(generatedDir, { recursive: true });
    await fs.writeFile(generatedFile, data, { encoding: "utf-8", flag: "w" });
  } catch (error) {
    console.log(error);
  }
}

async function getTemplateMap() {
  try {
    const templateMap = await fs.readFile(generatedFile, { encoding: "utf-8" });
    return JSON.parse(templateMap) as TemplateMap;
  } catch (error) {
    return {} as TemplateMap;
  }
}
