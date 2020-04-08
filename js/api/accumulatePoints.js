// 积分
// import { wrapPost } from './base/request';
import config from '../config'
import { wrapPost, wrapNoFixParamsPost, wrapProductPost, wrapProductNoFixParamsPost } from './base/request';

const HOST = config.API_HOST + '/apemoon-coupon';
const PORT = 8090;

let post = (url, params) => wrapProductPost(HOST, url, params);
let noFixParamsPost = (url, params) => wrapProductNoFixParamsPost(HOST, url, params);

if (config.DEV) {
  post = (url, params) => wrapPost(PORT, url, params, config.HOST2);
  noFixParamsPost = (url, params) => wrapNoFixParamsPost(PORT, url, params, config.HOST2);
}

const api = {};
export default api;

api.getMyIntegral = () =>post('points/get');//用户获取积分接口总数
api.record = (pageNumber=1,pageSize=20) =>post('points/record',{pageNumber,pageSize});//用户积分记录列表接口
api.getShopMessage = () =>post('points/getShopMessage');//获取到该用户的签到店铺
api.goSigned = (type) =>post('points/goSigned',{type});//用户每日普通签到 
api.shopGoSigned = (type,shopId) =>post('points/goSigned',{type,shopId});//店铺签到接口
api.alreadySignedRecord = (type) =>post('points/alreadySignedRecord',{type});//是否已经签到的接口 今日签到
api.shopAlreadySignedRecord = (type,shopId) =>post('points/alreadySignedRecord',{type,shopId});//是否已经签到的接口 店铺签到