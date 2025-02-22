# sample routes do not follow them if there is no use

### **Route Table**

| **Number** | **Route**                 | **Function**                   | **Explanation**                                        |
| ---------- | ------------------------- | ------------------------------ | ------------------------------------------------------ |
| 1          | `/buckets/create`         | `createBucket()`               | Creates a new bucket.                                  |
| 2          | `/buckets/delete`         | `deleteBucket()`               | Deletes an existing bucket.                            |
| 3          | `/buckets/exists`         | `bucketExists()`               | Checks if a bucket exists.                             |
| 4          | `/buckets/list`           | `listBuckets()`                | Lists all buckets.                                     |
| 5          | `/files/upload`           | `uploadFile()`                 | Uploads a single file to a bucket.                     |
| 6          | `/files/upload-multiple`  | `uploadMultipleFiles()`        | Uploads multiple files to a bucket.                    |
| 7          | `/files/upload-from-path` | `uploadFileFromPath()`         | Uploads a file from a local path to a bucket.          |
| 8          | `/files/get`              | `getFile()`                    | Retrieves a file from a bucket.                        |
| 9          | `/files/get-url`          | `getFileURL()`                 | Generates a URL to access a file.                      |
| 10         | `/files/metadata`         | `getFileMetadata()`            | Retrieves metadata for a file.                         |
| 11         | `/files/list`             | `listFilesInBucket()`          | Lists all files in a bucket.                           |
| 12         | `/files/delete`           | `deleteFile()`                 | Deletes a file from a bucket.                          |
| 13         | `/files/delete-multiple`  | `deleteMultipleFiles()`        | Deletes multiple files from a bucket.                  |
| 14         | `/files/rename`           | `renameFile()`                 | Renames a file in a bucket.                            |
| 15         | `/files/copy`             | `copyFile()`                   | Copies a file from one bucket to another.              |
| 16         | `/files/move`             | `moveFile()`                   | Moves a file from one bucket to another.               |
| 17         | `/files/check-exists`     | `checkFileExists()`            | Checks if a file exists in a bucket.                   |
| 18         | `/files/stat`             | `statObject()`                 | Retrieves detailed information about a file.           |
| 19         | `/presigned/url`          | `generatePresignedURL()`       | Generates a presigned URL for downloading a file.      |
| 20         | `/presigned/upload-url`   | `generatePresignedUploadURL()` | Generates a presigned URL for uploading a file.        |
| 21         | `/versioning/enable`      | `enableBucketVersioning()`     | Enables versioning for a bucket.                       |
| 22         | `/versioning/disable`     | `disableBucketVersioning()`    | Disables versioning for a bucket.                      |
| 23         | `/versioning/status`      | `getBucketVersioningStatus()`  | Retrieves the versioning status of a bucket.           |
| 24         | `/lifecycle/set`          | `setBucketLifecyclePolicy()`   | Sets a lifecycle policy for a bucket.                  |
| 25         | `/lifecycle/get`          | `getBucketLifecyclePolicy()`   | Retrieves the lifecycle policy for a bucket.           |
| 26         | `/notifications/set`      | `setBucketNotification()`      | Sets up notifications for a bucket.                    |
| 27         | `/notifications/get`      | `getBucketNotification()`      | Retrieves the notification configuration for a bucket. |
| 28         | `/metadata/set`           | `setFileMetadata()`            | Sets metadata for a file.                              |

---
