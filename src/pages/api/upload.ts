import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";

export const config = { api: { bodyParser: false } };

function parseForm(req: NextApiRequest): Promise<{ files: formidable.Files }> {
  const form = formidable({ maxFiles: 1, maxFileSize: 10 * 1024 * 1024 });
  return new Promise((resolve, reject) => {
    // richtiger Reihenfolge: (err, fields, files)
    form.parse(req, (err, _fields, files) => {
      if (err) reject(err);
      else resolve({ files });
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
  const { files } = await parseForm(req);

  // Datei ermitteln, egal ob Array oder Einzelobjekt
  const anyFile = (files.file ?? Object.values(files)[0]) as any;
  const file: File | undefined = Array.isArray(anyFile) ? anyFile[0] : anyFile;

  if (!file) return res.status(400).json({ error: "No file received" });

  return res.status(200).json({
    filename: file.originalFilename ?? file.name,
    size: file.size,
    mimetype: file.mimetype ?? file.type
  });
} catch (err) {
  console.error(err);
  return res.status(500).json({ error: "Upload failed", detail: `${err}` });
}
}
