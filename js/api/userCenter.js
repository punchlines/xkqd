// 用户
import config from '../config'
import { wrapPost, wrapNoFixParamsPost, wrapProductPost, wrapProductNoFixParamsPost } from './base/request';
import {signApi} from "../util";

const HOST = config.API_HOST + '/usercenter-service';
const PORT = 8192;
let post = (url, params) => wrapProductPost(HOST, url, params);
let post2 = (url, params) => wrapProductPost(HOST, url, params);

//let post3 = (url, params) => wrapProductPost(config.API_HOST + '/apemoon-order', url, params);

let noFixParamsPost = (url, params) => wrapProductNoFixParamsPost(HOST, url, params);

if (config.DEV) {
  post = (url, params) => wrapPost(PORT, url, params);
  post2 = (url, params) => wrapPost(PORT, url, params, config.HOST2);
  noFixParamsPost = (url, params) => wrapNoFixParamsPost(PORT, url, params);
}


const api = {};
export default api;

api.exportUploadUrl = HOST + '/qcloud/uploadFile'
if (config.DEV) {
  api.exportUploadUrl = config.HOST + ':' + PORT + '/qcloud/uploadFile'
}

api.register = (form) => noFixParamsPost('user/register', form);
api.login = (phone) => post('user/login', {phone});
api.GetUserId = (code) => post('user/xcxlogin', { code });
api.appLogin = (phone,code) => post('user/applogin', { phone,code });


api.updateUserPosition = (longitude, latitude) => post('user/updateUserPosition', { longitude, latitude });
api.getListSmsCountry = () => post('common/listSmsCountry');//区号
api.searchSmsCountry = (text) => post('common/searchSmsCountry', { text });

api.updateLastLoginTime = () => post('common/updateLastLoginTime', {});//更新上次登录时间

api.getUserCardDetails=(cardUserId) => post('card/getUserCardDetails',{cardUserId});
api.getUserCardDetails2=(cardUserId) => post('card/getUserCardDetails',{cardUserId});

api.getUserCardShowVideo=(cardUserId,shopId)=>post('card/getUserCardShowVideo',{cardUserId,shopId})
api.listMyCardWallet=(status,pageNo) =>post('card/listMyCardWallet',{status,pageNo});
api.listTopImportCard=(pageNo,longitude,latitude) =>post('card/listTopImportCard',{pageNo,longitude,latitude});
api.searchTopImportCard=(pageNo,text,longitude,latitude) =>post('card/searchTopImportCard',{pageNo,text,longitude,latitude});
api.listNearbyCard=(pageNo,longitude,latitude) =>post('card/listNearbyCard',{pageNo,longitude,latitude});
api.searchNearbyCard=(pageNo,text,longitude,latitude) =>post('card/searchNearbyCard',{pageNo,text,longitude,latitude});
api.insertPendingCard=(cardUserId) => post('card/insertPendingCard',{cardUserId});
api.deletePendingCard=(cardUserId) => post('card/deletePendingCard',{cardUserId});

api.getUserCoreInfo=()=> post('user/getUserCoreInfo')//个人中心详情信息
api.setUserReceivablesAccount=(type)=> post('user/setUserReceivablesAccount',{type})//设置用户收款账户
api.getUserInfor=(cardUserId) => post('card/getUserCardDetails',{cardUserId});//个人中心名片信息

api.getUserJoinShop=(pageNo=1) => post('user/getUserJoinShop',{pageNo});//获取用户加入的店铺信息

api.myCollect=(type,pageNo)=>post('user/listMyCollectRecord',{type,pageNo});//我的收藏
api.myCustomer=(pageNo=1,key)=>post('card/listMyCustomer',{pageNo,key});//我的客户
api.setPassward=(password)=>post('user/setPassword',{password});//设置密码
api.settingStatusSt=(strangerStatus)=>post('user/updateUserStatus',{strangerStatus});//设置按钮更新状态3个
api.SettingStatusPh=(phoneStatus)=>post('user/updateUserStatus',{phoneStatus});
api.SettingStatusPl=(playStatus)=>post('user/updateUserStatus',{playStatus});
api.SettingStatusLog=(logStatus)=>post('user/updateUserStatus',{logStatus});
api.checkPassword=()=>post('user/getCountRecord',{});//检查是否设置了密码
api.testUpPassword=(password)=>post('user/checkPassword',{password});//检验密码
api.insertSuggestion=(content)=>post('user/insertSuggestion',{content});//意见反馈
api.listGainRecord=(pageNo=1)=>post('user/listGainRecord',{pageNo});//我的提成  5
api.getCountRecord=()=>post('user/getCountRecord',{});//获取提成、订单、客户总数
api.listMyImportUser=(pageNo=1,key)=>post('user/listMyImportUser',{pageNo,key});//我的人气
api.insertEmployApplication3=(shopId,groupId)=>post('employ/insertEmployApplication',{shopId,groupId});//vip3提交员工申请
api.insertEmployApplication2=(shopId)=>post('employ/insertEmployApplication',{shopId});//vip2提交员工申请

// 钱包
api.getRemainMoney = () => post('remain/remainMoney')
api.getIncomeMoney = () => post('remain/incomeMoney')
api.getBankList = (pageNo = 1) => post('bankcard/bankCardList', { pageNo });
api.addBankCard = (card) => post('bankcard/addBankCard', card);
api.getBankCode = () => post('bankcard/getBankCode');
api.removeBankCard = (bankCardId) => post('bankcard/deleteBankCard', { bankCardId });
api.withdrawCashes = (money, cardNum,cardId,account) => post('remain/withdrawCashes', { money, cardNum ,cardId,account});
api.getRemainCashFlow = (pageNumber) => post('remain/remainCashFlow', { pageNumber });
api.getMyInviteVipList = (pageNo) => post('user/listMyInviteVip', { pageNo });
api.getMyFansList = (pageNo,pageSize=20) => post('user/listMyFan', { pageNo,pageSize});
api.saveGuestRecord = (visitId, openId, nickName, image) => post('card/guestRecord', { visitId, openId, nickName, image });

api.unavailableMoney = () => post('remain/unavailableMoney');//直播余额

api.WXDecrypt=(encryptedData,iv,token)=>post('common/WXDecrypt',{encryptedData,iv,token});//手机号码解密
api.sendSms=(phone,type)=>noFixParamsPost('common/sendSms',{phone,type});//发送手机验证码
api.sendSmsChangePhone=(phone,type)=>post('common/sendSms',{phone,type});//解绑手机号码
api.updatePhone=(phone)=>post('user/updatePhone',{phone});//修改手机号码


api.listEmployee=(shopId,groupId,pageNo=1)=>post('employ/listEmployee',{shopId,groupId,pageNo});//获取组员列表（销售总监）
api.listAllEmployee=(shopId,pageNo=1)=>post('employ/listAllEmployee',{shopId,pageNo});//获取员工列表（vip）
api.getIfHaveGroup=()=>post('employ/getIfHaveGroup',{});//判断销售总监是否已经创建小组
api.setGroupManager=(userId)=>post('employ/setGroupManager',{uid:userId});//设置销售总监
api.unbind=(relevanceUserId)=>post('employ/unbind',{relevanceUserId});//解除合约（上级对下级）
api.praise=(relevanceId,type,formId)=>post('common/praise',{relevanceId,type,formId});//点赞/取消点赞
api.share=(relevanceId,type)=>post('common/share',{relevanceId,type});//分享
api.sortAllEmployeeList=(shopId,pageNo=1,sortType,sortKey)=>post('employ/sortAllEmployeeList',{shopId,pageNo,sortType,sortKey});//员工列表排序（vip）
api.listEmployeeApplication=(shopId,groupId,pageNo=1)=>post('employ/listEmployeeApplication',{shopId,groupId,pageNo});//获取员工审核申请列表
api.sortEmployeeList=(shopId,groupId,pageNo=1,sortType,sortKey)=>post('employ/sortEmployeeList',{shopId,groupId,pageNo,sortType,sortKey});//组员列表排序（销售总监）
api.refuseApplication=(shopId,groupId,employeeUserId,managerId)=>noFixParamsPost('employ/refuseApplication',{shopId,groupId,employeeUserId,managerId});//拒绝员工/组员申请
api.agreeApplication=(shopId,groupId,employeeUserId,managerId,joinNum)=>noFixParamsPost('employ/agreeApplication',{shopId,groupId,employeeUserId,managerId,joinNum});//同意员工申请

api.searchSmsCountry=(text)=>noFixParamsPost('common/searchSmsCountry',{text});//搜索国际区号列表


// card/updateUserCard
api.updateUserCard=(data)=>post('card/updateUserCard', data);

// 获取openid
api.getOpenId=(code)=>noFixParamsPost('user/getOpenId',{code});
// 点击收藏
api.collect=(userId,relevanceId,type)=>noFixParamsPost('common/collect',{userId,relevanceId,type});

// 回递名片 card/giveCard
api.giveCard=(cardUserId,userId)=>noFixParamsPost('card/giveCard',{cardUserId,userId});

// 搜索我的顾客 /card/searchMyCustomer
api.searchMyCustomer=(userId,pageNo,text)=>noFixParamsPost('card/searchMyCustomer',{userId,pageNo,text});

// 我的周报
api.getReportDetails=()=>post('report/getReportDetails');

//获取我的销售数据
api.getSalesReport=(startTime, endTime)=>post('report/getSalesReport',{ startTime,endTime });

// 获取我的销售数据客户数据
api.getImportUserReport=(startTime,endTime)=>post('report/getImportUserReport',{startTime,endTime});

// 周报排行榜
api.getReportRanking=()=>post('report/getReportRanking');

//获取视屏列表
api.listVideoRecord=(type,pageNo)=>post('card/listVideoRecord',{type,pageNo});

// 保存用户名片展示视频信息
api.setUserCardShowVideo=(videoUrl,videoImage,videoType,videoTime, fileId)=>post('card/setUserCardShowVideo',{videoUrl,videoImage,videoType,videoTime, fileId});

//更新用户视频信息
api.updateVideo=(videoId, videoUrl,videoImage,videoType,videoTime,shopId)=>post('card/updateVideo',{videoId, videoUrl,videoImage,videoType,videoTime,shopId});

//删除展示视频
api.deleteVideo=(videoId)=>post('card/deleteVideo',{videoId});

//获取用户开通/续费/升级VIP付款记录
api.getUserVipOrderList=(pageNo)=>post('user/getUserVipOrderList',{pageNo});

api.unbindBySubordinate=()=>post('employ/unbindBySubordinate');//解绑企业（下级）

// 模拟支付 /pay/imitatePay
api.imitatePay=(outTradeNo,orderType)=>noFixParamsPost('pay/imitatePay',{outTradeNo,orderType});

api.imitatePayNotice=(outTradeNo)=>noFixParamsPost('pay/imitatePayNotice',{outTradeNo});

//开通VIP
api.insertVipOrder=(grade,money)=>post('user/insertVipOrder',{grade,money});


//更新用户在线时长  common/updateUserOnlineTime
api.updateUserOnlineTime=(time)=>post('user/updateUserOnlineTime',{time});

//获取系统消息
api.listSystemMessage=(pageNo)=>post('user/listSystemMessage',{pageNo});

//获取未读消息数量
api.getSystemMessageCount=()=>post('user/getSystemMessageCount',{});


api.getDataDisplay = () => post('user/getDataDisplay');//商品物流信息

api.viewCard = (cardUserId) => post('card/addViewCount', { cardUserId });


api.listJournalType = () => post('journal/listJournalType');
api.listUserJournal = (cardUserId, pageNo = 1) => post('journal/listUserJournal', { cardUserId, pageNo });
api.setNewJournal = (journal) => post('journal/setNewJournal', journal);
api.setJournalComment = (journalId, content) => post('journal/setJournalComment', { journalId, content })
api.listJournalComment = (journalId, pageNo) => post('journal/listJournalComment', { journalId, pageNo })
api.setCommentReply = (commentId, content, replyType, toUserId, replyId) => post('journal/setCommentReply', { commentId, content, replyType, toUserId, replyId })
api.getUserJournal = (journalId) => post('journal/getUserJournal', { journalId })
api.getJournalComment = (commentId, pageNo = 1) => post('journal/getJournalComment', { commentId, pageNo })
api.deleteUserJournal = (journalId) => post('journal/deleteUserJournal', { journalId })
api.deleteJournalComment = (commentId) => post('journal/deleteJournalComment', { commentId })
api.deleteCommentReply = (replyId) => post('journal/deleteCommentReply', { replyId })

api.updateJournalStatus = (journalType) => post('journal/updateJournalStatus', { journalType}) //更新日志隐私状态

api.getUploadSign = () => post('qcloud/getUploadSign')
api.getCOSSTS = () => post('qcloud/getCOSSTS')
api.sendIntroMsgByServe = (fromAccount, toAccount) => post('qcloud/sendMsg', { fromAccount, toAccount })

api.getShareQRCodeUrl = () => post('weixin/getWXCodeUrl');
//生成圈子二维码
api.getCirCleQRCodeUrl = (circleId) => post('weixin/getWXCodeUrlLimitless', { circleId });


api.listJournalType = () => noFixParamsPost('journal/listJournalType');//获取日志分类列表
api.listJournalByType = (journalTypeId,pageNo=1) => post('journal/listJournalByType',{journalTypeId,pageNo});//根据类型获取日志（动态）列表
api.listComplainType = () => noFixParamsPost('journal/listComplainType');//获取动态举报类型列表
api.setJournalComplainApply = (journalId,complainType) => noFixParamsPost('journal/setJournalComplainApply',{journalId,complainType});//举报动态（提交举报申请）

api.getMessage = (type,pageNo, latitude, longitude) => post2('discovery/getMessage',{type,pageNo, latitude, longitude});//用户发现(推荐…)接口 1.推荐 2.附件 3.收藏
api.getJournalWXCodeUrlLimitless = (journalId) => noFixParamsPost('weixin/getJournalWXCodeUrlLimitless',{journalId});
api.getShopDetailsWXCodeUrlLimitless = (shopId, userId) => post('weixin/getShopDetailsWXCodeUrlLimitless', { shopId, userId })
api.getVipInviteWXCodeUrlLimitless = (vipLevel) => post('weixin/getVipInviteWXCodeUrlLimitless', { vipLevel })

api.getShopWXCodeUrlLimitless = (qrCodeFrom,shopId) => post('weixin/getShopWXCodeUrlLimitless',{qrCodeFrom,shopId});

api.getTLSSig = () => post('qcloud/getUsersig')
api.getTLSSigByOpenId = (userId) => post('qcloud/getUsersig', { userId })

// 快捷回复
api.setQuickMessage = (content) => post('im/setQuickMessage', { content })
api.listQuickMessage = (pageNo = 1) => post('im/listQuickMessage', { pageNo })
api.updateQuickMessage = (messageId, content) => post('im/updateQuickMessage', { messageId, content })
api.deleteQuickMessage = (messageId) => post('im/deleteQuickMessage', { messageId })
api.pushUpQuickMessage = (messageId) => post('im/pushUpQuickMessage', { messageId })

// 消息
api.getSystemMessagePage = () => post('user/getSystemMessagePage')
api.listOrbit = (pageNo) => post('user/listOrbit', { pageNo })
api.saveCID = (cid) => post('user/setUserCid', { cid })

// 财富轮盘
api.ListLotteryPrize = () => post('lottery/listLotteryPrize',);
api.getUserLotteryDetail = () => post('lottery/getUserLotteryDetail',);
api.getLotteryPrize = () => post('lottery/getLotteryPrize');
api.addLotteryNum = () => post('lottery/addLotteryNum');

// 导入导出通讯录
api.addAddressBook = (addressBookList) => post('card/addAddressBook', { addressBookList });

api.getInviteProgress = () => post('user/inviteProgress');
api.pullKeyWord = () => post('common/pullKeyWord');
api.getSwVersion = () => post('common/swVersion');
//获取是否注册店铺
// api.getShopInfoIsReg = ()=> post('user/me');
//资金记录
api.getTransactionRecord = (type,pageNo)=> post('remain/getTransactionRecord',{type,pageNo});
//注册子商户
api.registerPersonalMerchant = (data)=> post('user/registerPersonalMerchant',{...data});
//注册企业商户
api.registerBusinessMerchant = (data)=> post('user/registerBusinessMerchant',{...data});

//添加图片
api.addMerchantImg = (picType,images)=> post('user/addMerchantImg',{picType,images});

//im消息推送
api.imReplyNotice = (receiveUserId,content)=> post('user/imReplyNotice',{receiveUserId,content});

import COS from '../lib/cos.js';
var cos = new COS((callback) => {
  api.getCOSSTS().then(result => {
    callback(JSON.parse(result), null)
  }).catch(error => {
    callback(null, error)
  })
});

api.uploadFile = (path, successCallback, failCallback, completeCallback) => {
  wx.getFileInfo({
    filePath: path,
    success (res) {
      if (res.size > 10 * 1024 * 1024) {
        uni.showModal({
          title: '提示',
          content: '图片大小不能大于 3MB',
          showCancel: false
        });
        uni.hideLoading()
        return;
      }

      cos.uploadFile(path).then(url => {
        setTimeout(() => {
          if (successCallback) successCallback(url.replace('https://card-1254165941.cos.ap-guangzhou.myqcloud.com/', 'https://card-1254165941.picgz.myqcloud.com/'))
          if (completeCallback) completeCallback()
          uni.hideLoading()
        }, 1000);

      }).catch(error => {
        if (failCallback) failCallback(error);
        if (completeCallback) completeCallback()
        uni.hideLoading()
      });

    }
  })
}
