(function () {

  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var NxFileUpload = require('next-file-upload');
  var NxWeiboToPics = require('next-weibo-to-pics');
  var WEIBO_API = '/weibo_api/interface/pic_upload.php';
  var WEIBO_IMG = 'https://ws2.sinaimg.cn';


  var NxWeiboOss = nx.declare('nx.WeiboOss', {
    methods: {
      init: function (inToken, inOptions) {
        this._token = inToken;
        this._options = inOptions;
        this.initToken();
      },
      initToken: function () {
        var subCookie = this._token;
        if (typeof token !== 'string') {
          subCookie = token.find(function (item) {
            return item.indexOf('SUB=') > -1;
          });
        }
        global.document.cookie = subCookie.split(';')[0];
      },
      process: function (inReponse, inResolve, inReject) {
        var _response = JSON.parse(inReponse.split('\n')[2]);
        var data = _response.data;
        if (data.count > 0) {
          var pics = NxWeiboToPics(data.pics);
          var value = pics.map(function (item) {
            item.type = item.pid.charAt(21) === 'g' ? 'gif' : 'jpg';
            item.url = [WEIBO_IMG, '/large/', item.pid, '.', item.type].join('');
            return item;
          });
          inResolve(value);
        } else {
          inReject(response);
        }
      },
      upload: function (inFile) {
        var self = this;
        return new Promise(function (resolve, reject) {
          NxFileUpload(WEIBO_API, { pic1: inFile }).then(function (response) {
            self.process(response, resolve, reject);
          });
        })
      },
      uploads: function (inFileList) {
        var self = this;
        var request = {};
        var files = nx.slice(inFileList);
        files.forEach(function (file, index) {
          request['pic' + index + 1] = file;
        });

        return new Promise(function (resolve, reject) {
          NxFileUpload(WEIBO_API, request).then(function (response) {
            self.process(response, resolve, reject);
          });
        });
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxWeiboOss;
  }

}());