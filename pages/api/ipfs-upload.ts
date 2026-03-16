// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from 'formidable';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disabling Next.js's default bodyParser
  },
};

// Helper function to parse incoming form data
const parseForm = (req: NextApiRequest): Promise<{ fields: formidable.Fields, files: formidable.Files }> => {
  const form = formidable({ multiples: false });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
      try {
        const { files } = await parseForm(req);
        const file = Array.isArray(files.file) ? files.file[0] : files.file;
        if (!file || !file.filepath) {
          return res.status(400).json({ error: "No file provided" });
        }

        const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB
        if (file.size && file.size > MAX_SIZE) {
          return res.status(400).json({ error: "File size exceeds 5MB limit" });
        }
        if (file.mimetype && !ALLOWED_TYPES.includes(file.mimetype)) {
          return res.status(400).json({ error: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP" });
        }

        const originalFilename = file.originalFilename || "unknown";
        const fileExtension = path.extname(originalFilename); // Get file extension
        const uniqueFilename = `${uuidv4()}${fileExtension}`; // Create unique filename

        const uploadFolder = path.join(process.cwd(), '/public/uploads'); // Path to save files
        if (!fs.existsSync(uploadFolder)) {
          fs.mkdirSync(uploadFolder, { recursive: true }); // Ensure the folder exists
        }

        const newFilePath = path.join(uploadFolder, uniqueFilename);

        // Move the file to the upload folder with the unique name
        const data = fs.readFileSync(file.filepath);

        fs.writeFileSync(newFilePath, data);

        return res.status(200).json({ message: "File uploaded successfully", filename: uniqueFilename });
      } catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).json({ error: "File upload failed" });
      }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return res.status(500).json({ error: message });
  }
}
