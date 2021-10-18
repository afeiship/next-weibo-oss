const express = require('express');
const app = express();
const portNumber = 3000;
const sourceDir = 'src';
const proxy = require('express-http-proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');


app.use(express.static('src'));
app.use(express.static('example'));
app.use(express.static('node_modules'));
app.use(
  '/weibo_api',
  createProxyMiddleware({
    target: 'https://picupload.weibo.com',
    changeOrigin: true,
    pathRewrite: { '^/weibo_api/': '/' }
  })
);

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});
