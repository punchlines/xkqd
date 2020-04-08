<template>
	<view class="group" >
		<view class="tuan"  @tap.native.stop="gotoDetail">
			<view class="title">拼团商品</view>
			<view class="tuanTop">
				<view class="topImg">
					<image :src="item.cover"></image>
				</view>
				<view class="topGoods">
					<view class="tuanName  fx-row fx-row-center">
						<text>团长昵称:</text>
						<text class="name">{{item.userName}}</text>
					</view>
					<view class="tuanName fx-row fx-row-center">
						<text>拼团商品:</text>
						<text class="goodsName">{{item.goodsName}}</text>
					</view>
					<view class="tuanName  fx-row fx-row-center">
						<text>商品价格:</text>
						<text class="goodsPrice">￥{{item.preferentialPrice}}</text>
						<text class="benPrice" style="margin-left: 10rpx;">￥{{item.originalPrice}}</text>
					</view>
				</view>
				<view class="overTime">
					<template v-if="item.endType==0">
						<view class="over">距离结束</view>
						<text class="hour">{{endArr[0]}}</text>:
						<text class="min">{{endArr[1]}}</text>:
						<text class="second">{{endArr[2]}}</text>
					</template>
				
					<view v-else class="over">售完即止</view>
					
				</view>
			</view>
			<view class="tuanFoot">
				<view class="tuanNum">
					<view class="number">已购数量:
						<text class="now">{{item.purchasedNum}}</text>
						<text class="total">/{{lev}}</text>
					</view>
					<view class="numImg">
						<image v-for="(item,index) in item.images" :key="index" :src="item"></image>
					<!-- 	<image src="../static/vip/poster.png"></image> -->
					</view>
				</view>
				<view class="getPrice">团队成员已经享受<text>{{item.conditionVos[item.rebateLevel].rebateAmount}}</text>元返现</view>
				<view class="share">
					<view class="rule">{{conditionVostring}}</view>
						
						<button v-if="item.endTime>0 && canClick" class="shareFri" @click.stop="share" style="padding: 0;"  type="pain">分享好友</button>
						<button v-else-if="item.endTime>0 && !canClick" class="shareFri"  style="padding: 0;" @click.stop="gotoDetail"  type="pain">马上参与</button>
						<view class="shareFri disable" v-else-if="item.endTime<=0">已结束</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	
	export default{
		data(){
			return{
				endTime:0,
				timer:null
			}
		},
		computed: {
			lev() {
				return this.item.conditionVos[this.item.rebateLevel+1>=this.item.conditionVos.length?this.item.rebateLevel:this.item.rebateLevel+1].targetNum;
			},
			conditionVostring(){
				return this.item.conditionVos.map(it=>`满${it.targetNum}人每人返现${it.rebateAmount}元`).join(',');
			},
			endArr(){
				let sec = this.item.endTime % 60;
				if(String(sec).length<2) sec = '0'+sec;
				let min = ~~(this.item.endTime%3600/60);
				if(String(min).length<2) min = '0'+min;
				let hour = ~~(this.item.endTime/3600);
				if(String(hour).length<2) hour = '0'+hour;
				return [hour,min,sec];
			}
			
		},
		props: {
			item: {
				type: Object,
				default: null
			},
			name:String,
			hmp:Boolean,
			canClick:{ //如果是在邀请页面是不可点击的
				type:Boolean,
				default:true
			}
		},
		
		
		
		created(){
			//计算倒计时时间
			// this.endTime = this.item.overTime - new Date().getTime();
			// this.endTime = this.endTime<=0?0:~~(this.endTime/1000);
			// this.$forceUpdate();
			this.timer = setInterval(()=>{
				
				if(this.item.endTime<=0){
					clearInterval(this.timer);
					return;
				}
				this.$emit("reduce")
				// this.item.endTime--;
				
			},1000)
			// this.countDown();
			
		},
		
		
	
		destroyed(){
			clearInterval(this.timer);
			// this.endTime = 0;
		},
		
		methods: {
			share(){
				this.$emit('share',this.item)
			},
			
			gotoDetail(e) {
				// if(!this.canClick) return;
				if(e.target.id.indexOf("shareBtn")!=-1){
					return
				}
				if(this.item.endTime<=0){
					this.showTips('拼团已结束');
					return;
				}
				
				let id = this.item.id;
				this.navigateTo('/item_pinGroup/businessCC_joinGroup/businessCC_joinGroup',{id});
			}
		},
	}
	
</script>

<style lang="less" scoped>
	.group{
		width: 690upx;
		height: 100%;
		margin-top: 25upx;
	
		.title{
			font-size:30upx;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:#666;
			line-height:18upx;
			margin-left: 20upx;
		}
		.tuan{
			height: 316upx;
			padding: 30upx 0upx;
			background:rgba(255,255,255,1);
			border-radius:5upx; 
		}	
		.tuanTop{
			width: 670upx;
			height: 158upx;
			margin: 0 auto;
			border-bottom: 1upx solid rgba(243,234,234,1);
			display: flex;
			.topImg{
				width: 120upx;
				height: 120upx;
				image{
					width: 120upx;
					height: 120upx;
					margin-top: 19upx;
				}
			}
			.topGoods{
				margin-top: 19upx;
				margin-left: 15upx;
				.tuanName{
					font-size:28upx;
					font-family:PingFangSC-Regular;
					font-weight:bold;
					color:rgba(102,102,102,1);		
					margin-top: 6rpx;
					&:nth-of-type(1){
						margin-top: 0;
					}
					.name,.goodsName{
						font-size: 26upx;
						color: #999;
						margin-left: 10upx;
					}
					.goodsName{
						display: inline-block;
						width: 260upx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}	
					.goodsPrice{
						color: #ff0000;
						font-size: 28upx;
						margin-left: 10upx;
					}
					.benPrice{
						font-size:18upx;
						font-family:PingFangSC-Regular;
						font-weight:bold;
						color:rgba(153,153,153,1);
						text-decoration:line-through;
					}
				}
			}
			.overTime{
				.over{
					font-size: 24upx;
					font-weight: bold;
					font-family:PingFangSC-Regular;
					color:rgba(0,0,0,1);
					text-align: center;
					margin-top: 10upx;
				}
				.hour,.min,.second{
					line-height: 40rpx;
					display: inline-block;
					width:40upx;
					height:40upx;
					background:linear-gradient(0deg,rgba(166,176,255,1),rgba(107,122,248,1));
					// box-shadow:0upx 1upx 5upx 0upx #3d4ac2;
					border-radius:8upx;
					color: #fff;
					font-size: 24upx;
					text-align: center;
				}				
			}
			
		}
		.tuanFoot{
			width: 670upx;
			height: 158upx;
			margin: 0 auto;
			margin-top: 18upx;
			.tuanNum{
				height: 45upx;
				.number{
					float: left;
					font-size:28upx;
					font-family:PingFangSC-Regular;
					font-weight:bold;
					color:rgba(102,102,102,1);
					.now{
						margin-left: 10upx;
						color: #ff0000;
					}
					.total{
						color: #666;
					}
				}
				.numImg{
					float: right;
					
					image{
						width: 50upx;
						height: 50upx;
						border-radius: 50%;
					}
				}
			}
			.getPrice{
				font-size:28upx;
				font-family:PingFangSC-Regular;
				font-weight:bold;
				color:rgba(0,0,0,1);
				text{
					color: #ffbb45;
					font-size: 29upx;
				}
			}
			.share{
				display: flex;
				.rule{
					width: 375upx;
					font-size: 20upx;
					font-weight: bold;
					color: #999;
				}
				.shareFri{
					width: 180upx;
					height: 50upx;
					text-align: center;
					background:linear-gradient(0deg,rgba(254,211,108,1),rgba(255,187,69,1));
					box-shadow:0px 3px 4px 0px #b1880a;
					border-radius:25upx;
					font-size:30upx;
					font-family:PingFangSC-Regular;
					font-weight:bold;
					color:rgba(255,255,255,1);
					margin-left: 116upx;
					line-height: 50upx;
					&.disable{
						background: #999;
						box-shadow:0px 3px 4px 0px rgba(0,0,0,0.3);
					}
				}
			}
		}
	}
</style>
