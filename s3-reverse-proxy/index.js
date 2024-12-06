const express = require('express');
const httpProxy = require('http-proxy');

const app = express();

const PORT = 8000;

const BASE_URL = 'https://my-project-vercel.s3.ap-south-1.amazonaws.com/__outputs/'

const proxy = httpProxy.createProxyServer();

app.get('/test', (req, res) => {  
    return res.status(200).json("Proxy Server Running");   
})

app.get('/favicon.ico', (req, res) => {
    return res.status(204).end();
})

app.use((req, res) => {

    console.log("Resolving your request...")
    const hostname = req.hostname;              // p1.localhost
    console.log(hostname);
    const subdomain = hostname.split('.')[0];   // p1

    const resolvesTo = `${BASE_URL}${subdomain}`;

    return proxy.web(req, res, {
        target: resolvesTo,
        changeOrigin: true
    })

})


proxy.on('proxyReq', (proxyReq, req, res) => {

    const url = req.url;
    if(req.url === '/'){
        proxyReq.path += 'index.html';
    }
    console.log("Resolved success.");

})

app.listen(PORT, ()=>{
    console.log(`Reverse Proxy is running on port ${PORT}`);
})