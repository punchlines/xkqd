import api from '@/js/api'
import {
	md5
} from "./md5";

const VodUploader = require('./lib/vod-web-sdk-v5.1');

const getSignature = function(callback) {
	api.getUploadSign().then(result => {
		callback(result.sign);
	})
}


//秒的时间戳转成日期
const formatDate = (time) => {
	var d = new Date(time * 1000);
	var month = d.getMonth() + 1; //当前月+1
	month = month < 10 ? ("0" + month) : month;
	var dt = d.getDate();
	dt = dt < 10 ? ("0" + dt) : dt;
	var year = d.getFullYear();
	return year + '-' + month + '-' + dt
};
// 处理时间戳   年月日时分秒
const formatTime = date => {
	var newdate = new Date(date)
	const year = newdate.getFullYear()
	const month = newdate.getMonth() + 1
	const day = newdate.getDate()
	const hour = newdate.getHours()
	const minute = newdate.getMinutes()
	const second = newdate.getSeconds()
	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};
const times =data=>{
	var newdate= parseInt(Date.parse(new Date()));
	console.log('123',newdate)
	return newdate
}
// 时间转为时间戳
function date2timestamp(datetime) {
    var timestamp = new Date(Date.parse(datetime));
    timestamp = timestamp.getTime();
    timestamp = timestamp;
    return timestamp;
}
// 时间戳转时间
function timestamp2date(timestamp, mode) {
    var tt = new Date(timestamp)
	var hours=''
	if(tt.getHours()>=0 && tt.getHours()<=6){
		hours='凌晨'+tt.getHours()
	}else if(tt.getHours()>=6 && tt.getHours()<=12){
		hours='上午'+tt.getHours()
	}
	else if(tt.getHours()>=12 && tt.getHours()<=14){
		hours='中午'+tt.getHours()
	}
	else if(tt.getHours()>=14 && tt.getHours()<=18){
		hours='下午'+tt.getHours()
	}
	else if(tt.getHours()>=18){
		hours='晚上' +tt.getHours()
	}
	var a =tt.getFullYear()+ "年" +(tt.getMonth() + 1)+'月'+tt.getDate()+'日'+hours + ':' + tt.getMinutes()
	var b =(tt.getMonth() + 1)+'月'+tt.getDate()+'日'+hours + ':' + tt.getMinutes()
	var c =hours + ':' + tt.getMinutes()
    var date_a = a.split(" ");
	var date_b = b.split(" ");
	var date_c = c.split(" ");
    if (mode == 3) {
        var minute = 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var current_timestamp = parseInt(Date.parse(new Date()));
        var diffValue = current_timestamp - timestamp;
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        if (monthC >= 1) {
            result = monthC + "月前";
        }
        else if (weekC >= 1) {
            result = weekC + "周前";
        }
        else if (dayC >= 1) {
            result = dayC + "天前";
        }
        else if (hourC >= 1) {
            result = hourC + "小时前";
        }
        else if (minC >= 1) {
            result = minC + "分钟前";
        } else
            result = "刚刚";
        return result;
    }


    if (mode == 2) {
        var current_timestamp = parseInt(Date.parse(new Date()));
		var years =new Date();
		if(tt.getFullYear()>years.getFullYear()){
			return data_a[0]
		}
        else if ((current_timestamp - timestamp) > 1 * 24 * 60 * 60*1000) {
            // 3之前，显示日期
            return date_b[0]
        } 
		else {
            var d = new Date();
            var date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            var b_date = date2timestamp(date + " 00:00:00");
            var e_date = date2timestamp(date + " 23:59:59");
            if (timestamp > parseInt(b_date) && timestamp < parseInt(e_date)) {
                // 今天,只显示时间
                return date_c[0]
            }
            if (timestamp > parseInt(b_date - 24 * 60 * 60*1000) && timestamp < parseInt(e_date - 24 * 60 * 60*1000)) {
                // 昨天，显示昨天时间
                return "昨天"+date_c[0]
            }
       }
    }


    if (mode == 1) {
        // 如果是当天，就不显示日期
        var d = new Date();
        var date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        var b_date = date2timestamp(date + " 00:00:00");
        var e_date = date2timestamp(date + " 23:59:59");

        if (timestamp > parseInt(b_date) && timestamp < parseInt(e_date)) {
            return date_arr[1];
        }
        return tt;
    }


   return tt;
}
const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

// 处理时间戳   年月日
const formatTime1 = date => {
	var newdate = new Date(date)
	const year = newdate.getFullYear()
	const month = newdate.getMonth() + 1
	const day = newdate.getDate()
	return [year, month, day].map(formatNumber1).join('-')
};
const formatNumber1 = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}



//将秒转化为时分秒
const formateSeconds = (endTime) => {
	if (!endTime) return '00:00:00';
	let secondTime = parseInt(endTime) //将传入的秒的值转化为Number
	let min = 0 // 初始化分
	let h = 0 // 初始化小时
	let result = ''
	if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
		min = parseInt(secondTime / 60) //获取分钟，除以60取整数，得到整数分钟
		secondTime = parseInt(secondTime % 60) //获取秒数，秒数取佘，得到整数秒数
		if (min > 60) { //如果分钟大于60，将分钟转换成小时
			h = parseInt(min / 60) //获取小时，获取分钟除以60，得到整数小时
			min = parseInt(min % 60) //获取小时后取佘的分，获取分钟除以60取佘的分
		}
	}
	if (isNaN(secondTime)) return '';
	result = `${h.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${secondTime.toString().padStart(2,'0')}`
	return result
}

//图片上传
const upImg = (callback, count = 1) => {

	//多张图片上传
	uni.chooseImage({
		count: count,
		success: (res) => {
			let tempFilePath = res.tempFilePaths;
			uni.showLoading({
				title: '上传中...',
				mask: true
			});

			let PromiseMap = [];
			//遍历图片数组  
			for (let i in tempFilePath) {
				PromiseMap.push(new Promise((resolve, reject) => {
					api.uploadFile(tempFilePath[i], (url) => {
						//uni.hideLoading();
						//callback(url)
						resolve(url);
					});
				}));
			}
			//等待所有图片上传完成
			Promise.all(PromiseMap).then(res => {
				if (res.length == 1) {
					callback(res[0])
				} else callback(res);
			})

		}
	})
}
//视频上传
const upVideo = (callback, maxSize = 50) => {
	uni.chooseVideo({
		count: 1,
		sourceType: ['camera', 'album'],
		success: (res) => {
			if (res.size > maxSize * 1024 * 1024) {
				uni.showModal({
					title: '提示',
					content: '视频大小不能大于 ' + maxSize + 'MB',
					showCancel: false
				});
				return;
			}
			uni.showLoading({
				title: '上传中请勿离开'
			});

			console.log(JSON.stringify(res));

			VodUploader.start({
				videoFile: res, //必填，把chooseVideo回调的参数(file)传进来
				fileName: new Date().getTime().toString(), //选填，视频名称，强烈推荐填写(如果不填，则默认为“来自微信小程序”)
				getSignature: getSignature, //必填，获取签名的函数
				success: function(result) {
					console.log('success');
					console.log(result);
					uni.hideLoading()
				},
				error: function(result) {
					console.log('error');
					console.log(result);
					uni.showModal({
						title: '上传失败',
						content: JSON.stringify(result),
						showCancel: false
					});
					uni.hideLoading()
				},
				progress: function(result) {
					console.log('progress');
					console.log(JSON.stringify(result));
				},
				finish: function(result) {
					callback(result.videoUrl, formateSeconds(res.duration || 0), result.fileId, res.duration)
				}
			});

		}
	});
}
//文件上传
const uploadFile = (data, callback) => {
	api.uploadFile(tempFilePath, (url) => {
		callback(url)
	}, (error) => {}, () => {
		uni.hideLoading();
	})
}

//微信小程序支付
const WXPay = (data) => {
	return new Promise(function(resolve, reject) {
		uni.requestPayment({
			provider: 'wxpay',
			// 当前时间
			timeStamp: String(Date.now()),
			//随机字符串，长度为32个字符以下。
			nonceStr: 'A1B2C3D4E5',
			//统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx
			package: 'prepay_id=wx20180101abcdefg',
			signType: 'MD5',
			//签名，具体签名方案参见 微信小程序支付文档
			paySign: '',
			success: function(res) {
				resolve(res)
			},
			fail: function(err) {
				reject(err)
			}
		});
	});
}

//判断是否已登录
const isLog = () => {
	let userId = uni.getStorageSync('userId');
	if (userId) {
		return true;
	} else {
		uni.showModal({
			title: '提示',
			content: '请登录...',
			success: function(res) {
				if (res.confirm) {
					// 关闭当前页跳转
					uni.navigateTo({
						url: '/pages/login/login'
					});
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
		return false;
	}

}

const getOpenId = (that) => {
	return new Promise(function(yes, no) {
		let openid = uni.getStorageSync('openid');
		if (openid) {
			yes(openid)
		} else {
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					// 拿openid-判断用户是否存在，存在则获取用户信息
					that.$api.getOpenId(loginRes.code).then(res => {
						yes(res.openId)
						uni.setStorageSync('openid', res.openId);
					}).catch(err => {
						console.info(err)
						no('')
					})
				}
			});
		}
	})
}
//处理商品sku skuJson
const disposeSku = (res) => {
	res.skuIdJson = JSON.parse(res.skuIdJson);
	if (res.skuJson.indexOf("'") != -1) {
		res.skuJson = JSON.parse(res.skuJson.replace(/\'/g, '"'));
	} else {
		res.skuJson = JSON.parse(res.skuJson);

	}

	// 将mpGoods转化成 {[1,4]: 105, [1,5]: 155}，赋值到this.mpGoods
	for (var i = 0; i < res.mpGoodsSkuList.length; i++) {
		var mpGood = res.mpGoodsSkuList[i];
		for (var prop in mpGood) {
			res.mpGoodsSkuList[prop.replace(/\s/g, '')] = mpGood[prop];
		}
	}

	// skuJson
	var skuJsonData = [];
	var skuJsonKeys = Object.keys(res.skuJson);

	for (var i = 0; i < skuJsonKeys.length; i++) {
		var key = skuJsonKeys[i];
		skuJsonData[i] = {
			title: key,
			value: [{
				status: true,
				title: ''
			}]
		};
		var skuJsonItem = JSON.parse(res.skuJson[key]);
		for (var j in skuJsonItem) {
			skuJsonData[i]['value'][j] = skuJsonData[i]['value'][j] || {
				status: false,
				title: ''
			};
			skuJsonData[i]['value'][j]['title'] = skuJsonItem[j];

		}
	}
	// skuJson
	res.skuJson = skuJsonData;
	// status 初始key
	res.status = JSON.parse(Object.keys(res.mpGoodsSkuList[0])[0].replace(/\s/g, ''));
	res.priceObj = res.mpGoodsSkuList[JSON.stringify(res.status)];
	return res;
}
export {
	formatDate,
	formatTime,
	formateSeconds,
	upImg,
	upVideo,
	uploadFile,
	WXPay,
	isLog,
	getOpenId,
	disposeSku,
	formatTime1,
	timestamp2date,
	times
}
export default {
	formatDate,
	formatTime,
	formateSeconds,
	upImg,
	upVideo,
	uploadFile,
	WXPay,
	isLog,
	getOpenId,
	disposeSku,
	formatTime1,
	times,
	timestamp2date
}
