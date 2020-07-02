// 商品
import config from '../config'
import { wrapPost, wrapNoFixParamsPost, wrapProductPost, wrapProductNoFixParamsPost } from './base/request';

const HOST = config.API_HOST + '/apemoon-goods';
const HOSTS = config.API_HOST + '/live-service';
const PORT = 8094;
let post = (url, params) => wrapProductPost(HOST, url, params);
let posts = (url, params) => wrapProductPost(HOSTS, url, params);
let noFixParamsPost = (url, params) => wrapProductNoFixParamsPost(HOST, url, params);

if (config.DEV) {
  post = (url, params) => wrapPost(PORT, url, params);
  noFixParamsPost = (url, params) => wrapNoFixParamsPost(PORT, url, params);
}

const api = {};
export default api;

api.listMyShopGoods = (shopId,status,pageNo,type=null) => post('goods/listMyShopGoods',{shopId,status,pageNo,type});
api.getShopGoodsClassify = (shopId) => post('goods/listShopGoodsClassify', { shopId });
api.getShopGoodsByClassifyId = (shopId, classifyId, isParent, pageNo) => post('goods/listShopGoodsByClassifyId', { shopId, classifyId, isParent, pageNo });
api.searchShopGoods = (shopId, text, pageNo = 1) => post('goods/searchShopGoods', { shopId, text, pageNo });
api.getGoodsDetail = (goodsId) => post('goods/getGoodsDetail', { goodsId });
api.getGoodsAppraise = (goodsId, pageNo = 1) => noFixParamsPost('goods/listGoodsAppraise', { goodsId, pageNo });
api.replyGoodsAppraise = (appraiseId, replyContent) => post('goods/setGoodsAppraiseReply', { appraiseId, replyContent });

api.openLive = (liveId,cover, recommendGoods,relatedGoods,latitude,title,longitude) => posts('live/openLive', { liveId,cover, recommendGoods,relatedGoods,latitude,title,longitude });

api.getLiveList = (type,toPage,longitude,latitude) => posts('live/getLiveList', {type,toPage,longitude,latitude});//获取直播列表

api.readyLive = (liveId) => posts('live/readyLive',{liveId});//获取直播间详情

api.endLive = (liveId) => posts('live/endLive',{liveId});//退出直播间

api.updateLiveLikeAndWatch = (liveId,watchNum,likeNum) => posts('live/updateLiveLikeAndWatch',{liveId,watchNum,likeNum});//更新直播点赞及观看人数

api.updateLiveInfo = (liveId,relatedGoods,recommendGoods) => posts('live/updateLiveInfo',{liveId,relatedGoods,recommendGoods});//更新直播详细信息

api.updateLiveInfos = (liveId,recommendGoods) => posts('live/updateLiveInfo',{liveId,recommendGoods});//更新直播详细信息

api.getLiveDataInfo = (liveId) => posts('live/getLiveDataInfo',{liveId});//准备直播



api.attentionAnchor = (liveId,anchorUserId) => posts('live/attentionAnchor',{liveId,anchorUserId});//关注主播

api.getReportTypeList = (liveId,anchorUserId) => posts('live/getReportTypeList',{liveId,anchorUserId});//获取举报列表

api.reportAnchor = (liveId,anchorUserId,typeId,content,imgs) => posts('live/reportAnchor',{liveId,anchorUserId,typeId,content,imgs});//举报主播

api.cancelAttentionAnchor = (liveId,anchorUserId) => posts('live/cancelAttentionAnchor',{liveId,anchorUserId});//取关主播

api.liveHistoryList = (toPage) => posts('live/liveHistoryList',{toPage});//直播历史记录

api.searchGoods = (key, pageNo = 1) => post('goods/searchGoods', { key, pageNo });//搜索平台商品

api.setShopRecommend = (goodsId,type) => post('goods/setShopRecommend',{goodsId,type});
api.setGoodsStatus = (goodsId,status,type) => post('goods/setGoodsStatus',{goodsId,status,type});
api.deleteGoods = (goodsId) => post('goods/deleteGoods',{goodsId});

api.listGoodsClassify = (pageNo) => post('goods/listGoodsClassify',{pageNo});
//获取一级分类
api.parentClassify = () => post('goods/parentclassify',{});
//获取二级分类
api.childClassify = (id) => post('goods/childclassify',{id});

api.listShopRecommendGoods = (shopId,pageNo=1) => post('goods/listShopRecommendGoods',{shopId,pageNo});//获取店主推荐商品列表
api.getGoodsSku = (goodsId) => post('goods/getGoodsSku',{goodsId});//获取商品sku基本信息（商品规格弹框）

//发布商品-获取服务列表
api.listGoodsService = () => post('goods/listGoodsService');

//发布商品
api.setNewGoods = (data) => post('goods/setNewGoods',data);
api.updateGoods = (data) => post('goods/updateGoods',data);

// 获取推荐商品
api.listRecommendGoods = (shopId, pageNo) => post('goods/listRecommendGoods', { shopId, pageNo });
api.setUninterestedGoods = (goodsId) => post('goods/setUninterestedGoods', { goodsId });

api.getLookGoodsNum = (goodsId) => post('goods/getLookGoodsNum',{goodsId});//点击商品,记录浏览的次数
api.getVipGoods = (vipLevel , pageNo = 1, pageSize=50) => post('goods/getVipGift', { vipLevel , pageNo,pageSize }); // vip赠品
//商品评价
api.judgeGoods =  (itemId,shopId,score,content,images) => post('appraise/judgeGoods',{itemId,shopId,score,content,images});
//查看订单的商品的评论
api.queryGoodsAppraise = (itemId) => post('appraise/queryGoodsAppraise', {itemId});
//商家回复评论
api.replyGoodsAppraise = (content,itemId) => post('appraise/replyGoodsAppraise', {content,itemId});
api.updateSku = (goodsId,skus) => post('goods/modify', {goodsId,skus});
//更新商品描述
api.updateDetails = (goodsId,desc) => post('goods/updateGoodsDesc', {goodsId,desc});