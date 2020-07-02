var webim = require('./webim_wx.js');
var IMConfig = require('./config').IM;
import TLS from 'im-live-sells';
const app = getApp()

var config = {
        sdkAppID: IMConfig.sdkAppID,
        appIDAt3rd: IMConfig.appIDAt3rd, //用户所属应用id，必填
        accountType: IMConfig.accountType, //用户所属应用帐号类型，必填
        identifier: '', //当前用户ID,必须是否字符串类型，选填
        identifierNick: '', //当前用户昵称，选填
        userSig: '', //当前用户身份凭证，必须是字符串类型，选填
    };
	var hasLogin = false
	function login(){
	    
	    if( !hasLogin ){
	        webim.login(config, listeners,{}, function(){
	            hasLogin = true;
	        });
	    }
	}
	
module.exports = {
    login : login,
    
};