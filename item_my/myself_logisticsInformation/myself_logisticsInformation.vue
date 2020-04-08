<template>
	<view class="container">
		<view>
			<!-- 物流信息头部 -->
			<view  class="Header fx-row fx-row-top fx-row-space-around fs6a24">
				<view class="Himage">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/wuliu.png'"></image>
				</view>
				<view class="HlogisticsCode"> 
					<view class="HlogTitle">物流单号：{{expressNum}}</view>
					<view class="HlogCompany">物流公司：{{expressCompany}}</view>
				</view>
				<view class="Hcopy">
					<view class="HcopyText" @click="copyBtn">复制</view>
				</view>
			</view>
			<!-- 物流进度显示 -->
			<view class="logisticsProgress" v-if="getLogisticsData.length>1">
				<view class="LogisticsBox">
					<view class="LogItem" v-for="(item,index) in getLogisticsData" :key="index">
						<view class="LogTitle fs3a28">{{item.context}}</view>
						<view class="LogTime fs9a24"><text v-if="index==0">签收时间：</text> {{item.time}}</view>
						<view class="LogCicle" v-if="index==0">
							<view class="LCMinCicle"></view>
						</view>
						<view class="LogCicle LogCicle1" v-if="index!==0">
							<view class="LCMinCicle"></view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="showDefaultPage" class="default">
				<view class="Image">
					<default-page  :messageToPage="messageToPage"></default-page>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				onlineSite:this.global.onlineSite,
				getLogisticsData:[],
				showDefaultPage:false,
				messageToPage:{
					image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/dingdan.png',
					title:'您的订单查询无结果，请隔段时间再查'
				},
				logiCompanyCode:'',//物流公司编号 yuantongkuaiyun
				childId:0,//订单id 205
				expressNum:'',//物流单号  803631733146107174
				expressCompany:'',//物流公司 圆通快运
				
			};
		},
		onLoad(e) {
			
			
			if(e.childId){
				this.childId=e.childId;
				console.log('订单id：'+e.childId);
			}
			
			if(e.childId){
				this.getLogistics();
			}
		},
		methods:{
			// 复制信息
			copyBtn(){
				uni.setClipboardData({
				 //准备复制的数据
				  data: this.expressNum,
				  success:(res)=> {
					uni.showToast({
					  title: '复制成功',
					});
				  }
				});
			},			
			
			// 查询订单物流 com:快递公司的编码    num:快递单号
			getLogistics(){
				//console.info(this.logiCompanyCode,this.expressNum);
				this.showLoading();
				this.$api.getLogistics(this.childId).then(res=>{
					console.info(res);
					this.hideLoading();
					if(!!res){
						
						this.expressNum = res.fcn
						this.expressCompany =res.fnum;
						this.getLogisticsData = res.info;
					}else this.showDefaultPage = true;
				}).catch(error=>{
					this.hideLoading();
					this.showError(error);
				})
			},
		}
	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	page{height: 100%;background:@grayBg;}
	.container{
		width:100%;border-top:1upx solid #eee;
		// 头部物流公司
		.Header{
			border-bottom:1upx solid #E1E1E1;padding:30upx;
			.Himage{
				width:13%;
				image{width:72upx;height: 72upx;}
			}
			.HlogisticsCode{
				width:72%;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;
				.HlogTitle{color:#000;font-size:30upx;margin-bottom:20upx;}
			}
			.Hcopy{
				width:15%;text-align: right;
				.HcopyText{
					width:100upx;height: 46upx;text-align: center;line-height: 46upx;border:1upx solid #aaa;border-radius: 23upx;
				}
			}
		}
		// 物流进度显示
		.logisticsProgress{
			margin:30upx 0;padding:40upx;
			.LogisticsBox{
				.LogItem{
					padding:0 30upx 30upx 50upx;line-height: 40upx;border-left: 1upx solid #ccc;position: relative;
					.LogCicle{
						width:32upx;height: 32upx;position: absolute;top:0upx;left:-16upx;background: #D5D9FF;border-radius:50%;
						.LCMinCicle{width:20upx;height: 20upx;background: #6B7AF8;border-radius: 50%;margin-top:7upx;margin-left:7upx;}
					}
					.LogCicle1{
						background:none;
						.LCMinCicle{background:#ccc;}
					}
				}
				.LogItem:last-child{border:none;}
			}
		}
		.default{
			width:100%;position: fixed;height:240upx;box-sizing: border-box;top:50%;left:50%;
			.Image{
				width:100%;position: absolute;margin-top:-120upx;margin-left:-50%;
			}
		}
	}
</style>
