// file located at src/routes/minio.ts

import * as Minio from "minio";
import dotenv from 'dotenv';
dotenv.config();

const endPoint = process.env.MINIO_ENDPOINT;
const port = process.env.MINIO_PORT;
const useSSL = process.env.MINIO_USE_SSL;
const accessKey = process.env.MINIO_ACCESS_KEY;
const secretKey = process.env.MINIO_SECRET_KEY;

if (!endPoint) {
  throw new Error("Missing required environment variable: MINIO_ENDPOINT");
}
if (!port) {
  throw new Error("Missing required environment variable: MINIO_PORT");
}
if (!useSSL) {
  throw new Error("Missing required environment variable: MINIO_USE_SSL");
}
if (!accessKey) {
  throw new Error("Missing required environment variable: MINIO_ACCESS_KEY");
}
if (!secretKey) {
  throw new Error("Missing required environment variable: MINIO_SECRET_KEY");
}

const minioClient = new Minio.Client({
  endPoint: endPoint,
  port: Number(port),
  useSSL: useSSL === "true",
  accessKey: accessKey,
  secretKey: secretKey,
});

export default minioClient;
