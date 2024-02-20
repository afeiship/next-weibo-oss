import nx from '@jswork/next';
import '@jswork/next-file-upload';
import '@jswork/next-weibo-to-pics';

const WEIBO_API = '/weibo_api/interface/pic_upload.php';
const ROOT_COOKIE = '; Path=/;';

const NxWeiboOss = nx.declare('nx.WeiboOss', {
  methods: {
    init: function (inToken, inWeiboOptions) {
      global.document.cookie = 'SUB=' + inToken + ROOT_COOKIE;
      this.weiboOptions = inWeiboOptions;
    },
    process: function (inResponse, inResolve, inReject) {
      const _response = JSON.parse(inResponse.split('\n')[2]);
      const data = _response.data;
      data.count > 0
        ? inResolve(nx.weiboToPics(inResponse, this.weiboOptions))
        : inReject(inResponse);
    },
    upload: function (inFile) {
      return new Promise(function (resolve, reject) {
        nx.fileUpload(WEIBO_API, { pic1: inFile }).then((response) => {
          this.process(response, resolve, reject);
        });
      });
    },
    uploads: function (inFileList) {
      const request = {};
      const files = nx.slice(inFileList);
      files.forEach(function (file, index) {
        request['pic' + (index + 1)] = file;
      });

      return new Promise(function (resolve, reject) {
        nx.fileUpload(WEIBO_API, request).then((response) => {
          this.process(response, resolve, reject);
        });
      });
    }
  }
});

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = NxWeiboOss;
}

export default NxWeiboOss;
