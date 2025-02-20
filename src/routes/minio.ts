// file located at src/routes/minio.ts

import { Router } from "express";
import { uploadFile, listFiles, getFile, deleteFile, helloWorld } from "../controllers/minio.js";
import multer from "multer";

const router: Router = Router();
const upload = multer();

// router.get("/hello", helloWorld);
router.post("/upload", upload.single("file"), uploadFile);
router.get("/files/:bucketName", listFiles);
router.get("/files/:bucketName/:filename", getFile);
router.delete("/files/:bucketName/:filename", deleteFile);

export default router;
