import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const required = ["AWS_REGION", "AWS_S3_BUCKET"];
const client = () => {
  const missing = required.find((name) => !process.env[name]);
  if (missing) throw new Error(`S3 storage is not configured: ${missing} is required.`);
  return new S3Client({ region: process.env.AWS_REGION });
};

export async function storeResume({ key, body, contentType }) {
  await client().send(new PutObjectCommand({ Bucket: process.env.AWS_S3_BUCKET, Key: key, Body: body, ContentType: contentType, ServerSideEncryption: "AES256" }));
}
export const getResumeDownloadUrl = (key) => getSignedUrl(client(), new GetObjectCommand({ Bucket: process.env.AWS_S3_BUCKET, Key: key, ResponseContentDisposition: "attachment" }), { expiresIn: 300 });
