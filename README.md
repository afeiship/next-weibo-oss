# next-weibo-oss
> Weibo oss for next api.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-weibo-oss
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
import '@jswork/next-weibo-oss';

const weiboOss = new nx.WeiboOss(token);

// single file:
weiboOss.upload(file);

// multiple files:
weiboOss.uploads(files);
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-weibo-oss/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-weibo-oss
[version-url]: https://npmjs.org/package/@jswork/next-weibo-oss

[license-image]: https://img.shields.io/npm/l/@jswork/next-weibo-oss
[license-url]: https://github.com/afeiship/next-weibo-oss/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-weibo-oss
[size-url]: https://github.com/afeiship/next-weibo-oss/blob/master/dist/next-weibo-oss.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-weibo-oss
[download-url]: https://www.npmjs.com/package/@jswork/next-weibo-oss
