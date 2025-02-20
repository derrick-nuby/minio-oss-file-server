// file located at src/routes/minio.ts

import { Router } from "express";
import { uploadFile, uploadMultipleFiles, listFiles, getFile, deleteFile } from "../controllers/minio.js";
import upload from "../middleware/minio.js";

const router: Router = Router();

router.post("/upload", upload.single("file"), uploadFile);
router.post("/upload-multiple", upload.array("files"), uploadMultipleFiles);
router.get("/files/:bucketName", listFiles);
router.get("/files/:bucketName/:filename", getFile);
router.delete("/files/:bucketName/:filename", deleteFile);

export default router;
