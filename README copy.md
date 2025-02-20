Certainly! Below is the **restructured and expanded list** of functions, incorporating the ones you provided and adding additional functions that were not already included. This list is comprehensive and covers all the necessary operations for managing files and buckets in your insurance company application using MinIO.

---

### **Bucket Management Functions**

1. **`createBucket`**

   - **Params:**
     - `bucketName` (string, required) – Name of the bucket
     - `region` (string, optional) – Region where the bucket should be created
   - **Returns:** Success message or error

2. **`deleteBucket`**

   - **Params:**
     - `bucketName` (string, required) – Name of the bucket
   - **Returns:** Success message or error

3. **`bucketExists`**

   - **Params:**
     - `bucketName` (string, required) – Name of the bucket
   - **Returns:** Boolean (true if exists, false otherwise)

4. **`listBuckets`**

   - **Params:** None
   - **Returns:** Array of bucket details (name, creation date)

5. **`setBucketEncryption`**

   - **Params:**
     - `bucketName` (string, required)
     - `encryptionConfig` (object, optional) – Encryption configuration (e.g., SSE algorithm)
   - **Returns:** Success message

6. **`getBucketEncryption`**

   - **Params:**
     - `bucketName` (string, required)
   - **Returns:** Encryption configuration

7. **`removeBucketEncryption`**

   - **Params:**
     - `bucketName` (string, required)
   - **Returns:** Success message

8. **`setBucketReplication`**

   - **Params:**
     - `bucketName` (string, required)
     - `replicationConfig` (object, required) – Replication configuration
   - **Returns:** Success message

9. **`getBucketReplication`**

   - **Params:**
     - `bucketName` (string, required)
   - **Returns:** Replication configuration

10. **`removeBucketReplication`**
    - **Params:**
      - `bucketName` (string, required)
    - **Returns:** Success message

---

### **File Upload & Management Functions**

11. **`uploadFile`**

    - **Params:**
      - `bucketName` (string, required) – Target bucket
      - `file` (File object or buffer, required) – File to be uploaded
      - `fileName` (string, optional) – Custom file name
      - `metadata` (object, optional) – Additional metadata (e.g., content-type)
    - **Returns:** File URL and metadata

12. **`uploadMultipleFiles`**

    - **Params:**
      - `bucketName` (string, required)
      - `files` (array of File objects, required)
      - `metadata` (object, optional)
    - **Returns:** Array of uploaded file URLs

13. **`uploadFileFromPath`**

    - **Params:**
      - `bucketName` (string, required)
      - `filePath` (string, required) – Path to the file on disk
      - `metadata` (object, optional)
    - **Returns:** File URL

14. **`renameFile`**

    - **Params:**
      - `bucketName` (string, required)
      - `oldFileName` (string, required)
      - `newFileName` (string, required)
    - **Returns:** New file URL or success message

15. **`deleteFile`**

    - **Params:**
      - `bucketName` (string, required)
      - `fileName` (string, required)
    - **Returns:** Success message or error

16. **`deleteMultipleFiles`**

    - **Params:**
      - `bucketName` (string, required)
      - `fileNames` (array of strings, required)
    - **Returns:** Success message

17. **`setFileMetadata`**

    - **Params:**
      - `bucketName` (string, required)
      - `fileName` (string, required)
      - `metadata` (object, required) – Metadata to set
    - **Returns:** Success message

18. **`getFileMetadata`**

    - **Params:**
      - `bucketName` (string, required)
      - `fileName` (string, required)
    - **Returns:** Metadata object

19. **`setObjectTagging`**

    - **Params:**
      - `bucketName` (string, required)
      - `fileName` (string, required)
      - `tags` (object, required) – Key-value pairs for tagging
    - **Returns:** Success message

20. **`getObjectTagging`**

    - **Params:**
      - `bucketName` (string, required)
      - `fileName` (string, required)
    - **Returns:** Tags object

21. **`removeObjectTagging`**
    - **Params:**
      - `bucketName` (string, required)
      - `fileName` (string, required)
    - **Returns:** Success message

---

### **File Retrieval Functions**

22. **`getFile`**

    - **Params:**
      - `bucketName` (string, required)
      - `fileName` (string, required)
    - **Returns:** File buffer or stream

23. **`getFileURL`**

    - **Params:**
      - `bucketName` (string, required)
      - `fileName` (string, required)
    - **Returns:** URL string

24. **`listFilesInBucket`**

    - **Params:**
      - `bucketName` (string, required)
    - **Returns:** Array of file objects (name, size, last modified)

25. **`getPartialObject`**

    - **Params:**
      - `bucketName` (string, required)
      - `fileName` (string, required)
      - `offset` (number, required) – Start byte position
      - `length` (number, required) – Number of bytes to retrieve
    - **Returns:** Partial file stream

26. **`statObject`**
    - **Params:**
      - `bucketName` (string, required)
      - `fileName` (string, required)
    - **Returns:** Object metadata (size, etag, last modified, etc.)

---

### **Presigned URL Functions (For Temporary Access)**

27. **`generatePresignedURL`**

    - **Params:**
      - `bucketName` (string, required)
      - `fileName` (string, required)
      - `expiry` (number, optional, default 3600) – Expiry in seconds
    - **Returns:** Temporary file URL

28. **`generatePresignedUploadURL`**

    - **Params:**
      - `bucketName` (string, required)
      - `fileName` (string, required)
      - `expiry` (number, optional, default 3600)
    - **Returns:** Temporary upload URL

29. **`generatePresignedPostPolicy`**
    - **Params:**
      - `bucketName` (string, required)
      - `conditions` (object, required) – Conditions for the POST policy
    - **Returns:** Presigned POST policy

---

### **File Copy & Move Functions**

30. **`copyFile`**

    - **Params:**
      - `sourceBucket` (string, required)
      - `sourceFileName` (string, required)
      - `destinationBucket` (string, required)
      - `destinationFileName` (string, required)
    - **Returns:** New file URL or success message

31. **`moveFile`**
    - **Params:**
      - `sourceBucket` (string, required)
      - `sourceFileName` (string, required)
      - `destinationBucket` (string, required)
      - `destinationFileName` (string, required)
    - **Returns:** Success message

---

### **Versioning & Lifecycle Management**

32. **`enableBucketVersioning`**

    - **Params:**
      - `bucketName` (string, required)
    - **Returns:** Success message

33. **`disableBucketVersioning`**

    - **Params:**
      - `bucketName` (string, required)
    - **Returns:** Success message

34. **`getBucketVersioningStatus`**

    - **Params:**
      - `bucketName` (string, required)
    - **Returns:** Versioning status

35. **`setBucketLifecyclePolicy`**

    - **Params:**
      - `bucketName` (string, required)
      - `rules` (array, required) – Lifecycle rules
    - **Returns:** Success message

36. **`getBucketLifecyclePolicy`**
    - **Params:**
      - `bucketName` (string, required)
    - **Returns:** Policy details

---

### **Security & Access Control**

37. **`setBucketPolicy`**

    - **Params:**
      - `bucketName` (string, required)
      - `policy` (object, required)
    - **Returns:** Success message

38. **`getBucketPolicy`**

    - **Params:**
      - `bucketName` (string, required)
    - **Returns:** Policy details

39. **`setFilePermissions`**
    - **Params:**
      - `bucketName` (string, required)
      - `fileName` (string, required)
      - `permissions` (string, required) – Example: ‘public-read’
    - **Returns:** Success message

---

### **Notification & Event Listeners**

40. **`setBucketNotification`**

    - **Params:**
      - `bucketName` (string, required)
      - `events` (array, required) – Events to listen for (e.g., "s3:ObjectCreated:\*")
      - `destination` (string, required) – Notification target (e.g., webhook, queue)
    - **Returns:** Success message

41. **`getBucketNotification`**

    - **Params:**
      - `bucketName` (string, required)
    - **Returns:** Notification settings

42. **`listenToBucketEvents`**
    - **Params:**
      - `bucketName` (string, required)
      - `prefix` (string, optional) – Filter objects starting with this prefix
      - `suffix` (string, optional) – Filter objects ending with this suffix
      - `events` (array, required) – Events to listen for
    - **Returns:** Event listener instance

---

### **Additional Functions**

43. **`checkFileExists`**

    - **Params:**
      - `bucketName` (string, required)
      - `fileName` (string, required)
    - **Returns:** Boolean (true if file exists)

44. **`abortIncompleteUpload`**

    - **Params:**
      - `bucketName` (string, required)
      - `fileName` (string, required)
    - **Returns:** Success message

45. **`composeObject`**

    - **Params:**
      - `bucketName` (string, required)
      - `sourceObjects` (array, required) – List of source objects to compose
      - `destinationObject` (string, required) – Name of the composed object
    - **Returns:** Success message

46. **`selectObjectContent`**
    - **Params:**
      - `bucketName` (string, required)
      - `fileName` (string, required)
      - `query` (string, required) – SQL query to filter object content
    - **Returns:** Filtered content

---

This list now includes **all the functions** you provided, along with additional ones to cover advanced use cases like encryption, replication, and object composition. Each function is designed to be modular and reusable, ensuring your application can handle all file and bucket operations efficiently.
