// file located at src/controllers/minio.ts

import { Response, Request } from "express";
import {
  uploadFile,
  uploadMultipleFiles as uploadMultipleFilesService,
  getFile as getFileService,
  getFileURL as getFileURLService,
  generatePresignedURL as generatePresignedURLService,
  generatePresignedUploadURL as generatePresignedUploadURLService,
  checkFileExists as checkFileExistsService,
  statObject as statObjectService,
  listFilesInBucket as listFilesInBucketService,
  setFileMetadata as setFileMetadataService,
  enableBucketVersioning as enableBucketVersioningService,
  disableBucketVersioning as disableBucketVersioningService,
  getBucketVersioningStatus as getBucketVersioningStatusService,
  setBucketLifecyclePolicy as setBucketLifecyclePolicyService,
  getBucketLifecyclePolicy as getBucketLifecyclePolicyService,
  setBucketNotification as setBucketNotificationService,
  getBucketNotification as getBucketNotificationService,
  copyFile as copyFileService,
  moveFile as moveFileService,
  deleteFile as deleteFileService,
  deleteMultipleFiles as deleteMultipleFilesService,
  renameFile as renameFileService,
  getFileMetadata as getFileMetadataService
} from "../services/file-handler.js";

const uploadSingleFileController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName } = req.body;
    const file = req.file;

    if (!file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    // Call the service function to upload the file
    const objectName = await uploadFile(bucketName, file);

    if (!objectName) {
      res.status(500).json({ error: "Failed to upload file" });
      return;
    }

    // Construct the file URL based on MinIO configuration
    const fileURL = `${process.env.MINIO_ENDPOINT}/${bucketName}/${objectName}`;

    res.status(200).json({
      message: "File uploaded successfully",
      fileName: objectName,
      size: file.size,
      url: fileURL
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};

const uploadMultipleFilesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      res.status(400).json({ error: "No files uploaded" });
      return;
    }

    const objectNames = await uploadMultipleFilesService(bucketName, files);

    res.status(200).json({
      message: "Files uploaded successfully",
      files: objectNames
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Failed to upload files" });
  }
};

const getFileController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, fileName } = req.params;
    const fileStream = await getFileService(bucketName, fileName);
    fileStream.pipe(res);
  } catch (error) {
    console.error("Get File Error:", error);
    res.status(500).json({ error: "Failed to retrieve file" });
  }
};

const getFileURLController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, fileName } = req.params;
    const fileURL = await getFileURLService(bucketName, fileName);
    res.status(200).json({ url: fileURL });
  } catch (error) {
    console.error("Get File URL Error:", error);
    res.status(500).json({ error: "Failed to generate file URL" });
  }
};

const generatePresignedURLController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, fileName, expiry } = req.body;
    const url = await generatePresignedURLService(bucketName, fileName, expiry);
    res.status(200).json({ url });
  } catch (error) {
    console.error("Generate Presigned URL Error:", error);
    res.status(500).json({ error: "Failed to generate presigned URL" });
  }
};

const generatePresignedUploadURLController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, fileName, expiry } = req.body;
    const url = await generatePresignedUploadURLService(bucketName, fileName, expiry);
    res.status(200).json({ url });
  } catch (error) {
    console.error("Generate Presigned Upload URL Error:", error);
    res.status(500).json({ error: "Failed to generate presigned upload URL" });
  }
};

const checkFileExistsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, fileName } = req.params;
    const exists = await checkFileExistsService(bucketName, fileName);
    res.status(200).json({ exists });
  } catch (error) {
    console.error("Check File Exists Error:", error);
    res.status(500).json({ error: "Failed to check if file exists" });
  }
};

const statObjectController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, fileName } = req.params;
    const metadata = await statObjectService(bucketName, fileName);
    res.status(200).json(metadata);
  } catch (error) {
    console.error("Stat Object Error:", error);
    res.status(500).json({ error: "Failed to retrieve file metadata" });
  }
};

const listFilesInBucketController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, prefix, recursive } = req.body;
    const files = await listFilesInBucketService(bucketName, prefix, recursive);
    res.status(200).json(files);
  } catch (error) {
    console.error("List Files Error:", error);
    res.status(500).json({ error: "Failed to list files in bucket" });
  }
};

const setFileMetadataController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, fileName, metadata, versionId } = req.body;
    await setFileMetadataService(bucketName, fileName, metadata, versionId);
    res.status(200).json({ message: "Metadata set successfully" });
  } catch (error) {
    console.error("Set Metadata Error:", error);
    res.status(500).json({ error: "Failed to set metadata" });
  }
};

const enableBucketVersioningController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName } = req.body;
    await enableBucketVersioningService(bucketName);
    res.status(200).json({ message: "Bucket versioning enabled successfully" });
  } catch (error) {
    console.error("Enable Versioning Error:", error);
    res.status(500).json({ error: "Failed to enable bucket versioning" });
  }
};

const disableBucketVersioningController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName } = req.body;
    await disableBucketVersioningService(bucketName);
    res.status(200).json({ message: "Bucket versioning disabled successfully" });
  } catch (error) {
    console.error("Disable Versioning Error:", error);
    res.status(500).json({ error: "Failed to disable bucket versioning" });
  }
};

const getBucketVersioningStatusController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName } = req.params;
    const status = await getBucketVersioningStatusService(bucketName);
    res.status(200).json({ status });
  } catch (error) {
    console.error("Get Versioning Status Error:", error);
    res.status(500).json({ error: "Failed to get bucket versioning status" });
  }
};

const setBucketLifecyclePolicyController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, rules } = req.body;
    await setBucketLifecyclePolicyService(bucketName, rules);
    res.status(200).json({ message: "Lifecycle policy set successfully" });
  } catch (error) {
    console.error("Set Lifecycle Policy Error:", error);
    res.status(500).json({ error: "Failed to set lifecycle policy" });
  }
};

const getBucketLifecyclePolicyController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName } = req.params;
    const rules = await getBucketLifecyclePolicyService(bucketName);
    res.status(200).json(rules);
  } catch (error) {
    console.error("Get Lifecycle Policy Error:", error);
    res.status(500).json({ error: "Failed to get lifecycle policy" });
  }
};

const setBucketNotificationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, events, destination } = req.body;
    await setBucketNotificationService(bucketName, events, destination);
    res.status(200).json({ message: "Notification set successfully" });
  } catch (error) {
    console.error("Set Notification Error:", error);
    res.status(500).json({ error: "Failed to set notification" });
  }
};

const getBucketNotificationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName } = req.params;
    const notificationConfig = await getBucketNotificationService(bucketName);
    res.status(200).json(notificationConfig);
  } catch (error) {
    console.error("Get Notification Error:", error);
    res.status(500).json({ error: "Failed to get notification" });
  }
};

const copyFileController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sourceBucket, sourceFileName, destinationBucket, destinationFileName } = req.body;
    await copyFileService(sourceBucket, sourceFileName, destinationBucket, destinationFileName);
    res.status(200).json({ message: "File copied successfully" });
  } catch (error) {
    console.error("Copy File Error:", error);
    res.status(500).json({ error: "Failed to copy file" });
  }
};

const moveFileController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sourceBucket, sourceFileName, destinationBucket, destinationFileName } = req.body;
    await moveFileService(sourceBucket, sourceFileName, destinationBucket, destinationFileName);
    res.status(200).json({ message: "File moved successfully" });
  } catch (error) {
    console.error("Move File Error:", error);
    res.status(500).json({ error: "Failed to move file" });
  }
};

const deleteFileController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, fileName } = req.body;
    await deleteFileService(bucketName, fileName);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Delete File Error:", error);
    res.status(500).json({ error: "Failed to delete file" });
  }
};

const deleteMultipleFilesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, fileNames } = req.body;
    await deleteMultipleFilesService(bucketName, fileNames);
    res.status(200).json({ message: "Files deleted successfully" });
  } catch (error) {
    console.error("Delete Multiple Files Error:", error);
    res.status(500).json({ error: "Failed to delete multiple files" });
  }
};

const renameFileController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, oldFileName, newFileName } = req.body;
    await renameFileService(bucketName, oldFileName, newFileName);
    res.status(200).json({ message: "File renamed successfully" });
  } catch (error) {
    console.error("Rename File Error:", error);
    res.status(500).json({ error: "Failed to rename file" });
  }
};

const getFileMetadataController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bucketName, fileName } = req.params;
    const metadata = await getFileMetadataService(bucketName, fileName);
    res.status(200).json(metadata);
  } catch (error) {
    console.error("Get File Metadata Error:", error);
    res.status(500).json({ error: "Failed to retrieve file metadata" });
  }
};

export {
  uploadSingleFileController,
  uploadMultipleFilesController,
  getFileController,
  getFileURLController,
  generatePresignedURLController,
  generatePresignedUploadURLController,
  checkFileExistsController,
  statObjectController,
  listFilesInBucketController,
  setFileMetadataController,
  enableBucketVersioningController,
  disableBucketVersioningController,
  getBucketVersioningStatusController,
  setBucketLifecyclePolicyController,
  getBucketLifecyclePolicyController,
  setBucketNotificationController,
  getBucketNotificationController,
  copyFileController,
  moveFileController,
  deleteFileController,
  deleteMultipleFilesController,
  renameFileController,
  getFileMetadataController
};