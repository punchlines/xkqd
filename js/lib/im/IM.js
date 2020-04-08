
var webim = require('./webim_wx.js');
var IMConfig = require('./config').IM;
const app = getApp()

var config = {
        sdkAppID: IMConfig.sdkAppID,
        appIDAt3rd: IMConfig.appIDAt3rd, //用户所属应用id，必填
        accountType: IMConfig.accountType, //用户所属应用帐号类型，必填
        identifier: '38', //当前用户ID,必须是否字符串类型，选填
        identifierNick: '', //当前用户昵称，选填
        userSig: 'eJxlz11PgzAUgOF7fkXT2xkttN3AxIsFq8EwnRnoZQP0QDrkY6VbNo3-3YhLxHhun-fk5Hw4CCGcxJvLrCi6fWulPfWA0TXCBF-8Yt9rJTMrqVH-EI69NiCz0oIZ0eWce4RMG62gtbrU54L6ExtULccDP8uMEHfhM-dPoqsRVyINI7EQQtz7tw1cddV7kM12EQyqfB3Mc1zfFQkc1*t5sEvUU77UYlmV2w5605xyfuAifHtgdVqnL7Mtq-ZhEtNuE0C*8sL8MbqZnLS6gfM3zCeM*nw*0QOYQXftGHjE5a5Hyfdg59P5Aoi8W94_', //当前用户身份凭证，必须是字符串类型，选填
    };

var hasLogin = false


function newMsg(selToID){
    var selType = webim.SESSION_TYPE.C2C;
    var fromAccount = app.globalData.fromUser.identifier
    var selSess = webim.MsgStore.sessByTypeId( selType , selToID );
    var msgTime = Math.round(new Date().getTime() / 1000);//消息时间戳
    var random = Math.round(Math.random() * 4294967296);//消息随机数，用于去重
    var seq = -1;//消息序列，-1表示sdk自动生成，用于去重
    var isSend = true;//是否为自己发送
    var subType = webim.C2C_MSG_SUB_TYPE.COMMON;//webim.C2C_MSG_SUB_TYPE.COMMON-普通消息,
    if (!selSess) {
        selSess = new webim.Session(selType, selToID, selToID, null, msgTime);
    }
    var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, fromAccount, subType, fromAccount);
    return msg
}


//发图片消息
function sendImageMsg(selToID, imageUrl ){
    var msg = newMsg(selToID);
    var customMsg = new webim.Msg.Elem.Custom(JSON.stringify({
        type: 'image',
        url: imageUrl
    }));
    msg.addCustom(customMsg);
    sendMsg( msg );
}


//发音频消息
function sendAudioMsg(selToID, audioUrl ){
    var msg = newMsg(selToID);
    var customMsg = new webim.Msg.Elem.Custom(JSON.stringify({
        type: 'audio',
        url: audioUrl
    }));
    msg.addCustom(customMsg);
    sendMsg( msg );
}

//发消息
function sendMsg( msg ){
    webim.sendMsg(msg, function () {
        // if (selType == webim.SESSION_TYPE.C2C) {
            //私聊时，在聊天窗口手动添加一条发的消息
            //群聊时，轮询接口会返回自己发的消息
            // showMsg(msg);
        // }
        console.debug("发消息成功");
    }, function (err) {
        console.error("发消息失败:" + err.ErrorInfo);
    });
}


var listeners = {
	"onMsgNotify": (newMsgList) => {
      var sess, newMsg;
      //获取所有聊天会话
      var sessMap = webim.MsgStore.sessMap();
      for (var j in newMsgList) {//遍历新消息
        newMsg = newMsgList[j];
        if (newMsg.getSession().id() == selToID) {//为当前聊天对象的消息
          selSess = newMsg.getSession();
          //在聊天窗体中新增一条消息
          //console.warn(newMsg);
          addMsg(newMsg);
        }
      }
      //消息已读上报，以及设置会话自动已读标记
      webim.setAutoRead(selSess, true, true);
      for (var i in sessMap) {
        sess = sessMap[i];
        if (selToID != sess.id()) {//更新其他聊天对象的未读消息数
          // updateSessDiv(sess.type(), sess.id(), sess.unread());
        }
      }

	},
};

function sendMsg (msgContent, id) {
	var isSend = true; //是否为自己发送
    var seq = -1; //消息序列，-1表示sdk自动生成，用于去重
    var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
    var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
    var subType = webim.C2C_MSG_SUB_TYPE.COMMON; //消息子类型
	
	
	var selType = webim.SESSION_TYPE.C2C;
	var selToID = id
	
	var selSess = new webim.Session(selType, selToID, selToID, '', Math.round(new Date().getTime() / 1000));
	var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, config.identifier, subType, '');
	console.log(msgContent);

	var text_obj = new webim.Msg.Elem.Text(msgContent);
	msg.addText(text_obj);

    addMsg(msg);

	webim.sendMsg(msg, function(resp) {
        webim.Log.info("发消息成功", resp);
    }, function(err) {
        webim.Log.error("发消息失败:" + err.ErrorInfo);
        console.error("发消息失败:" + err.ErrorInfo);
    });
}

function getMsg () {
	
		var sessMap = webim.MsgStore.sessMap();
	console.log(sessMap);
	
	webim.syncMsgs(message => {
				console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
		
		console.log(message)
				console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
		
	});
	
	webim.getRecentContactList({
    'Count': 10 //最近的会话数 ,最大为 100
},function(resp){
					console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
	
	console.log(resp)
					console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
	
    //业务处理
},function(resp){
    //错误回调
});
}


function login(){
    
    if( !hasLogin ){
        webim.login(config, listeners,{}, function(){
            hasLogin = true;
        });
    }
}



module.exports = {
    login : login,
    sendImageMsg : sendImageMsg,
    sendAudioMsg : sendAudioMsg,
	sendMsg,
	getMsg,
};