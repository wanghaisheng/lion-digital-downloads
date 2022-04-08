import { S3 } from "@aws-sdk/client-s3";

const s3Client = new S3({
    endpoint: "https://sfo3.digitaloceanspaces.com",
    region: "us-west-3",
    credentials: {
      accessKeyId: 'PMFFH2AJORQX6S2Y4KE7',
      secretAccessKey: '5MGi0ugAo9J0d8Jm3ocCwFgaJgzXzoastSgHp81gb34'
    }
});

export { s3Client };