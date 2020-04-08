// 商品
import config from '../config'
import { wrapPost, wrapNoFixParamsPost, wrapProductPost, wrapProductNoFixParamsPost } from './base/request';

const HOST = config.API_HOST + '/apemoon-goods';
const PORT = 8094;
let post = (url, params) => wrapProductPost(HOST, url, params);
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