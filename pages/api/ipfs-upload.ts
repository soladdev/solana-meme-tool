// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from 'formidable';
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
  try {
    if (req.method == "POST") {
      try {
        const { files } = await parseForm(req);
        const file: any = Array.isArray(files.file) ? files.file[0] : files.file;

        // Generate a unique filename by combining UUID and original extension
        const originalFilename = file.originalFilename || 'unknown';
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

        res.status(200).json({ message: 'File uploaded successfully', filename: uniqueFilename });
      } catch (error: any) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'File upload failed' });
      }

    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
