// file located at src/controllers/minio.ts

import { Response, Request } from "express";
import { uploadFile as uploadFileService, uploadMultipleFiles as uploadMultipleFilesService, getFile as getFileService, deleteFile as deleteFileService } from "../services/file-handler.js";

const uploadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, objectName } = req.body;
    const file = req.file;

    if (!file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    await uploadFileService(bucketName, objectName, file.buffer.toString('base64'));
    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const uploadMultipleFiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      res.status(400).json({ error: "No files uploaded" });
      return;
    }

    await uploadMultipleFilesService(bucketName, files);
    res.status(200).json({ message: "Files uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const listFiles = async (req: Request, res: Response): Promise<void> => {
  try {
    // const { bucketName } = req.params;
    // const fileList = await listFilesService(bucketName);
    // res.status(200).json({ files: fileList });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, filename } = req.params;
    const dataStream = await getFileService(bucketName, filename);

    dataStream.pipe(res);
    dataStream.on("error", (error) => res.status(500).json({ error }));
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, filename } = req.params;
    await deleteFileService(bucketName, filename);

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { uploadFile, uploadMultipleFiles, listFiles, getFile, deleteFile };