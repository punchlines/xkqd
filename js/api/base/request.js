import store from '../../store';
import config from '../../config'
import { md5 } from '../../md5';
import { signApi } from '../../util';
import $store from '../../../store/index';
import qs from 'qs';
import fixLogin from '../../fixLogin'

const post = (url, params = {}, noDefault) => {

  const userParams = {};
	//TODO
  //const userId = store.getUserId();
  const token = store.getToken();

  let finalParams = Object.assign(userParams, params);
	
  if (noDefault) {
    finalParams = params;
  }
	
	finalParams.token = token;
	
  for (const key of Object.keys(finalParams)) {
    //finalParams[key] = finalParams[key] == undefined ? '' : finalParams[key];
		if(finalParams[key]===undefined || finalParams[key]===""  || finalParams[key]===null) { //删除空键值
			delete(finalParams[key]);
		}
		
  }

  finalParams.timeStamp = new Date().getTime();
	
	let formIdList = $store.state.formIdList;
	
	if(formIdList.length>0){
			finalParams.ffid = JSON.stringify(formIdList);
			$store.dispatch('clearFormIdx');
	}
		
	
	//平台区分
	let sour = "unknow";
	
	// #ifdef APP-PLUS
			sour = uni.getSystemInfoSync().platform;
	// #endif
	
	// #ifdef MP-WEIXIN
			sour = "wechat";
	// #endif
	
	// #ifdef H5
			sour = "h5";
	// #endif
	


  const sign = signApi(url, finalParams);

  return new Promise((resolve, reject) => {
		//请求id  每n次请求更换一次id
		const n = 2;
		$store.state.requestIndex+=1;
		if($store.state.requestIndex%n==0)
			$store.state.requestUid = Math.random().toString(36).substring(2);
		const uuid = $store.state.requestUid;
					
		
    uni.request({
      url: url,
      method: 'POST',
      data: finalParams,
      header: {
        'sign': sign,
        'content-type': 'application/x-www-form-urlencoded', // 默认值
				'sour':sour,
				'uid' : uuid
      },
      success: res => {
        const resData = res.data;
        const code = resData['code'];
        if(code === '0000') {
          resolve(resData.result);
        }else if(code == '8800'  && !uni.getStorageSync('ReLogin')){
					// #ifdef MP-WEIXIN
						uni.setStorageSync('token','');
						uni.setStorageSync('userId','');
						uni.setStorageSync('ReLogin',true)
						
						// uni.reLaunch({
						// 	url:'/pages/businessCard/businessCard'
						// });
						fixLogin().then(res=>{
							//重新加载页面
							uni.setStorageSync('ReLogin',false);
							const page = getCurrentPages()[getCurrentPages().length-1];
							
							const blacklist = [
								'pages/businessCard/businessCard',
								'pages/businessCardCircle/businessCardCircle',
								'pages/descover/descover',
								'pages/myself/myself'
								];

							let url = `/${page.route}?${qs.stringify(page.options, { encode: false })}`;
							
							if(blacklist.includes(page.route)){
									uni.reLaunch({
										url:url
									})
							}else uni.redirectTo({url:url});
							
						})
						
						
					// #endif
					
					// #ifdef APP-PLUS
						uni.setStorageSync('token','');
						uni.setStorageSync('userId','')
						uni.setStorageSync('ReLogin',true)
					
						uni.hideLoading();
						uni.showToast({
							title:"登录已过期，请重新登录",
							duration:2000
						});
						uni.reLaunch({
							url:'/pages/login/login'
						});
					// #endif
					
					//console.log(getCurrentPages());
					//this.doLoginHandle(res=>{console.log(res)})
					 
        }else  reject(resData);
        console.log(JSON.stringify(resData))
      },
      fail: res => {
        console.log(res.errMsg,'res')
			
				reject(res.errMsg);
				
        
      },
    });
  })
}

const wrapPost = (port, url, params, host = config.API_HOST) => post(host + ':' + port + '/' + url, params)
const wrapProductPost = (host, url, params) => post(host + '/' + url, params)
const wrapNoFixParamsPost = (port, url, params, host = config.API_HOST) => post(host + ':' + port + '/' + url, params, true)
const wrapProductNoFixParamsPost = (host, url, params) => post(host + '/' + url, params, true)
export { post, wrapPost, wrapNoFixParamsPost, wrapProductPost, wrapProductNoFixParamsPost };
