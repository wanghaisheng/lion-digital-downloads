import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from "~/lib/clients/s3Client";

import {promisify} from 'node:util';
import stream from 'node:stream';
import fs from 'node:fs';
import got from 'got';

const pipeline = promisify(stream.pipeline);

export default async function downloadFile(req, res) {

  console.log('---------------------------------------')

  const bucketParams = {
    Bucket: "liondigital",
    Key: "Abstract-lion-logo-template-5435422.zip"
  };

  const run = async () => {
    try {
      const url = await getSignedUrl(s3Client, new GetObjectCommand(bucketParams), { expiresIn: 15 * 60 }); // Adjustable expiration.
      return url;
    } catch (err) {
      console.log("Error from RUNNN", err);
      return err;
    }
  };

  const downlodFile = async (url) => {
    console.log('1')
    const response = await fetch(url); // replace this with your API call & options
    if (!response.ok) {
      throw new Error(`unexpected response ${response.statusText}`)
      res.status(401).json({ error: 'bad' })
    };

    const fileName = "file1234.zip";

    const downloadStream = got.stream(url);
    const fileWriterStream = fs.createWriteStream(fileName);

    downloadStream
      .on("downloadProgress", ({ transferred, total, percent }) => {
        const percentage = Math.round(percent * 100);
        console.error(`progress: ${transferred}/${total} (${percentage}%)`);
      })
      .on("error", (error) => {
        console.error(`Download failed: ${error.message}`);
      });

    fileWriterStream
      .on("error", (error) => {
        console.error(`Could not write file to system: ${error.message}`);
      })
      .on("finish", () => {
        console.log(`File downloaded to ${fileName}`);
      });

    await downloadStream.pipe(fileWriterStream);

    res.status(200).json({ message: 'done!' })

  }

  try {
    let downloadUrl = await run();
    let dl = await downlodFile(downloadUrl);
  } catch (error) {
    console.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }

  

}

