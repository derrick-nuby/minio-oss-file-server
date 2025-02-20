# MinIo

## **How MinIO Works**

MinIO is an object storage service that is compatible with Amazon S3. It allows you to store and retrieve files using an API similar to AWS S3. It is designed for high-performance and self-hosted deployments.

### **Key Features:**

- **S3 Compatibility:** Works with AWS S3 SDKs.
- **Scalability:** Can handle large amounts of data.
- **Access Control:** Supports IAM policies for permissions.
- **High Performance:** Optimized for storing and serving large files.

---

## **Primary CRUD Operations in MinIO**

These are the main routes for handling files in MinIO.

| **Method** | **Route**          | **Name**    | **Description**                       |
| ---------- | ------------------ | ----------- | ------------------------------------- |
| `POST`     | `/upload`          | Upload File | Uploads a file to MinIO.              |
| `GET`      | `/files`           | List Files  | Lists all files in a specific bucket. |
| `GET`      | `/files/:filename` | Get File    | Retrieves a file from MinIO.          |
| `DELETE`   | `/files/:filename` | Delete File | Deletes a specific file from MinIO.   |

---

## **Secondary Routes for Additional Functions**

These routes enhance the functionality beyond simple CRUD operations.

| **Method** | **Route**                        | **Name**           | **Description**                             |
| ---------- | -------------------------------- | ------------------ | ------------------------------------------- |
| `GET`      | `/buckets`                       | List Buckets       | Lists all buckets available.                |
| `POST`     | `/buckets`                       | Create Bucket      | Creates a new storage bucket.               |
| `DELETE`   | `/buckets/:bucket`               | Delete Bucket      | Deletes a specific bucket.                  |
| `PUT`      | `/files/:filename/metadata`      | Update Metadata    | Modifies metadata of a stored file.         |
| `GET`      | `/files/:filename/presigned-url` | Get Pre-signed URL | Generates a temporary URL to access a file. |
| `POST`     | `/files/:filename/copy`          | Copy File          | Copies a file within MinIO.                 |
| `PUT`      | `/files/:filename/permissions`   | Set Permissions    | Sets access permissions for a file.         |
