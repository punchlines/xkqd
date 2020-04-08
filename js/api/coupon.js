// 优惠券
// import { wrapPost } from './base/request';

import config from '../config'
import { wrapPost, wrapNoFixParamsPost, wrapProductPost, wrapProductNoFixParamsPost } from './base/request';

const HOST = config.API_HOST + '/apemoon-coupon';
const PORT = 8092;

let post = (url, params) => wrapProductPost(HOST, url, params);
let noFixParamsPost = (url, params) => wrapProductNoFixParamsPost(HOST, url, params);

if (config.DEV) {
  post = (url, params) => wrapPost(PORT, url, params, config.HOST2);
  noFixParamsPost = (url, params) => wrapNoFixParamsPost(PORT, url, params, config.HOST2);
}

const api = {};
export default api;

api.getSendCouponList = (pageNumber=1,pageSize=20) =>post('coupon/getSendCouponList',{pageNumber,pageSize});//平台优惠券的列表接口
api.receiveCouponList = (templetCouponId,receiveCouponNumber=1,changeNum) =>post('coupon/receiveCouponList',{templetCouponId,receiveCouponNumber,changeNum});//用户优惠券的列表接口

api.canUseCoupon = (pageNumber=1,pageSize=10) => post('coupon/canUseCoupon',{pageNumber,pageSize});//可用优惠券的列表


