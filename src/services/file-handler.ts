import minioClient from "../config/minio";
import { Readable } from "stream";
import * as Minio from 'minio';

// Helper function to handle MinIO errors
const handleMinioError = (error: Error, customMessage: string) => {
  console.error(`${customMessage}:`, error);
  throw new Error(`${customMessage}: ${error.message}`);
};

// Bucket Management Functions
export const createBucket = async (bucketName: string, region?: string): Promise<void> => {
  try {
    await minioClient.makeBucket(bucketName, region || "us-east-1");
  } catch (error) {
    handleMinioError(error as Error, `Failed to create bucket ${bucketName}`);
  }
};

export const deleteBucket = async (bucketName: string): Promise<void> => {
  try {
    await minioClient.removeBucket(bucketName);
  } catch (error) {
    handleMinioError(error as Error, `Failed to delete bucket ${bucketName}`);
  }
};

export const bucketExists = async (bucketName: string): Promise<boolean> => {
  try {
    return await minioClient.bucketExists(bucketName);
  } catch (error) {
    handleMinioError(error as Error, `Failed to check if bucket ${bucketName} exists`);
    return false;
  }
};

export const listBuckets = async (): Promise<Minio.BucketItemFromList[]> => {
  try {
    return await minioClient.listBuckets();
  } catch (error) {
    handleMinioError(error as Error, "Failed to list buckets");
    return [];
  }
};

// File Upload Functions
export const uploadFile = async (
  bucketName: string,
  file: Express.Multer.File,
  customName?: string,
  metadata?: Minio.ItemBucketMetadata
): Promise<string> => {
  try {
    const objectName = customName || file.originalname;
    const stream = Readable.from(file.buffer);
    await minioClient.putObject(bucketName, objectName, stream, file.size, metadata);
    return `${bucketName}/${objectName}`;
  } catch (error) {
    handleMinioError(error as Error, `Failed to upload file ${file.originalname}`);
    return "";
  }
};

export const uploadMultipleFiles = async (
  bucketName: string,
  files: Express.Multer.File[],
  customNames?: string[],
  metadata?: Minio.ItemBucketMetadata[]
): Promise<string[]> => {
  try {
    const uploadPromises = files.map((file, index) => {
      const objectName = customNames?.[index] || file.originalname;
      const fileMetadata = metadata?.[index] || {};
      const stream = Readable.from(file.buffer);
      return minioClient.putObject(bucketName, objectName, stream, file.size, fileMetadata);
    });
    await Promise.all(uploadPromises);
    return files.map((file, index) => `${bucketName}/${customNames?.[index] || file.originalname}`);
  } catch (error) {
    handleMinioError(error as Error, "Failed to upload multiple files");
    return [];
  }
};

// File Retrieval Functions
export const getFile = async (bucketName: string, fileName: string): Promise<NodeJS.ReadableStream> => {
  try {
    return await minioClient.getObject(bucketName, fileName);
  } catch (error) {
    handleMinioError(error as Error, `Failed to retrieve file ${fileName}`);
    throw error;
  }
};

export const getFileMetadata = async (bucketName: string, fileName: string): Promise<Minio.BucketItemStat> => {
  try {
    return await minioClient.statObject(bucketName, fileName);
  } catch (error) {
    handleMinioError(error as Error, `Failed to retrieve metadata for file ${fileName}`);
    throw error;
  }
};

export const listFilesInBucket = async (
  bucketName: string,
  prefix?: string,
  recursive?: boolean
): Promise<Minio.BucketItem[]> => {
  try {
    const files: Minio.BucketItem[] = [];
    const stream = minioClient.listObjectsV2(bucketName, prefix || "", recursive || false);
    return new Promise((resolve, reject) => {
      stream.on("data", (file) => files.push(file));
      stream.on("end", () => resolve(files));
      stream.on("error", (error) => reject(error));
    });
  } catch (error) {
    handleMinioError(error as Error, `Failed to list files in bucket ${bucketName}`);
    return [];
  }
};

// File Deletion Functions
export const deleteFile = async (bucketName: string, fileName: string): Promise<void> => {
  try {
    await minioClient.removeObject(bucketName, fileName);
  } catch (error) {
    handleMinioError(error as Error, `Failed to delete file ${fileName}`);
  }
};

export const deleteMultipleFiles = async (bucketName: string, fileNames: string[]): Promise<void> => {
  try {
    await minioClient.removeObjects(bucketName, fileNames);
  } catch (error) {
    handleMinioError(error as Error, "Failed to delete multiple files");
  }
};

// Presigned URL Functions
export const generatePresignedURL = async (
  bucketName: string,
  fileName: string,
  expiry?: number
): Promise<string> => {
  try {
    return await minioClient.presignedGetObject(bucketName, fileName, expiry || 24 * 60 * 60);
  } catch (error) {
    handleMinioError(error as Error, `Failed to generate presigned URL for file ${fileName}`);
    return "";
  }
};

export const generatePresignedUploadURL = async (
  bucketName: string,
  fileName: string,
  expiry?: number
): Promise<string> => {
  try {
    return await minioClient.presignedPutObject(bucketName, fileName, expiry || 24 * 60 * 60);
  } catch (error) {
    handleMinioError(error as Error, `Failed to generate presigned upload URL for file ${fileName}`);
    return "";
  }
};

// Advanced Functions
export const setFileMetadata = async (
  bucketName: string,
  fileName: string,
  metadata: Minio.ItemBucketMetadata,
  versionId?: string
): Promise<void> => {
  try {
    // types to be fixed later
    //     Expected 4 arguments, but got 3.ts(2554)
    // client.d.ts(314, 72): An argument for 'putOpts' was not provided.
    // (method) TypedClient.setObjectTagging(bucketName: string, objectName: string, tags: Tags, putOpts: TaggingOpts): Promise<void>
    //     await minioClient.setObjectTagging(bucketName, fileName, metadata);
  } catch (error) {
    handleMinioError(error as Error, `Failed to set metadata for file ${fileName}`);
  }
};

export const renameFile = async (
  bucketName: string,
  oldFileName: string,
  newFileName: string
): Promise<void> => {
  try {
    await minioClient.copyObject(bucketName, newFileName, `${bucketName}/${oldFileName}`);
    await minioClient.removeObject(bucketName, oldFileName);
  } catch (error) {
    handleMinioError(error as Error, `Failed to rename file from ${oldFileName} to ${newFileName}`);
  }
};

// Versioning Functions
export const enableBucketVersioning = async (bucketName: string): Promise<void> => {
  try {
    await minioClient.setBucketVersioning(bucketName, { Status: "Enabled" });
  } catch (error) {
    handleMinioError(error as Error, `Failed to enable versioning for bucket ${bucketName}`);
  }
};

export const disableBucketVersioning = async (bucketName: string): Promise<void> => {
  try {
    await minioClient.setBucketVersioning(bucketName, { Status: "Suspended" });
  } catch (error) {
    handleMinioError(error as Error, `Failed to disable versioning for bucket ${bucketName}`);
  }
};

export const getBucketVersioningStatus = async (bucketName: string): Promise<string> => {
  try {
    const versioning = await minioClient.getBucketVersioning(bucketName);
    return versioning.Status || "Suspended";
  } catch (error) {
    handleMinioError(error as Error, `Failed to get versioning status for bucket ${bucketName}`);
    return "Suspended";
  }
};

// Lifecycle Management Functions
export const setBucketLifecyclePolicy = async (
  bucketName: string,
  rules: Minio.LifecycleRule[]
): Promise<void> => {
  try {
    await minioClient.setBucketLifecycle(bucketName, { Rule: rules });
  } catch (error) {
    handleMinioError(error as Error, `Failed to set lifecycle policy for bucket ${bucketName}`);
  }
};

export const getBucketLifecyclePolicy = async (bucketName: string): Promise<Minio.LifecycleRule[]> => {
  try {
    const lifecycle = await minioClient.getBucketLifecycle(bucketName);
    return lifecycle?.Rule || [];
  } catch (error) {
    handleMinioError(error as Error, `Failed to get lifecycle policy for bucket ${bucketName}`);
    return [];
  }
};

// Notification Functions
export const setBucketNotification = async (
  bucketName: string,
  events: string[],
  destination: string
): Promise<void> => {
  try {
    const notificationConfig = new Minio.NotificationConfig();
    const queueConfig = new Minio.QueueConfig(destination);
    events.forEach((event) => queueConfig.addEvent(event));
    notificationConfig.add(queueConfig);
    await minioClient.setBucketNotification(bucketName, notificationConfig);
  } catch (error) {
    handleMinioError(error as Error, `Failed to set notification for bucket ${bucketName}`);
  }
};

export const getBucketNotification = async (bucketName: string): Promise<Minio.NotificationConfig> => {
  try {
    return await minioClient.getBucketNotification(bucketName);
  } catch (error) {
    handleMinioError(error as Error, `Failed to get notification for bucket ${bucketName}`);
    throw error;
  }
};

// File Upload from Path
export const uploadFileFromPath = async (
  bucketName: string,
  filePath: string,
  objectName?: string,
  metadata?: Minio.ItemBucketMetadata
): Promise<string> => {
  try {
    const objectNameFinal = objectName || filePath.split("/").pop() || "file";
    await minioClient.fPutObject(bucketName, objectNameFinal, filePath, metadata);
    return `${bucketName}/${objectNameFinal}`;
  } catch (error) {
    handleMinioError(error as Error, `Failed to upload file from path ${filePath}`);
    return "";
  }
};


// File Retrieval Functions
export const getFileURL = async (bucketName: string, fileName: string): Promise<string> => {
  try {
    return await minioClient.presignedUrl("GET", bucketName, fileName);
  } catch (error) {
    handleMinioError(error as Error, `Failed to generate URL for file ${fileName}`);
    return "";
  }
};


// File Copy & Move Functions
export const copyFile = async (
  sourceBucket: string,
  sourceFileName: string,
  destinationBucket: string,
  destinationFileName: string
): Promise<void> => {
  try {
    await minioClient.copyObject(destinationBucket, destinationFileName, `${sourceBucket}/${sourceFileName}`);
  } catch (error) {
    handleMinioError(error as Error, `Failed to copy file from ${sourceFileName} to ${destinationFileName}`);
  }
};

export const moveFile = async (
  sourceBucket: string,
  sourceFileName: string,
  destinationBucket: string,
  destinationFileName: string
): Promise<void> => {
  try {
    await minioClient.copyObject(destinationBucket, destinationFileName, `${sourceBucket}/${sourceFileName}`);
    await minioClient.removeObject(sourceBucket, sourceFileName);
  } catch (error) {
    handleMinioError(error as Error, `Failed to move file from ${sourceFileName} to ${destinationFileName}`);
  }
};

// Utility Functions
export const checkFileExists = async (bucketName: string, fileName: string): Promise<boolean> => {
  try {
    await minioClient.statObject(bucketName, fileName);
    return true;
  } catch (error) {
    return false;
  }
};

export const statObject = async (
  bucketName: string,
  fileName: string
): Promise<Minio.BucketItemStat> => {
  try {
    return await minioClient.statObject(bucketName, fileName);
  } catch (error) {
    handleMinioError(error as Error, `Failed to stat object ${fileName}`);
    throw error;
  }
};


// Export all functions
export default {
  createBucket,
  deleteBucket,
  bucketExists,
  listBuckets,
  uploadFile,
  uploadMultipleFiles,
  getFile,
  getFileMetadata,
  listFilesInBucket,
  deleteFile,
  deleteMultipleFiles,
  generatePresignedURL,
  generatePresignedUploadURL,
  setFileMetadata,
  renameFile,
  enableBucketVersioning,
  disableBucketVersioning,
  getBucketVersioningStatus,
  setBucketLifecyclePolicy,
  getBucketLifecyclePolicy,
  setBucketNotification,
  getBucketNotification,
  uploadFileFromPath,
  getFileURL,
  copyFile,
  moveFile,
  checkFileExists,
  statObject
};