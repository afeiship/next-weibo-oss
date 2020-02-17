# next-weibo-oss
> Weibo oss for next api.

## installation
```bash
npm install -S @feizheng/next-weibo-oss
```

## proxy_pass(node)
```js
app.use(
  '/weibo_api',
  proxy({
    target: 'https://picupload.weibo.com',
    changeOrigin: true,
    pathRewrite: { '^/weibo_api/': '/' }
  })
);
```

## proxy_pass(nginx)
```js
location /weibo_api {
    proxy_pass https://picupload.weibo.com;
    rewrite ^/weibo_api/(.*) /$1 break;
}
```

## apis
| api     | params   | description    |
| ------- | -------- | -------------- |
| upload  | file     | Upload a file. |
| uploads | fileList | Upload files.  |


## usage
```js
import NxWeiboOss from '@feizheng/next-weibo-oss';

const weiboOss = new NxWeiboOss(token);

// single file:
weiboOss.upload(file);

// multiple files:
weiboOss.uploads(files);
```
