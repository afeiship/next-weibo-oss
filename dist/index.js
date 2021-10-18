/*!
 * name: @jswork/next-weibo-oss
 * description: Weibo oss for next api.
 * homepage: https://github.com/afeiship/next-weibo-oss
 * version: 1.0.1
 * date: 2021-10-18 09:58:57
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxFileUpload = nx.fileUpload || require('@jswork/next-file-upload');
  var NxWeiboToPics = nx.weiboToPics || require('@jswork/next-weibo-to-pics');
  var WEIBO_API = '/weibo_api/interface/pic_upload.php';
  var WEIBO_IMG = 'https://tva1.sinaimg.cn';
  var ROOT_COOKIE = '; Path=/;';

  var NxWeiboOss = nx.declare('nx.WeiboOss', {
    methods: {
      init: function (inToken) {
        global.document.cookie = 'SUB=' + inToken + ROOT_COOKIE;
      },
      process: function (inResponse, inResolve, inReject) {
        var _response = JSON.parse(inResponse.split('\n')[2]);
        var data = _response.data;
        if (data.count > 0) {
          var pics = NxWeiboToPics(inResponse);
          var value = pics.map(function (item) {
            item.type = item.pid.charAt(21) === 'g' ? 'gif' : 'jpg';
            item.url = [WEIBO_IMG, '/large/', item.pid, '.', item.type].join('');
            return item;
          });
          inResolve(value);
        } else {
          inReject(inResponse);
        }
      },
      upload: function (inFile) {
        var self = this;
        return new Promise(function (resolve, reject) {
          nxFileUpload(WEIBO_API, { pic1: inFile }).then(function (response) {
            self.process(response, resolve, reject);
          });
        });
      },
      uploads: function (inFileList) {
        var self = this;
        var request = {};
        var files = nx.slice(inFileList);
        files.forEach(function (file, index) {
          request['pic' + (index + 1)] = file;
        });

        return new Promise(function (resolve, reject) {
          nxFileUpload(WEIBO_API, request).then(function (response) {
            self.process(response, resolve, reject);
          });
        });
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxWeiboOss;
  }
})();
