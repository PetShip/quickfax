import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import { readFile } from "node:fs/promises";

export const config = {
  api: { bodyParser: false }   // safeguard für Vercel-Runtime
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const form = formidable({ maxFiles: 1, maxFileSize: 10 * 1024 * 1024 }); // 10 MB
  const [fields, files] = await form.parse(req);
  const file = files.file as File | undefined;

  if (!file) {
    return res.status(400).json({ error: "No file sent under field 'file'" });
  }

  // optional – Inhalt kurz prüfen
  const buffer = await readFile(file.filepath);
  return res.status(200).json({
    filename: file.originalFilename,
    size: buffer.length,
    mimetype: file.mimetype
  });
}
