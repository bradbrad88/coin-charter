import "dotenv/config";
import {
  CreateTemplateCommand,
  DeleteTemplateCommand,
  ListTemplatesCommand,
  SESClient,
  UpdateTemplateCommand,
} from "@aws-sdk/client-ses";

import type { Template } from "./template-collater.js";

interface SES {
  TemplateName: string;
  HtmlPart?: string;
  SubjectPart?: string;
  TextPart?: string;
}

const { SES_SECRET, SES_KEY } = process.env;
if (!SES_SECRET || !SES_KEY) throw new Error("Missing AWS SES credentials");

const client = new SESClient({
  credentials: { accessKeyId: SES_KEY, secretAccessKey: SES_SECRET },
  region: "us-east-1",
});

export const createTemplates = (templates: Template[]) =>
  templates.map((template) => {
    const command = new CreateTemplateCommand({
      Template: transformTemplateToSES(template),
    });
    return client.send(command);
  });

export const updateTemplates = (templates: Template[]) =>
  templates.map((template) => {
    const command = new UpdateTemplateCommand({
      Template: transformTemplateToSES(template),
    });
    return client.send(command);
  });

export const deleteTemplates = (templates: Template[]) =>
  templates.map((template) => {
    const command = new DeleteTemplateCommand({ TemplateName: template.name });
    return client.send(command);
  });

export const getTemplates = async () => {
  const command = new ListTemplatesCommand({});
  const res = await client.send(command);
  const templates =
    res.TemplatesMetadata?.map((template) => ({
      name: template.Name as string,
      identifyer: (template.CreatedTimestamp + "") as string,
    })) || [];
  return templates;
};

const transformTemplateToSES = (template: Template): SES => {
  return {
    HtmlPart: template.html,
    SubjectPart: template.subject,
    TemplateName: template.name,
    TextPart: template.text,
  };
};
