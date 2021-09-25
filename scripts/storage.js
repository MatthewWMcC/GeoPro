const nameToCode = require("./data/name-to-code.json");

const { Storage } = require("@google-cloud/storage");
const fs = require("fs");
const {
  GOOGLE_CLOUD_PROJECT_ID,
  defaultBucketName,
  GOOGLE_CLOUD_KEYFILE_PATH,
} = require("./constants");

const storage = new Storage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE_PATH,
});

const getBucket = (bucketName) => {
  return storage.bucket(bucketName);
};

const uploadFile = async (path, destination) => {
  try {
    const bucket = getBucket(defaultBucketName);

    await bucket.upload(path, {
      destination: destination,
    });

    console.log(`${path} uploaded to ${defaultBucketName}`);
  } catch (e) {
    console.error(e);
  }
};

module.exports = { uploadFile };
