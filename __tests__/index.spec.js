(function() {
  var nx = require('@feizheng/next-js-core2');
  var NxWeiboOss = require('../src/next-weibo-oss');

  describe('NxWeiboOss.methods', function() {
    test('init', function() {
      var data = {
        key: 1,
        value: 2
      };
      expect(!!data).toBe(true);
    });
  });
})();
