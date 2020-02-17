/*!
 * name: @feizheng/next-weibo-oss
 * description: Weibo oss for next api.
 * url: https://github.com/afeiship/next-weibo-oss
 * version: 1.0.0
 * date: 2020-02-14 19:32:22
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');

  var NxWeiboOss = nx.declare('nx.WeiboOss', {});

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxWeiboOss;
  }
})();

//# sourceMappingURL=next-weibo-oss.js.map
