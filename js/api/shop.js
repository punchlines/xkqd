// 店铺
import config from '../config'
import { wrapPost, wrapNoFixParamsPost, wrapProductPost, wrapProductNoFixParamsPost } from './base/request';

const HOST = config.API_HOST + '/apemoon-shop';
const PORT = 8098;
let post = (url, params) => wrapProductPost(HOST, url, params);
let noFixParamsPost = (url, params) => wrapProductNoFixParamsPost(HOST, url, params);

if (config.DEV) {
  post = (url, params) => wrapPost(PORT, url, params);
  noFixParamsPost = (url, params) => wrapNoFixParamsPost(PORT, url, params);
}

const api = {};
export default api;

api.getShopDetail = (shopId) => post('shop/getShopDetail', { shopId });
api.listCardShop = (uid,pageNo = 1) => noFixParamsPost('shop/listCardShop',{uid,pageNo,userId:1})
api.searchShop=(text,pageNo=1)=>post('shop/searchShop',{text,pageNo});//个人中心：申请成为员工  搜索店铺
api.searchShopGroup=(shopId,text,pageNo)=>post('shop/searchShopGroup',{shopId,text,pageNo});//个人中心：申请成为员工  搜索店铺
api.listRecommendShop=(pageNo=1)=>noFixParamsPost('shop/listRecommendShop',{pageNo});//获取推荐企业列表
api.getUserGoodsOrderList=(pageNo=1)=>post('ugo/getUserGoodsOrderList',{pageNo});//获取用户已购买过的商品列表
api.insertShopGroup=(shopId,logo,name)=>post('shop/insertShopGroup',{shopId,logo,name});//获取推荐企业列表
api.getShopManagerNum=(shopId)=>post('shop/getShopManagerNum',{shopId});//获取销售总监数量（vip3）

// 获取行业分类
api.listShopClassify=(pageNo)=>post('shop/listShopClassify',{pageNo});

//保存店铺信息 insertShopData
api.insertShopData=(data)=>noFixParamsPost('shop/insertShopData',data);

api.updateShopData=(shopId,logo,shopName,province,city,area,address,shopClassifyId)=>noFixParamsPost('shop/updateShopData',{shopId,logo,shopName,province,city,area,address,shopClassifyId});//修改店铺基本资料

api.listShopGroup=(shopId,pageNo=1)=>noFixParamsPost('shop/listShopGroup',{shopId,pageNo});

api.getVipUpgradePage = () => post('shop/getVipUpgradePage');
api.getVipPage = () => post('shop/getVipPage');

api.shoppingCart = (skuId,userId,number,recommendId) => {
  let postData = {skuId,userId,number,recommendId};
 
  return post('shoppingCart/v1/addCart', postData)
};//添加购物车

api.showShoppingCart = () => post('shoppingCart/showShoppingCart', {});//购物车列表数据展示
api.getCarSize = () => post('shoppingCart/cartsize', {});//购物车列表数据展示

api.deleteShoppingCartGoods = (cartId) => post('shoppingCart/deleteShoppingCartGoods', {cartId});//删除购物车的商品
api.updateShoppingCartData = (cartId, number) => post('shoppingCart/updateShoppingCartData', {cartId, number});
api.saveShop = (data)=>post('shop/saveShop',data);
//员工申请
api.registerMer = (data)=>post('mer/registermer',data);
//商户模板
api.setShopTemplate = (shopId,templateId)=>post('shop/setShopTemplate',{shopId,templateId});
