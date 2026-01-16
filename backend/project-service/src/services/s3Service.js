const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

// Upload file to S3
exports.uploadToS3 = async (file, folder = 'projects') => {
    try {
        const key = `${folder}/${Date.now()}-${file.originalname}`;

        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read'
        });

        await s3Client.send(command);

        return {
            url: `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
            key
        };
    } catch (error) {
        console.error('S3 upload error:', error);
        throw new Error('Failed to upload file');
    }
};

// Delete file from S3
exports.deleteFromS3 = async (fileUrl) => {
    try {
        const key = fileUrl.split('.com/')[1];

        const command = new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key
        });

        await s3Client.send(command);
        return true;
    } catch (error) {
        console.error('S3 delete error:', error);
        return false;
    }
};

// Get presigned URL for private files
exports.getPresignedUrl = async (key, expiresIn = 3600) => {
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn });
        return url;
    } catch (error) {
        console.error('Presigned URL error:', error);
        throw new Error('Failed to generate download URL');
    }
};
