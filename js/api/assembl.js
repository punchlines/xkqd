import {wrapProductPost} from './base/request';
import config from "../config";
const HOST = config.API_HOST + '/assemble-service';
//拼团服务API
let post = (url, params) => wrapProductPost(HOST, url, params);

const api = {};
export default api;
//获取我发起的拼团
api.getMyAssembleList = (page,uId) => post('assemble/getMyAssembleList', { page,uId});
//获取正在进行的拼团
api.getInProgressAssembleList = (page) => post('assemble/getInProgressAssembleList', { page });
//开团
api.createPinGroup = (form) => post('assemble/createPinGroup', form);
//假数据
api.getAssembleNum = () => post('assemble/num');
//拼团详情
api.getAssembleDetail =  (pinId) => post('assemble/getAssembleDetail',{pinId});
//代理团
api.createAgencyGroup =  (pinId) => post('assemble/createAgencyGroup',{pinId});
//搜索
api.searchAssembleList =  (key,toPage,classId=null,minimumPrice=null,highestPrice=null,area=null)=>
 post('assemble/searchAssembleList',{key,toPage,classId,minimumPrice,highestPrice,area});
