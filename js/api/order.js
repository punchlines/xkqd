 // 订单
import config from '../config'
import { wrapPost,wrapNoFixParamsPost, wrapProductPost, wrapProductNoFixParamsPost } from './base/request';

const HOST = config.API_HOST + '/order';
const PORT = 8096;
//TODO
//HOST = 'http://192.168.254.115:6908';

let post = (url, params) => wrapProductPost(HOST, url, params);
let noFixParamsPost2 = (url, params) => wrapProductNoFixParamsPost(HOST, url, params);

if (config.DEV) {
  post = (url, params) => wrapPost(PORT, url, params, config.HOST2);
  noFixParamsPost2 = (url, params) => wrapNoFixParamsPost(PORT, url, params, config.HOST2);
}

const api = {};
export default api;

api.getInvoiceMessage = (type) =>post('invoice/getInvoiceMessage',{type});//发票管理
api.getInvoiceDetail = (orderId) =>post('invoice/getInvoiceDetail',{orderId});//发票详情
api.openInvoiceMessage = (form) =>post('invoice/openInvoiceMessage',form);//开发票
api.getAddressList = (pageNo = 1) => post('address/get', { pageNo });
api.deleteAddress = (id) => post('address/del', { id });
api.addOrUpdateAddress = (addressForm) => post('address/save', addressForm);

api.saveLiveDepositOrder = () => post('pay/saveLiveDepositOrder');//直播押金

//查询所有订单/待发货/待收货
api.getAllOrderData = (type,pageNo=1) => post('ugo/orderlist',{type,pageNo});
///评价/
///ugo/waitappraise
api.getWaitAppraise = (pageNo=1) => post('ugo/waitappraise',{pageNo});

api.getUserGoodsOrderList=(pageNo=1)=>post('ugo/getUserGoodsOrderList',{pageNo});//获取用户已购买过的商品列表

//直播间下单
api.saveLiveGoodsOrder = (msgs,payType,openId,items,addressId,liveId,anchorId) => post('pay/saveLiveGoodsOrder',{msgs,payType,openId,items,addressId,liveId,anchorId});
//直播间拼团下单
api.saveLivePinOrder = (msgs,openId,items,addressId,pinId,liveId,anchorId) => post('pay/saveLivePinOrder',{msgs,openId,items,addressId,pinId,liveId,anchorId});

//商品下单
// api.createOrder = (shareUserId,userAddressId,orderJson,type, cod = 0) => post('orderCenter/createOrder',{shareUserId,userAddressId,orderJson,type, cod});
//api.createOrder = (userAddressId,orderJson, cod = 0) => post('orderCenter/createOrderPlus',{ userAddressId, orderJson, cod});
api.createOrder = (addressId,items,msgs={},payType=0) => post('pay/ordergoods',{ addressId, items, msgs,payType});

//付费名片圈下单
api.insertCircleOrder = (circleId, importUserId) => post('pay/ordergroup', { circleId, importUserId });

//检测订单
api.paymentStatusCallback  = (orderNum, type,pinId=null,groupId=null) => post('pay/paymentStatusCallback', { orderNum, type,pinId,groupId});
api.sendOrderDetail = (orderId) => post('orderCenter/sendOrderDetail', {orderId});//待发货详情

//会员续费
api.saveUpgradeOrRenewVipOrder = (type,grade) => post('pay/saveUpgradeOrRenewVipOrder', {type,grade});
//微信支付
api.callwechatpay = (outTradeNo,openId,authCode,sour) => post('pay/callwechatpay', {outTradeNo,openId,authCode,sour});

api.getLiveIncome = (anchorUserId) => post('live/getLiveIncome',{anchorUserId});//获取直播总收益	

api.judgeOrderDetail = (orderId) => post('orderCenter/judgeOrderDetail', {orderId});//待评价详情

api.saleGoodsStatus = (type,pageNumber=1,pageSize=20) => post('orderCenter/saleGoodsStatus', {type,pageNumber,pageSize});//销售订单( type:类型:(1.待发货 2待收货 4待评价))
api.saleAllStatus = (pageNumber=1,pageSize=20) => post('orderCenter/saleAllStatus',{pageNumber,pageSize});//显示全部的销售的订单
api.saleBankStatus = (type,pageNumber=1,pageSize=20) => post('orderCenter/saleBankStatus', {type,pageNumber,pageSize});//销售订单的退货/售后
api.sendSaleOrderDetail = (orderId) => post('orderCenter/sendSaleOrderDetail', {orderId});//销售待发货详情
api.receiveSaleOrderDetail = (orderId) => post('orderCenter/receiveSaleOrderDetail', {orderId});//销售待收货详情


api.sendSaleGoodsOrderDetail = (take=0,orderId,flowNum,logisticsCompany) => post('orderCenter/sendSaleGoodsOrderDetail', {flowNum,orderId,logisticsCompany,take});//销售订单发货
api.judgeSaleOrderDetail = (orderId) => post('orderCenter/judgeSaleOrderDetail', {orderId});//销售评价详情




api.queryLogistics = (orderId) => noFixParamsPost2('logistics/queryLogistics', {orderId});//查询物流公司编号单号
api.getLogisticsCode = (companyCode) => noFixParamsPost2('logistics/getLogisticsCode', {companyCode});//查询物流公司的名称

api.getLogistics = (orderId) => noFixParamsPost2('con/expinfo', {orderId});//商品物流信息


api.getLogisticsMessage = (pageNumber=1) => noFixParamsPost2('con/expcomlist',{pageNo:pageNumber});//显示物流公司的名称和编码
// api.getOrderCompanyCode = (orderId) => noFixParamsPost2('logistics/getOrderCompanyCode', {orderId});//商品物流信息
api.getLogisticsData = (word,pageNo) => noFixParamsPost2('con/comsearch', {word,pageNo});//搜索物流公司


api.finishSaleOrderDetail = (orderId) => post('orderCenter/finishSaleOrderDetail',{orderId});//销售订单已完成订单详情
api.finishJudgeOrderDetail = (orderId) => post('orderCenter/finishJudgeOrderDetail',{orderId});//已完成订单详情



// api.backMoneyApply = (type,goodsId,orderId) => post('logistics/backMoneyApply',{type,goodsId,orderId});//购物订单申请退款   1:仅退款。2：退货退款

api.commitBackMoney = (form) => post('logistics/commitBackMoney',form);//待支付订单详情



api.backMoneyDetail = (orderId,itemId) => post('logistics/backMoneyDetail',{orderId,itemId});//购物订单退款详情
api.backSaleMoneyDetail = (orderId,itemId,type) => post('logistics/backSaleMoneyDetail',{orderId,itemId,type});//销售订单退款详情


api.saveLogistics = (form) => post('logistics/saveLogistics',form);//商家同意退款/退货后,买家填写物流信息




api.listShopRefund = (shopId, type, pageNo) => post('refund/listShopRefund', {shopId, type, pageNo }); // 退货退款列表（销售订单）
api.applyRefundMoney = (form) => post('refund/applyRefundMoney', form); // 申请退款（购物订单）
api.applyRefundGoods = (form) => post('refund/applyRefundGoods', form); // 申请退货退款（购物订单）
api.refundDetail = (refundId) => post('refund/refundDetail', { refundId }); // 退货退款详情
api.agreeRefundMoney = (  refundId) => post('refund/agreeRefundMoney', { refundId }); // 同意退款（销售订单）
api.agreeRefundGoods = (refundId) => post('refund/agreeRefundGoods', { refundId }); // 同意退货退款（销售订单）
api.refuseRefund = (refundId) => post('refund/refuseRefund', { refundId }); // 拒绝申请（销售订单）
api.setLogisticsDetail = (form) => post('refund/setLogisticsDetail', form); // 填写物流信息（同意退货）
api.confirmRefundGoods = (refundId) => post('refund/confirmRefundGoods', { refundId }); // 确认收货（销售订单）
api.insertRefundApply = (refundId) => post('refund/insertRefundApply', { refundId }); // 申请平台介入

//获取是否填写VIP订单信息
api.unFillAddressOrder = ()=>post('ugo/unfilladdressorder');
//VIP订单收货地址补填
api.orderAddressComfirm = (vorderNum,addressId) => post('ugo/orderaddressconfirm', { vorderNum,addressId}); 
//调起微信支付
api.unifiedorder = (outTradeNo) => post('pay/callwechatpay', { outTradeNo});
//VIP下单
api.insertVipOrderNew = (grade, skuId, parentId,adId) => post('pay/ordervip',{ grade, skuId, parentId,adId});
//拼团下单
api.orderPin = (pinId,addressId,msgs,item) => post('pay/orderpin',{ pinId,addressId,msgs,item });
//获取退款详情
api.getRefundsInfo = (rid) => post('reo/getRefundsInfo', { rid});
//用户申请退货退款
api.applyRefundMoeny  = (desc,iid,img,refundsTypeId) => post('reo/applyRefundMoeny', { desc,iid,img,refundsTypeId });
//用户申请退款
api.applyMoeny  = (desc,iid,img,refundsTypeId) => post('reo/applyMoeny', { desc,iid,img,refundsTypeId });
//获取退款理由列表/reo/getRefundsTypeList
api.getRefundsTypeList = () => post('reo/getRefundsTypeList');
//获取退款详情
api.getRefundsInfo = (rid)=>post('reo/getRefundsInfo',{rid})
//用户确认收货
api.achieveOrder = (oid) =>post('ugo/confirmgoods',{oid});
//取消订单
api.cancelOrder = (orderId)=>post('ugo/cancelUserOrder',{orderId});
//用户撤销退款
api.cancelRefunds =  (rid)=>post('reo/cancelRefunds',{rid});
//商家销售订单列表  0 全部 1 待发货 2待收货
api.saleOrderList =  (type,pageNo)=>post('sgo/orderlist',{type,pageNo});
//用户订单详情
api.orderDetail =  (oid) => post('ugo/orderdetail',{oid});
//商家订单详情
api.saleOrderDetail =  (oid) => post('sgo/orderdetail',{oid});
//商家发货
api.sentGoods =  (take,oid,fnum,eid) => post('sgo/sents',{take,eid,fnum,oid});
//商家退款列表
api.getShopRefundList = (pageNo,status) => post('reo/getShopRefundList',{pageNo,status});
//商家被评价的订单列表 /sgo/appraised
api.getAppraiseList = (pageNo)=>post('sgo/appraised',{pageNo});
// 处理退款/退货退款，0同意/1拒绝 同一个接口
api.editRefundMoeny = (refuseReason='',rid,type)=>post('reo/editRefundMoeny',{refuseReason,rid,type});
//用户退款列表
api.getUserRefundList = (pageNo) =>post('reo/getUserRefundList',{pageNo});// 退货退款列表（购物订单
//拼团下单接口/
api.orderPin = (pinId,addressId,msgs,item) =>post('pay/orderpin',{pinId,addressId,msgs,item});
//获取各种订单数量
api.conOrders = () =>post('con/orders',{});
//打赏
api.saveCircleCourseRewardOrder =  (circleId,courseId,amount) =>post('pay/saveCircleCourseRewardOrder',{circleId,courseId,amount});