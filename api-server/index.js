const express = require("express");
const { generateSlug } = require("random-word-slugs");
const { ECSClient, RunTaskCommand } = require("@aws-sdk/client-ecs");

const app = express();
const PORT = 9000;

app.use(express.json());
require("dotenv").config();

const ecsClient = new ECSClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  }
});

const config = {
  cluster: "arn:aws:ecs:ap-south-1:654654421610:cluster/builder-cluster",
  task: "arn:aws:ecs:ap-south-1:654654421610:task-definition/builder-task:3",
};

app.post("/project", async (req, res) => {
  const { gitURL, slug } = req.body;
  const projectSlug = slug ? slug : generateSlug();

  // spin the container with the git url and slug

  const command = new RunTaskCommand({
    cluster: config.cluster,
    taskDefinition: config.task,
    launchType: "FARGATE",
    count: 1,
    networkConfiguration: {
      awsvpcConfiguration: {
        subnets: ["subnet-0083d57b75befb784", "subnet-0dfe9f252f3e23af2", "subnet-0893b078927118e73"],
        securityGroups: ["sg-0bf51cbf1b896b799"],
        assignPublicIp: "ENABLED",
      },
    },
    overrides: {
        containerOverrides: [
          {
            name: "builder-image",
            environment:[
                {name : 'GIT_REPO_URL', value: gitURL},
                {name : 'PROJECT_ID', value: projectSlug}
            ]
          }
        ]
      },
  });

  await ecsClient.send(command);
  return res.json({
    status: "queued",
    data: { projectSlug, url: `http://${projectSlug}.localhost:8000` },
  });
});

app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
});
