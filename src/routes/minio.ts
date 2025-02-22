// file located at src/routes/minio.ts

import { Router } from "express";
import {
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
} from "../controllers/minio.js";
import upload from "../middleware/multer.js";

const router: Router = Router();

router.post("/upload", upload.single("file"), uploadSingleFileController);
router.post("/upload-multiple", upload.array("files"), uploadMultipleFilesController);
router.get("/file/:bucketName/:fileName", getFileController);
router.get("/file-url/:bucketName/:fileName", getFileURLController);
router.post("/presigned-url", generatePresignedURLController);
router.post("/presigned-upload-url", generatePresignedUploadURLController);
router.get("/file-exists/:bucketName/:fileName", checkFileExistsController);
router.get("/file-metadata/:bucketName/:fileName", statObjectController);
router.post("/list-files", listFilesInBucketController);
router.post("/set-metadata", setFileMetadataController);
router.post("/versioning/enable", enableBucketVersioningController);
router.post("/versioning/disable", disableBucketVersioningController);
router.get("/versioning/status/:bucketName", getBucketVersioningStatusController);
router.post("/lifecycle/set", setBucketLifecyclePolicyController);
router.get("/lifecycle/get/:bucketName", getBucketLifecyclePolicyController);
router.post("/notifications/set", setBucketNotificationController);
router.get("/notifications/get/:bucketName", getBucketNotificationController);
router.post("/copy-file", copyFileController);
router.post("/move-file", moveFileController);
router.post("/delete-file", deleteFileController);
router.post("/delete-multiple-files", deleteMultipleFilesController);
router.post("/rename-file", renameFileController);
router.get("/file-metadata/:bucketName/:fileName", getFileMetadataController);

export default router;
