// 名圈
import {wrapNoFixParamsPost, wrapPost, wrapProductNoFixParamsPost, wrapProductPost} from './base/request';
import config from "../config";

const HOST = config.API_HOST + '/cardcircle-service';
const PORT = 8190;
let post = (url, params) => wrapProductPost(HOST, url, params);
let noFixParamsPost = (url, params) => wrapProductNoFixParamsPost(HOST, url, params);

if (config.DEV) {
  post = (url, params) => wrapPost(PORT, url, params);
  noFixParamsPost = (url, params) => wrapNoFixParamsPost(PORT, url, params);
}

const api = {};
export default api;

api.listUserCircle = (pageNo) => post('circle/listUserCircle', { pageNo });
api.searchCardCircle = (text, pageNo) => post('circle/searchCardCircle', { text, pageNo });
api.searchUserCardCircle = (text, pageNo) => post('circle/searchUserCardCircle', { text, pageNo });
api.getCardCircleDetail = (circleId) => post('circle/getCardCircleDetail', { circleId });
api.setJoinCircleApply = (circleId, applyContent, importUserId) => post('circle/setJoinCircleApply', { circleId, applyContent, importUserId });
api.joinNewCardCircle = (circleId, importUserId) => post('circle/joinNewCardCircle', { circleId, importUserId });

api.cancelExtensionCourse = (circleId,courseId) => post('course/cancelExtensionCourse', { circleId,courseId });//取消课程推荐

api.getUserCardCircleList = (pageNo,title) => post('circle/getUserCardCircleList', { pageNo, title }); //群聊列表

api.searchCardCircleList = (pageNo,title) => post('circle/searchCardCircleList', { pageNo, title }); //搜索群聊列表

api.joinCardCircleInfo = (cardCircleId) => post('circle/joinCardCircleInfo', {cardCircleId}); //加入群聊详情

api.getCardCircleInfo = (cardCircleId) => post('circle/getCardCircleInfo', {cardCircleId}); //群聊详情

api.getMessageShopInfo = (circleId,shopId) => post('circleMessage/getMessageShopInfo', {circleId,shopId}); //获取店铺详情



api.secedeCardCircle = (circleId) => post('circle/secedeCardCircle', { circleId }); 
api.listJoinType = () => post('circle/listJoinType');
api.setNewCardCircle = (circleName, joinType, joinMoney,percent) => post('circle/setNewCardCircle', { circleName, joinType, joinMoney,percent});
api.listCircleType = () => post('circle/listCircleType');
api.updateCardCircleDetail = (cardCircleDetail) => post('circle/updateCardCircleDetail', cardCircleDetail);
api.transferCardCircleManger = (circleId, managerUserId) => post('circle/updateCardCircleDetail', { circleId, managerUserId });

api.listCircleMember = (circleId,type,pageNo) => post('circle/listCircleMember', { circleId,type,pageNo });
api.myPermission = (circleId) => post('circle/me', { circleId });

api.searchCircleMember = (circleId, text, pageNo) => post('circle/searchCircleMember', { circleId, text, pageNo });

api.moveCircleMember = (circleId, uids, moveStatus = 1) => post('circle/moveCircleMember', { circleId, uids, moveStatus });
api.setAdministrators = (circleId, uids) => post('circle/setAdministrators', { circleId, uids });
api.relieveAdministrators = (circleId, uids) => post('circle/relieveAdministrators', { circleId, uids });

api.getCircleManagerList = (cardCircleId) => post('circle/getCircleManagerList', {cardCircleId});



api.listCircleApply = (circleId, status, pageNo) => post('circle/listCircleApply', { circleId, status, pageNo });
api.agreeCircleApply = (circleId, applyId) => post('circle/agreeCircleApply', { circleId, applyId });
api.refuseCircleApply = (circleId, applyId) => post('circle/refuseCircleApply', { circleId, applyId });
api.listComplainType = () => post('circle/listComplainType');
api.setCircleComplainApply = (circleId, complainType, complainContent, images) => post('circle/setCircleComplainApply', { circleId, complainType, complainContent, images });
api.setMemberComplainApply = (circleId, complainUserId, complainType, complainContent, images) => post('circle/setMemberComplainApply', { circleId, complainUserId, complainType, complainContent, images });
// api.setCircleComplainApply = (managerId, pageNo) => post('circle/setCircleComplainApply', { managerId, pageNo });
api.getMemberComplainDetail = (complainId) => post('circle/getMemberComplainDetail', { complainId });
api.deleteCircle = (circleId) => post('circle/deleteCircle', { circleId });
api.listCircleTopic = (circleId, pageNo) => post('topic/listCircleTopic', { circleId, pageNo });
api.setNewTopic = (circleId, title, content, images) => post('topic/setNewTopic', { circleId, title, content, images });
api.getTopicDetail = (topicId) => post('topic/getTopicDetail', { topicId });
api.setTopicComment = (topicId, content) => post('topic/setTopicComment', { topicId, content });
api.setTopicCommentReply = (commentId, content, replyType, toUserId, replyId) => post('topic/setCommentReply', { commentId, content, replyType, toUserId, replyId });
api.listTopicComment = (topicId, pageNo) => post('topic/listTopicComment', { topicId, pageNo });
api.getTopicComment = (commentId, pageNo) => post('topic/getTopicComment', { commentId, pageNo });
api.deleteTopic = (topicId) => post('topic/deleteTopic', { topicId });
api.deleteTopicComment = (commentId) => post('topic/deleteTopicComment', { commentId });
api.deleteTopicCommentReply = (replyId) => post('topic/deleteCommentReply', { replyId });

api.listCircleComplain = (managerId, pageNo) => post('circle/listMemberComplain', { managerId, pageNo })
api.deleteMemberComplain = (complainId) => post('circle/deleteMemberComplain', { complainId });

// //保存语音
// api.saveUserVoice = (voiceInfo) => post('voice/saveUserVoice', {voiceInfo});
// //发送语音
// api.sendVoiceCircle = (circleId,voiceList) => post('voice/sendVoiceCircle', {circleId,voiceList});
// //用户语音列表
// api.myVoiceList = (pageNo=1) => post('voice/myVoiceList', {pageNo});
// //圈子语音列表 
// api.circleVoiceList = (circleId,pageNo=1) => post('voice/circleVoiceList', {circleId, pageNo});
// //置顶
// api.voiceSort = (voiceId) => post('voice/voiceSort', {voiceId});
//禁言
api.alterShutupStatus = (circleId) => post('circle/alterShutupStatus', {circleId});
// //修改标题
// api.voiceTitle = (title,voiceId) => post('voice/voiceTitle', {title,voiceId});
// //删除
// api.deleteMyVoice = (voiceIds) => post('voice/deleteMyVoice', {voiceIds});
//删除圈子语音
api.deleteCircleVoice = (circleId,voiceId) => post('voice/deleteCircleVoice', {circleId,voiceId});
//发送消息
api.sendMessage = (circleId,content,time,type) => post('circleMessage/saveCircleUserMessage', {circleId,content,time,type});
//消息列表
api.messageList = (circleId,pageNo) => post('circleMessage/circleMessageList', {circleId,pageNo});
//删除消息
api.deleteCircleMessage = (circleId,messageId) => post('circleMessage/deleteCircleMessage', {circleId,messageId});
//转发消息
api.transmitCircleUserMessage = (circleId,messageId) => post('circleMessage/transmitCircleUserMessage', {circleId,messageId});


//获取打赏人数
api.getCourseRewardUserList = (type,courseId) => post('course/getCourseRewardUserList', {courseId,type});
//课程列表
api.getCourseList = (circleId,pageNo) => post('course/getCourseList', {circleId,pageNo});
//新增课程
api.addCourse = (circleId,name,describe,coverUrl,nodes) => post('course/addCourse', {circleId,name,describe,coverUrl,nodes});
//编辑课程
api.editCourse = (courseId,name,describe,coverUrl,nodes) => post('course/editCourse', {courseId,name,describe,coverUrl,nodes});
//课程详情
api.getCourseInfo = (courseId) => post('course/getCourseInfo', {courseId});
//删除课程
api.delCourse = (courseId) => post('course/delCourse', {courseId});
//设置推广
api.setExtensionCourse = (circleId,courseId) => post('course/setExtensionCourse', {circleId,courseId});
//评论列表
api.saveCourseComment = (content,courseId,callUserId=null,start=5) => post('course/saveCourseComment', {content,courseId,callUserId,start});
api.delCourseComment = (id) => post('course/delCourseComment', {id});
api.getCourseCommentList = (courseId,pageNo) => post('course/getCourseCommentList', {courseId,pageNo});
