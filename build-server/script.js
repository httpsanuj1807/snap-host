import { exec } from 'child_process';
import path from 'path';
import fs from 'fs'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import mime from 'mime-types';


const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials:{
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
})

const PROJECT_ID = process.env.PROJECT_ID

async function init(){

    console.log("Build Started...");
    const outDirPath = path.join(process.cwd(), 'output');

    const p = exec(`cd ${outDirPath} && npm install && npm run build`);

    p.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    p.stderr.on('data', (error) => {
        console.log(`Error : ${error.toString()}`);
    });

    p.on('close', async() => {
        console.log("Build Completed");
        const distFolderPath = path.join(outDirPath, 'dist');
        const dirFolderContents = fs.readdirSync(distFolderPath, {recursive: true});

        console.log('Starting upload to AWS s3');

        for(const file of dirFolderContents){

            // if file is by any chance a directory, skip it
            const filePath = path.join(distFolderPath, file);
            if(fs.lstatSync(filePath).isDirectory()){
                continue;
            }

            // continue our upload

            const command = new PutObjectCommand({
                Bucket: 'my-vercel-project',
                Key: `__outputs/${PROJECT_ID}/${file}`,
                Body: fs.createReadStream(filePath),
                ContentType: mime.lookup(filePath)
            })

            await s3Client.send(command);
            console.log(`Uploaded ${file}`);

        }

        console.log('Upload Completed');

    })
    
}

init();