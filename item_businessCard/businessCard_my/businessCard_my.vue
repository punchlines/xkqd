<template>
		<view class="container">
			<!-- 个人信息 -->
				<view class="perInfoCon">
					<!-- 顶部信息 -->
						<view class="bgCon">
							<view class="br_l">234人看过Ta</view>
							<view class="bg_r">
								<view>
									<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/like.png'"></image>
									<text>230</text>
								</view>
								<view class="shouCang">
									<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/shoucang.png'"></image>
									<text>230</text>
								</view>
								<view class="share" @click="shareClick">
									<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/share.png'"></image>
									<text>分享</text>
								</view>
							</view>
						</view>
						<!-- 个人信息详情 -->
						<view class="infoDe">
							<view class="ava fx-row">
								<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/ava.png'"></image>
								<view class="nameInfoCon">
									<view class="nameInfo fx-row">
										<view class="name">目小温</view>
										<view class="posi">外贸经理</view>
									</view>
									<view class="company">广州时刻销售网络科技有限公司</view>
								</view>
							</view>
							<view class="per_de">
								<view class="fx-row fx-row-center ma">
									<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/phone.png'" class="tell"></image>
									<text class="wenzi">18544714489</text>
								</view>
								<view class="fx-row fx-row-center ma">
									<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/email.png'" class="email"></image>
									<text class="wenzi">jkjfdk@sina.com</text>
								</view>
								<view class="detail fx-row fx-row-center ma">
									<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/qianming.png'" class="edit"></image>
									<text class="wenzi">时刻小小始创于上海，至今已成为的快捷的方式刻录个个人机</text>
								</view>
								<!-- 个人资料按钮 -->
								<view class="data" @click="editCard">编辑资料</view>
							</view>
							<!-- 编辑按钮 -->
	<!-- 						<view class="editCon" @click="editCard">
								<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/bianji%20.png'"></image>
								<text>编辑</text>
							</view> -->
						</view>
				</view>
				<!-- 导航 -->
				<view class="subNav fx-row fx-row-center">
					<view class="fx-column fx-row-center" @click="myCustomer">
						<view class="cuCon">
							<text class="cuNum">99</text>
						</view>
						<!-- <image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/caifulunp.png'" mode="widthFix"></image> -->
						<text class="nav_ti">我的客户</text>
					</view>
					<view class="fx-column fx-row-center" @click="toWheel">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/caifulunp.png'" mode="widthFix"></image>
						<text class="nav_ti">财富轮盘</text>
					</view>
					<view class="fx-column fx-row-center" @click="tosearchCard">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/email%20copy%203.png'" mode="widthFix"></image>
						<text class="nav_ti">搜索</text>
					</view>
					<view class="fx-column fx-row-center" @click="toThematic">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/zhuanti.png'" mode="widthFix"></image>
						<text class="nav_ti">专题数据</text>
					</view>
				</view>
				<!-- 个人视频 -->
				<view class="perRadio">
					<view class="titleCon">
						<text class=" per title">个人视频</text>
						<text class=" qiye un_title">企业宣传</text>
							<!-- <view v-for="(item,index) in changeTitleBox.vedioTitle" :key="index" @tap="changesTitle($event,index)" 
								:class="{'ATname':true,'ATactive':vedioTitleActive==index}" class="title">{{item.title}}</view>
						</view> -->
					</view>
							<!-- 个人视频区域 -->
					<view class="radioCon" v-if="vedioTitleActive==0">
						<view class="radioImg">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/other/radio.jpg'"></image>
							<view class="mark"></view>
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/play.png'" class="zanTing"></image>
						</view>					
					</view>
					<!-- 企业视频区域 -->
					<view class="radioCon" v-else-if="vedioTitleActive==1">
						<view class="radioImg">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/other/radio.jpg'"></image>
							<view class="mark"></view>
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/play.png'" class="zanTing"></image>
						</view>	
					</view>
				</view>
				<!-- 日志商品 -->
				<view class="dayCon">
					<!-- 日志，商品切换标题 -->
					<view class="dayCon_title fx-row">
						<view v-for="(item,index) in auditTitleBox.auditTitle" :key="index" @tap="changeTitle($event,index)" 
							:class="{'ATname':true,'ATactive':audiTitleActive==index}" class="title">{{item.title}}</view>
					</view>

					<!-- 日志轮播 -->
					<view class="logCon" v-show="audiTitleActive==0">
						<!-- 发布日志 -->
						<view class="pubCon" @click="fabuLog">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/play%20copy.png'" mode=""></image>
							<text>发布日志，记录生活美好</text>
						</view>
						<view class="whitebg">
							<view class="TBmiddle">
								<swiper @change="changeSwiperNum($event)" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
									:duration="duration" indicator-color="#E1E1E1" circular="true" indicator-active-color="#6B7AF8" display-multiple-items="1">
									<swiper-item v-for="(item,index) in SwiperList" :key="index" :display-multiple-items="index">
										<image :src="item.image" mode="widthFix"></image>
									</swiper-item>
								</swiper>
								<view class="TBMswiperNum fsf24">{{currentNum+1}}/{{SwiperList.length}}</view>
							</view>
							
							<view class="detailCon">
									<text>在不少女孩心中，蒂芙尼就是浪漫订婚钻戒的代名词，而“蒂芙尼蓝”也成为了一种标志性的成为了一种标志性的</text>
							</view>
							<!-- 轮播底部段落 -->
							<view class="TBbottom">
								<view v-if="hideText" class="TBtitle fs3a28">{{sliceCountText}} ...
									<text class="countTextNum fs3a28" @tap="openTextTitle">展开</text>
								</view>	
								<view v-if="OpenText" class="TBtitle fs3a28">{{countTextNum}}
									<view class="countTextNum2 fs3a28" @tap="hideTextTitle">收起</view>
								</view>
								<view class="TBCenter fs9a24 fx-row fx-row-center fx-row-space-between">
									<view class="TBCtime">1分钟前</view>
									<view class="TBCinfor fx-row fx-row-center fx-col-space-around">
										<view class="Czan">
											<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/likeun.png'" mode=""></image>
											<text>200</text>
										</view>
										<view class="Cmessage" @click="commentClick">
											<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/pinglun.png'" mode=""></image>
											<text>367</text>
										</view>
										<view class="Csend">
											<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/share.png'" mode=""></image>
											<text>5445</text>
										</view>
									</view>
								</view>
								<view class="TBcomment" @click="commentClick">
									<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/yaoqing.png'"></image>
									<text>添加评价</text>
								</view>
							</view>
							<!-- 轮播底部段落结束 -->
						</view>

					</view>	
							
					<!-- 商品 -->
					<view class="shopContainer fx-column fx-col-center" v-show="audiTitleActive==1">
						<!-- 商品banner -->
						<view class="bannerCon">
							<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/other/shopLogo.jpg'"></image>
							<view class="shopName">
								<view class="name">小河马零食铺</view>
								<view class="goodsNum">18个商品</view>
							</view>
							<view class="shopButton" @click="toMyShop">进店</view>
						</view>
						<!-- 商品列表 -->
						<view class="goodsListCon fx-wrap fx-row fx-row-space-between">
							<view class="goodsCon" v-for="item of goodsList" :key="id" @click="goodsDetail">
								<view class="imgCon">
									<image :src="item.image"></image>
									<!-- 评分 -->
									<view class="score">评分<text>{{item.score}}</text></view>
								</view>
								<view class="textDetail">
										<view class="goodsName">{{item.name}}</view>
										<view class="goodsDe fx-row fx-row-space-between fx-col-center">
											<text class="price">￥{{item.price}}</text>
											<text class="saleNum">已售{{item.sale}}</text>
										</view>
									</view>
								</view>
						</view>
					</view>
			</view>
			<!-- 底部分享弹出框 -->
			<view class="shareModelCon" v-show="shareTo">
				<view class="selectList">
					<view class="toFriends">分享至微信好友</view>
					<view class="toImg" @click="sharePic">生成名片圈分享图</view>
					<view class="cancel" @click="cancleShare">取消</view>
				</view>
			</view>
			<!--消息通知按钮  -->
			<view class="notice" @click="messageTo">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tongzhi.png'" mode="widthFix" class="noticeImg"></image>
				<view class="number">1</view>
			</view>
	</view>
</template>

<script>
import utils from '../../js/util.js';
	export default {
		data() {
			return {
				onlineSite:this.global.onlineSite,
				shareTo:false,//分享名片
				//标题(个人视频，企业视频)
				changeTitleBox:{
					vediotitle:[
						{id:0,title:'个人视频'},{id:1,title:'企业视频'}
					]
				},
				vedioTitleActive:0,
				//标题(日志店铺)
				auditTitleBox:{
					auditTitle:[
						{id:0,title:'日志'},{id:1,title:'商品'}
					],		  
				},
				audiTitleActive:0,   //切换标题
				isCall:false,//是否拨打电话
				// 轮播图
				SwiperList:[
					{id:0,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/ls/img2.png'},
					{id:1,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/ls/img1.png'},
					{id:2,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/ls/img2.png'},
					{id:3,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/ls/img1.png'},
					{id:4,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/ls/img2.png'},
					{id:5,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/ls/img1.png'}
				],
				indicatorDots:true,
				autoplay:true,
				interval:5000,
				duration:1000,
				currentNum:0,
				// 商品列表
				goodsList:[
					{id:0,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/other/goods.png',name:'三只松鼠优质芒果干',price:115,sale:20,score:5},
					{id:1,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/other/goods.png',name:'三只松鼠优质芒果干',price:115,sale:20,score:5},
					{id:2,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/other/goods.png',name:'三只松鼠优质芒果干',price:115,sale:20,score:5},
					{id:3,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/other/goods.png',name:'三只松鼠优质芒果干',price:115,sale:20,score:5},
					{id:4,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/other/goods.png',name:'三只松鼠优质芒果干',price:115,sale:20,score:5},
					{id:5,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/other/goods.png',name:'三只松鼠优质芒果干',price:115,sale:20,score:5},
					{id:6,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/other/goods.png',name:'三只松鼠优质芒果干',price:115,sale:20,score:5},
					{id:7,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/other/goods.png',name:'三只松鼠优质芒果干',price:115,sale:20,score:5}
				],
			}
		},methods: {
		 //点击事件
		messageTo(){//查看消息
			uni.navigateTo({
					url: '../../module/message/home/home'
				
			});
		},
		toWheel(){//财富轮盘
			uni.navigateTo({
					url: '../businessCard_Wheel/businessCard_Wheel'
			});
		},
		myCustomer(){//我的客户页面
			uni.navigateTo({
					url: '../businessCard_MyCustomer/businessCard_MyCustomer'
			});
		},
		toThematic(){//专题数据
			uni.navigateTo({
					url: '../businessCard_DataTopic/businessCard_DataTopic'
			});
		},
		tosearchCard(){//搜索名片
			uni.navigateTo({
					url: '../businessCard_SearchCard/businessCard_SearchCard'
			});
		},
		toMyShop(){//我的店铺
			uni.navigateTo({
					url: '../businessCard_MyShop/businessCard_MyShop'
			});
		},
		shareClick(){//分享名片
			this.shareTo = !this.shareTo
		},
		cancleShare(){//取消分享名片
			this.shareTo = !this.shareTo
		},
		editCard(){//编辑名片
			uni.navigateTo({
					url: '../businessCard_EditCard/businessCard_EditCard'
			});
		},
		fabuLog(){//发布日志
			uni.navigateTo({
					url: '../businessCard_PublishLog/businessCard_PublishLog'
			});
		},
		commentClick(){//评价
			uni.navigateTo({
					url: '../businessCard_LogComment/businessCard_LogComment'
			});
		},
		//切换标题(日志，商品)
		changeTitle(e,index){
			this.audiTitleActive=index;
		},
		//
		//切换标题(个人视频，企业视频)
		changesTitle(e,index){
			this.vedioTitleActive=index;
		},
		   // 轮播图图片数量
		changeSwiperNum(event){
			// console.log(event.detail.current);
			this.currentNum=event.detail.current;
		},
		//跳转到商品详情页
		goodsDetail(){
			uni.navigateTo({
					url: '../../module/shop/goodsDetail/goodsDetail'
			});
		},
		   //浮层
		  sharePic(){//生成名片圈分享图
			uni.navigateTo({
					url: '../businessCard_CardTemplate/businessCard_CardTemplate'
			});
		},
		   //组件回调

		   //网络请求
	       //Vuex
		   // ...mapMutations(['ChangeRefreshuserInfoState'])
		  },
		  //注册组件
		  components:{
		   
		  },
		  //监听计算属性
		  computed: {
		   
		  // ...mapState(['ISneedRefreshuserInfo'])
		  },


		 // 监听页面加载
		  onLoad: function () {
			var prama = {
				userId: 1,
				cardUserId: 2,
			}
		   utils.Promisenet('card/getUserCardDetails', prama)
					.then(result => {
						console.log('请求结果==' + JSON.stringify(result));

					})
					.catch(err => {
						console.log(err)
					})

		  },
		  // 监听页面显示
		  onShow: function () {
		   console.log('监听页面显示');
		  },
		  //监听页面隐藏
		  onHide: function () {
		   console.log('监听页面隐藏');
		  },
		  
		  // 监听页面卸载
		  onUnload: function () {
		   console.log('监听页面卸载');
		  },
		  //监听下拉刷新
		  onPullDownRefresh() {
		   console.log('onPullDownRefresh');
		   
			//    var bool = true;
			//    this.getalldataNetwork(bool);

			   
			  //    setTimeout(function() {
			//     uni.stopPullDownRefresh();
			//    }, 1000);
		  },
		  //监听上拉刷新
		  onReachBottom() {
		   console.log('onReachBottom');
			//    var bool = false;
			//    this.getalldataNetwork(bool);
		  },
	}
</script>

<style lang="less">

@import "../../css/jss_base.less";
.container{
	font-family:PingFangSC;background: #F5F5F5;padding-bottom: 20upx;
}
//顶部个人信息
.perInfoCon{
	.bgCon{
		position:relative;
		width:100%;
		box-sizing:border-box;
		padding: 0 30upx;
		height: 390upx;
		 background-image: -webkit-linear-gradient(90deg,#8D8DF1, #5670FF);
		 
		display:flex;
		flex-direction:row;
		justify-content:space-between;
		image{width:26upx;height: 25upx;margin-right: 18upx;}
		.br_l{margin-top: 40upx; font-size: 24upx;color: #FFFFFF;}
		.bg_r{margin-top: 40upx;display: flex;flex-direction: row;justify-content: space-between;
			font-size: 24upx;color: #FFFFFF;
			.shouCang{margin-left:40upx;}
			.share{margin-left:40upx ;}
		}
	}
	.infoDe{
	position: absolute;left: 30upx;top: 103upx;width: 92%;background: #FFFFFF;height: 379upx;box-sizing: border-box;padding: 0 30upx 0 40upx;
	box-shadow: 0 1px 20px 0 rgba(91,119,240,0.23);
	border-radius: 10upx;
		.ava{
			&>image{width: 120upx;height: 120upx;margin-top: 56upx;margin-right: 24upx;}
			.nameInfoCon{
				margin-top: 56upx;margin-bottom: 30upx;
				.nameInfo{
					line-height:60upx;align-items:center;
					.name{font-size: 36upx;color: #333333;}
					.posi{margin-left:22upx;width: 116upx;height: 36upx;line-height: 36upx; border-radius:23upx;background: #F1F1F1;font-size: 20upx;color: #666666;text-align: center;}
				}
			}
			.company{margin-top: 17upx; font-size: 24upx;color: #999999;font-family: PingFangSC;}
		}
		.per_de{
			.wenzi{font-size: 24upx;color: #333333;font-family: PingFangSC;margin-left: 28upx; 
		}
			image{width:32upx;height: 32upx;}
			.ma{margin-bottom: 12upx;}
				.detail{	 
					// 超出部分显示...
					.edit{flex:1;}
					.wenzi{flex:18; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}	
					}
			}
			.data{
				position:absolute;right: 0;top:30upx;width: 134upx;height: 54upx;line-height: 54upx;
				background: #F4F5FF;color:#6D7CF8;font-size: 24upx;text-align: center;border-radius: 27upx 0 0 27upx;
			}
			//编辑个人名片按钮
// 			.editCon{
// 				.flex(@justCon:center;@alignIt:center;);
// 				position: absolute;right: 30upx;top:30upx; height: 30upx; background:#F8F8FF;width: 116upx;height: 48upx;border-radius: 4upx;color:#6B7AF8;font-size: 24upx;text-align:center;
// 				&>image{width: 20upx;height: 19upx;margin-right: 8upx;}
// 			}
	}

}
//导航栏
.subNav{
	padding-top: 144upx;background: #FFFFFF;
	image{width: 90upx;height: 90upx;}
	.cuCon{width:90upx;height: 90upx;background:#F8F8FF;text-align: center;border-radius: 50%;
		.cuNum{font-size: 34upx;color: #6B7AF8;line-height: 90upx;font-family:Arial-BoldMT;font-weight: bold;}
	}
	.nav_ti{margin-top:20upx;margin-bottom: 50upx; font-size: 28upx;color: #666666;font-family: PingFangSC;}
}
//个人视频
.perRadio{width: 100%;margin-bottom: 38upx; box-sizing: border-box;padding: 0 30upx;border-radius: 8upx;
	margin-top: 53upx;
	.titleCon{
		margin-bottom: 32upx;
		.title{font-size: 36upx; color: #333333;font-family: PingFangSC;font-weight: bold;}
		.un_title{font-size: 36upx; color: #AAAAAA;font-family: PingFangSC;font-weight: bold;}
		.qiye{margin-left: 73upx;}
	}
		.radioCon{
			.radioImg{position: relative;border-radius: 8upx;
			image{width: 100%;height: 388upx;}
			.mark{position: absolute;z-index:1;top: 0;left: 0;background: rgba(0,0,0,0.5);width:100%;height: 388upx;}
			.zanTing{width: 90upx;height: 90upx; position: absolute;z-index:1;top: 50%;left: 50%;margin-left: -45upx;margin-top: -45upx;}
			}
	}
}

// 日志
.dayCon{
	width: 100%;box-sizing: border-box;padding: 0 30upx;
	.logCon{margin-bottom: 30upx;}
	//发布日志
	.pubCon{display: flex;flex-direction: row;justify-content: flex-start;align-items: center;
		width: 100%;height: 124upx; margin-bottom: 30upx; border: 1px dashed #6B7AF8;border-radius: 8upx;font-size: 28upx;color: #666666;
		&>image{width:40upx;height:40upx;margin: 0 13upx 0 40upx;}
	}
	.dayCon_title{
	margin-bottom: 32upx;	font-size: 36upx;color: #333333;font-family: PingFangSC;font-weight: 600;color: #AAAAAA;
	.title{margin-right: 68upx;}
		.ATactive{color: #333333;}
		.goods{margin-left: 68upx;}
	}
	// 轮播图片
	.whitebg{background: #FFFFFF;}
	.TBmiddle{
		position: relative;
		width: 100%;
		swiper{
			width:100%;height:750upx;
			image{width:100%;border-top-left-radius:8upx; border-top-right-radius:8upx;}
		}
		.TBMswiperNum{
			width:80upx;height: 42upx;background:rgba(0,0,0,.4);position: absolute;top:20upx;right:30upx;border-radius:21upx;text-align: center;line-height: 42upx;color: #FFFFFF;font-size: 24upx;
		}
		
	}
	//轮播底部文字
			.TBbottom{
			padding:25upx;
			.TBtitle{
				margin:10upx 0 20upx 0;
				position: relative;font-size:30upx;
				.countTextNum{width:100%;position:relative;right: 0;font-weight: bold;}
				.countTextNum2{width:100%;position:relative;right: 20upx;text-align: right;font-weight: bold;margin:10upx 0;}
			}
			.TBCenter{
				margin-bottom: 40upx;font-size: 24upx;color: #999999;
					image{width:28upx;height: 24upx;vertical-align: middle;margin-right:10upx;}
				.TBCtime{width:40%;}
				.TBCinfor{
					width:60%;text-align: right;
					.Czan,.Cmessage,.Csend{width:33.33%;}
				}
			}
			.TBcomment{
				image{width:50upx;height: 50upx;vertical-align:top;margin-right: 20upx;}
				font-size:28upx;color:#AAAAAA;
			}
		}
		// 
	.detailCon{width:90%;margin: 0 auto;margin-bottom: 28upx;
		font-size: 28upx;color: #333333;
		
	}
	.operationCon{
		width:90%;margin: 0 auto;
		.time{width: 45%;color: #999999;font-size: 24upx;}
		.opCon_r{
			display: flex;flex-direction: row;justify-content: center;
			image{width: 28upx;height: 24upx;}
			font-size:24upx;color:#999999;line-height: 48upx;
			//超出两行显示...
				width:100%;
				overflow:hidden; 
				text-overflow:ellipsis;
				display:-webkit-box; /** 对象作为伸缩盒子模型显示 **/
				-webkit-box-orient:vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
				-webkit-line-clamp:2; /** 显示的行数 **/
		}
	}
	
}
//商品
.shopContainer{
	margin-bottom: 130upx; 
	// 店铺名称
	.bannerCon{display: flex;flex-direction: row;justify-content: space-between;align-items: center;
		width: 100%;margin: 0 auto; height: 170upx;padding: 0 30upx;background: #FFFFFF;margin-bottom:30upx;
		&>image{width: 110upx;height: 110upx;margin-right: 20upx;}
		.shopName{width: 60%;font-family: PingFangSC;
			.name{margin-bottom: 18upx; font-size: 30upx;color: #333333;}
			.goodsNum{font-size: 24upx;color: #666666;}
		}
		.shopButton{
			width: 130upx;height: 64upx;line-height: 64upx;text-align: center; background:#F8F9FF;color: #6B7AF8;border-radius: 32upx;font-size: 28upx;
		}
	}
	//商品列表
	.goodsListCon{
		width: 100%;
		 @ff: PingFangSC;
		.goodsCon{
			width: 334upx;
			.imgCon{position: relative;
				&>image{width: 330upx;height: 330upx;}
				.score{position: absolute;right: 14upx;bottom: -20upx;width:100upx;height: 40upx;line-height: 40upx;background:#DDAB5C;font-size: 20upx;color: #FFFFFF;border-radius:4upx;text-align: center;}
			}

			.textDetail{
				padding: 35upx 20upx 0 20upx; background: #FFFFFF;font-family: @ff;
				.goodsName{margin-bottom: 21upx; font-size: 28upx;color: #333333;}
				.goodsDe{margin-bottom: 33upx;
					.price{color: #FF5858;font-size: 20upx;font-family: Arial;}
					.saleNum{font-size: 24upx;color: #999999;margin-bottom: 33upx;}
				}
			}
			
		}
	}
	
}


// 创建按钮
.createCon{
	position: fixed;bottom: 0;z-index: 99;width: 100%;height:98upx;text-align: center;background: #FFFFFF;
	.creButton{
		width:620upx ;height: 80upx;line-height: 80upx;margin: 10upx auto;font-size:28upx ;color: #FFFFFF;background: #6B7AF8;border-radius: 44upx;
	}
}
	// 底部tab按钮(打开我的名片,移除名片)
	.tabButt{
		position: fixed;bottom: 0;left: 0;width: 100%;height:98upx;background: #FFFFFF;color: #FFFFFF;font-size: 28upx;z-index: 1;
		.openCardCon{
			width:50%;text-align:center;
			.openCard{width: 83%;height:80upx;line-height: 80upx; background:linear-gradient(left,#4CA5FF,#4C8CFF);border-top-left-radius: 44upx;border-bottom-left-radius: 44upx;}
		}
		.outCardCon{
			width: 50%;text-align: center;
			.outCard{width: 83%;height: 80upx;line-height: 80upx; background: #6B7AF8;border-top-right-radius: 44upx;border-bottom-right-radius: 44upx;}
		}
	}
//分享弹出框
.shareModelCon{
	width: 100%;height: 100%;position: fixed;top: 0;left: 0;z-index: 10; background:rgba(0,0,0,0.5) ;
	.selectList{
		position:absolute;bottom:0;width: 100%;font-size:28upx;color:#333333;font-family:PingFangSC;text-align:center;
		.toFriends{width: 100%;height:98upx;line-height: 98upx; border-bottom:1px solid #E1E1E1;background: #FFFFFF;}
		.toImg{width: 100%;height: 98upx;line-height: 98upx;background: #FFFFFF; }
		.cancel{width: 100%;margin-top: 13upx;height: 97upx;line-height: 97upx;background: #FFFFFF; }
	}
	
}
//消息提醒按钮
.notice{
	position:fixed;right:30upx;bottom: 60upx;z-index: 99;
	.noticeImg{width:100upx;height: 100upx;border-radius: 50%;}
	.number{
		font-size: 24upx;position:absolute;width:34upx;height: 34upx;line-height: 34upx;text-align: center;background:#FF5858;color:#FFFFFF;border-radius: 50%;top:0;right:0;
	}
}
</style>
