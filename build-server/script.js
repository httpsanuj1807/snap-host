const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const mime = require('mime-types')
const Redis = require('ioredis');

const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials:{
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
})

const PROJECT_ID = process.env.PROJECT_ID;


const serviceUrl = process.env.REDIS_URL;
const publisher = new Redis(serviceUrl);
function publishLog(log) {
    publisher.publish(`logs:${PROJECT_ID}`, JSON.stringify({ log }))
}

async function init(){

    console.log("Build Started...");
    publishLog("Build Started"); 
    const outDirPath = path.join(process.cwd(), 'output');

    const p = exec(`cd ${outDirPath} && npm install && npm run build`);

    p.stdout.on('data', (data) => {
        publishLog(data.toString());
        console.log(data.toString());
    });

    p.stderr.on('data', (error) => {
        publishLog(`error : ${error.toString()}`);
        console.log(`Error : ${error.toString()}`);
    });

    p.on('close', async(code) => {
        if (code !== 0) {
            console.log("Build Failed");
            publishLog("Build Failed, please refer logs for fixes and retry.");
            await publisher.quit();
            return; // Exit early if build failed
        }
        console.log("Build Completed");
        publishLog("Build Completed");
        const distFolderPath = path.join(outDirPath, 'dist');
        const dirFolderContents = fs.readdirSync(distFolderPath, {recursive: true});

        console.log('Starting upload to AWS s3');
        publishLog('Storing code files...');

        for(const file of dirFolderContents){

            // if file is by any chance a directory, skip it
            const filePath = path.join(distFolderPath, file);
            if(fs.lstatSync(filePath).isDirectory()){
                continue;
            }

            // continue our upload
            publishLog(`Uploading ${file}`);
            const command = new PutObjectCommand({
                Bucket: 'my-project-vercel',
                Key: `__outputs/${PROJECT_ID}/${file}`,
                Body: fs.createReadStream(filePath),
                ContentType: mime.lookup(filePath)
            })

            await s3Client.send(command);
            console.log(`Uploaded ${file}`);
            publishLog(`Uploaded ${file}`);

        }

        console.log('Upload Completed');
        publishLog('Upload Completed');
        await publisher.quit();

    })
    
}

init();