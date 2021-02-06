const { S3_ACCESS_KEY, S3_SECRET_KEY, S3_REGION, S3_BUCKET_NAME } = process.env;

module.exports = ({ env }) => ({
  upload: {
    provider: 'aws-s3',
    providerOptions: {
      accessKeyId: S3_ACCESS_KEY,
      secretAccessKey: S3_SECRET_KEY,
      region: S3_REGION,
      params: {
        Bucket: S3_BUCKET_NAME,
      },
    },
  },
});
