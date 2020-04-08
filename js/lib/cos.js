var CosAuth = require('./cos-auth');
var config = require('./cos-config');

function COS (authorizationRequest) {
  // 请求用到的参数
  // var prefix = 'https://cos.' + config.Region + '.myqcloud.com/' + config.Bucket + '/'; // 这个是后缀式，签名也要指定 Pathname: '/' + config.Bucket + '/'
  var prefix = 'https://' + config.Bucket + '.cos.' + config.Region + '.myqcloud.com/';


  // 对更多字符编码的 url encode 格式
  var camSafeUrlEncode = function (str) {
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
  };

  // 获取临时密钥
  var stsCache;
  var getCredentials = function (callback) {
    if (stsCache && Date.now() / 1000 + 30 < stsCache.expiredTime) {
      callback(stsCache.credentials);
      return;
    }
    authorizationRequest((data, error) => {
      if (data) {
        stsCache = data
      } else {
        uni.showModal({title: '临时密钥获取失败', content: JSON.stringify(error), showCancel: false});
      }
      callback(stsCache.credentials);
    })
  };

  // 计算签名
  var getAuthorization = function (options, callback) {
    getCredentials(function (credentials) {
      callback({
        XCosSecurityToken: credentials.Token,
        Authorization: CosAuth({
          SecretId: credentials.TmpSecretId,
          SecretKey: credentials.TmpSecretKey,
          Method: options.Method,
          Pathname: options.Pathname,
        })
      });
    });
  };

  // 上传文件
  var uploadFile = function (filePath) {
    return new Promise((resolve, reject) => {
      var Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
      getAuthorization({Method: 'POST', Pathname: '/'}, function (AuthData) {
        var requestTask = uni.uploadFile({
          url: prefix,
          name: 'file',
          filePath: filePath,
          formData: {
            'key': Key,
            'success_action_status': 200,
            'Signature': AuthData.Authorization,
            'x-cos-security-token': AuthData.XCosSecurityToken
          },
          success: function (res) {
            var url = prefix + camSafeUrlEncode(Key).replace(/%2F/g, '/');
            if (res.statusCode === 200) {
              resolve(url);
              // wx.showModal({title: '上传成功', content: url, showCancel: false});
            } else {
              reject(res)
              // wx.showModal({title: '上传失败', content: JSON.stringify(res), showCancel: false});
            }
          },
          fail: function (res) {
            reject(res)
            // wx.showModal({title: '上传失败', content: JSON.stringify(res), showCancel: false});
          }
        });
        requestTask.onProgressUpdate(function (res) {
          console.log('正在进度:', res);
        });
      });
    })

  };

  return {
    uploadFile
  }

};

export default COS;
