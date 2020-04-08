import {
	md5
} from './md5';
import {
	signApi
} from './util';
import config from './config.js'
import $store from '../store/index';
/**
 * 
 * 过期重新登录的函数
 * 
 */
const url = `${config.API_HOST}/usercenter-service/user/xcxlogin`;

function fixLogin() {

	return new Promise((resolve, reject) => {
		
		//请求id  每五次请求更换一次id
		const n = 2;
		$store.state.requestIndex+=1;
		if($store.state.requestIndex%n==0)
			$store.state.requestUid = Math.random().toString(36).substring(2);
		const uuid = $store.state.requestUid;
		
		uni.login({
			provider: 'weixin',
			success: loginRes => {
				const code = loginRes.code;
				const timeStamp = new Date().getTime();
				const finalParams = {
					code,
					timeStamp
				};
				//签名
				const sign = signApi(url, finalParams);
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

				uni.request({
					url: url,
					method: 'POST',
					data: finalParams,
					header: {
						'sign': sign,
						'content-type': 'application/x-www-form-urlencoded', // 默认值
						'sour': sour,
						'uid':uuid
					},
					success: (res) => {
						const resData = res.data;
						const code = resData['code'];
						if(code == '0000'){
							uni.setStorageSync('token', resData.result.token);
							uni.setStorageSync('tokenTime',new Date().getTime());
							if(resData.result.userId)
								uni.setStorageSync('userId', resData.result.userId);
							resolve(resData.result)
						}else  reject(resData);
						
					},
					fail: (err) => {
						reject(err);
					}
				})


			}
		});
	});
}

module.exports = fixLogin;
