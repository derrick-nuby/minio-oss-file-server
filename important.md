# MinIo

## **Functionalities**

### **1. High-Priority (Most Frequently Used)**

- `uploadFile` – Upload a single file.
- `uploadMultipleFiles` – Upload multiple files at once.
- `uploadFileFromPath` – Upload a file directly from a local path.
- `getFile` – Retrieve/download a file.
- `getFileURL` – Get the direct URL of a file.
- `generatePresignedURL` – Generate a temporary URL for file access.
- `generatePresignedUploadURL` – Generate a temporary URL for uploading files.
- `checkFileExists` – Check if a file exists in a bucket.
- `statObject` – Retrieve file metadata and details.
- `listFilesInBucket` – List all files in a specific bucket.

### **2. Medium-Priority (Moderately Used but Important for Management)**

- `deleteFile` – Delete a single file.
- `deleteMultipleFiles` – Delete multiple files at once.
- `renameFile` – Rename an existing file.
- `copyFile` – Copy a file from one location to another.
- `moveFile` – Move a file between locations.
- `setFileMetadata` – Update metadata for a file.
- `getFileMetadata` – Retrieve file metadata.
- `bucketExists` – Check if a bucket exists.
- `listBuckets` – List all available buckets.
- `createBucket` – Create a new bucket.
- `deleteBucket` – Delete an empty bucket.

### **3. Low-Priority (Less Frequently Used but Useful for Advanced Control)**

- `enableBucketVersioning` – Enable versioning for a bucket.
- `disableBucketVersioning` – Disable versioning for a bucket.
- `getBucketVersioningStatus` – Check if versioning is enabled.
- `setBucketLifecyclePolicy` – Define retention and expiration rules for files.
- `getBucketLifecyclePolicy` – Retrieve the lifecycle rules for a bucket.
- `setBucketNotification` – Configure event notifications on bucket changes.
- `getBucketNotification` – Retrieve existing notification settings.

### **Why This Order?**

- **File Upload & Retrieval** is the core functionality, so those functions are highest priority.
- **File & Bucket Management** is essential but used less frequently than uploads/downloads.
- **Advanced Features** like versioning and lifecycle policies are useful but not as critical daily.

This should help you structure your implementation efficiently. Let me know if you need adjustments! 🚀
