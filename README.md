# next-weibo-oss
> Weibo oss for next api

## proxy_pass(node)
```js
app.use(
  '/weibo_api',
  proxy({
    target: 'http://picupload.service.weibo.com',
    changeOrigin: true,
    pathRewrite: { '^/weibo_api/': '/' }
  })
);
```

## proxy_pass(nginx)
```js
location /weibo_api {
    proxy_pass http://picupload.service.weibo.com;
    rewrite ^/weibo_api/(.*) /$1 break;
}
```


## usage:
```js
import NxWeiboOss from 'next-weibo-oss';

const weiboOss = new NxWeiboOss(token);

// single file:
weiboOss.upload(file);

// multiple files:
weiboOss.uploads(files);
```

## resources:

## todos:
- [ ] unit test case
