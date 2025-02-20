// file located at src/controllers/minio.ts

import { Response, Request } from "express";
import minioClient from "../config/minio.js";
import { Readable } from "stream";

const uploadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, objectName } = req.body;
    const file = req.file;

    if (!file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const stream = Readable.from(file.buffer);
    await minioClient.putObject(bucketName, objectName, stream, file.size);

    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const listFiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName } = req.params;

    const objects = await minioClient.listObjects(bucketName, '', true);

    const fileList: Array<{ name: string; size: number; lastModified: Date; }> = [];

    // Collecting file details
    objects.on('data', (obj) => {
      fileList.push({
        name: obj.name || '',
        size: obj.size || 0,
        lastModified: obj.lastModified || new Date(0),
      });
    });

    objects.on('end', () => {
      res.status(200).json({ files: fileList });
    });

    objects.on('error', (error) => {
      res.status(500).json({ error: error.message });
    });

  } catch (error) {
    res.status(500).json({ error });
  }
};


const getFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, filename } = req.params;
    const dataStream = await minioClient.getObject(bucketName, filename);

    dataStream.pipe(res);
    dataStream.on("error", (error) => res.status(500).json({ error }));
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, filename } = req.params;
    await minioClient.removeObject(bucketName, filename);

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const helloWorld = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { uploadFile, listFiles, getFile, deleteFile, helloWorld };