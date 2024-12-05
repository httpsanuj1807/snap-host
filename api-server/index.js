const express = require("express");
const { ECSClient, RunTaskCommand } = require("@aws-sdk/client-ecs");
const { Server } = require("socket.io");
const Redis = require("ioredis");
const cors = require("cors");
const mongoose = require('mongoose');
const authRouter = require('./routes/auth.routes.js');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = 9000;

require("dotenv").config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: "http://15.207.116.235",
    methods: ["POST", "GET"],
    credentials: true,
  })
);


const io = new Server({ cors: "*" });

io.listen(9002, () => {
  console.log("Socket server running at port 9002");
});

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const serviceUrl = process.env.REDIS_URL;
const subscriber = new Redis(serviceUrl);

io.on("connection", (socket) => {
  socket.on("subscribe", (channel) => {
    socket.join(channel);
  });
});

// AWS ECS client setup
const ecsClient = new ECSClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const config = {
  cluster: "arn:aws:ecs:ap-south-1:654654421610:cluster/builder-cluster",
  task: "arn:aws:ecs:ap-south-1:654654421610:task-definition/builder-task:4",
};

app.post("/project", async (req, res) => {
  const { gitURL, slug, envVar } = req.body;

  const projectSlug = slug;
  
  initRedisSubscribe(projectSlug);

  const command = new RunTaskCommand({
    cluster: config.cluster,
    taskDefinition: config.task,
    launchType: "FARGATE",
    count: 1,
    networkConfiguration: {
      awsvpcConfiguration: {
        subnets: [
          "subnet-0083d57b75befb784",
          "subnet-0dfe9f252f3e23af2",
          "subnet-0893b078927118e73",
        ],
        securityGroups: ["sg-0bf51cbf1b896b799"],
        assignPublicIp: "ENABLED",
      },
    },
    overrides: {
      containerOverrides: [
        {
          name: "builder-image",
          environment: [
            { name: "GIT_REPO_URL", value: gitURL },
            { name: "PROJECT_ID", value: projectSlug },
          ],
        },
      ],
    },
  });

  await ecsClient.send(command);
  return res.json({
    status: "queued",
    data: { projectSlug, url: `http://${projectSlug}.15.207.116.235:8000` },
  });
});



const subscribedChannels = new Set();

subscriber.on("message", (channel, message) => {
  console.log(`Received message on channel ${channel}: ${message}`);
  io.to(channel).emit("message", message);
});

async function initRedisSubscribe(projectSlug) {
  const channel = `logs:${projectSlug}`;
  if (!subscribedChannels.has(channel)) {
    console.log(`Subscribing to ${channel}`);
    await subscriber.subscribe(channel);
    subscribedChannels.add(channel);
  }
}


app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
});
