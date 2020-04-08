<template>
	<view class="w_container">
		<!-- 我的周报背景 -->
		<view class="bgCon" :style="{backgroundImage: 'url(http://card-1254165941.cosgz.myqcloud.com/cardImages/card/wee.png)'}">
			<view class="shijian">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/shijian.png'" mode="widthFix"></image>
				<text class="time">{{userReportMap.startTime}}-{{userReportMap.endTime}}</text>
			</view>
		</view>
		<!-- 标签 -->
		<view class="myLabel">
			<view class="infoCon fx-row fx-row-center fx-row-left">
				<image :src="userInfo.headImage" mode="widthFix"></image>
				<text class="name">{{userInfo.name}}</text>
			</view>
			<view class="labelCon fx-row fx-wrap fx-row-left fx-row-center">	
					<view class="label"  v-for="item of userReportMap.keyList" >{{item}}</view>
			</view>
		</view>
		<!-- 在线时长 -->
		<view class="onlineCon fx-column fx-row-center">
			<view class="titleCon">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/biaoti.png'" mode="widthFix"></image>
				<text class="title">在线时长</text>
			</view>
			<view class="table">
				<view class="tr fx-row fx-row-center fx-row-middle">
					<view class="th">本周在线时长</view>
					<view class="th">同比上周变化</view>
					<view class="th">员工排名</view>
				</view>
				<view class="trr fx-row fx-row-center fx-row-middle">
					<view class="td">{{userReportMap.onlineTime}}</view>
					<view class="td single-line">{{userReportMap.timePercent}}</view>
					<view class="td">
						<template v-if="reportData.timeRanking">
							No.<text>{{reportData.timeRanking}}</text>
						</template>
						<template v-else>--</template>
					</view>
				</view>
			</view>
			<view class="rank fx-row fx-row-space-between fx-row-center" v-if="timeFirst.name">
				<view class="rankLeft fx-row fx-row-center">
					<image :src="timeFirst.headImage" mode="widthFix"></image>
					<text class="name">{{timeFirst.name}}</text>
				</view>
				<text class="rankNum">员工No.1</text>
			</view>
		</view>
		<!-- 商品 -->
		<view class="goodsCon fx-column fx-row-center">
			<view class="titleCon">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/biaoti.png'" mode="widthFix"></image>
				<text class="title">商品</text>
			</view>
			<view class="table">
				<view class="tr fx-row fx-row-center fx-row-middle">
					<view class="th">本周商品分享次数</view>
					<view class="th">商品分享深度</view>
				</view>
				<view class="trr fx-row fx-row-center fx-row-middle">
					<view class="td">{{userReportMap.goodsShareCount}}</view>
					<view class="td">{{userReportMap.goodsShareSize}}</view>
				</view>
			</view>
			<!-- 商品列表 -->
			<view class="goodListCon">
				<view class="goods fx-row" v-for="item of shareList" :key="item.id">
					<image class="week-goods-cover" :src="item.cover_image" mode="aspectFill"></image>
					<view class="goodsInfo fx-column fx-row-space-between">
						<view class="name">{{item.title}}</view>
						<view class="num">分享{{item.goodsCount}}次</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 销售额 -->
		<view class="saleCon fx-column fx-row-center">
			<view class="titleCon">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/biaoti.png'" mode="widthFix"></image>
				<text class="title">销售额</text>
			</view>
			<view class="table">
				<view class="tr fx-row fx-row-center fx-row-middle">
					<view class="th">本周销售额</view>
					<view class="th">同比上周变化</view>
					<view class="th">员工排名</view>
				</view>
				<view class="trr fx-row fx-row-center fx-row-middle">
					<view class="td">¥{{userReportMap.saleAmount}}</view>
					<view class="td">{{userReportMap.salePercent}}</view>
					<view class="td">
						<template v-if="reportData.salesRanking">
							No.<text>{{reportData.salesRanking}}</text>
						</template>
						<template v-else>--</template>
					</view>
				</view>
			</view>
			<view class="rank fx-row fx-row-space-between fx-row-center" v-if="salesFirst.name">
				<view class="rankLeft fx-row fx-row-center">
					<image :src="salesFirst.headImage" mode="widthFix"></image>
					<text class="name">{{salesFirst.name}}</text>
				</view>
				<text class="rankNum">员工No.1</text>
			</view>
		</view>
	</view>
</template>

<script>
  export default {
    data() {
      return {
        onlineSite:this.global.onlineSite,
        labelList:[//标签列表
          {id:0,label:'交友满天下'},
          {id:1,label:'好人卡'},
          {id:2,label:'业务达人'},
          {id:3,label:'吃货'},
          {id:4,label:'好人卡'},
          {id:5,label:'业务大人'},
          {id:6,label:'交友满天下'},
        ],
        goodsList:[//商品列表
          {id:0,img:'http://card-1254165941.cosgz.myqcloud.com/cardImages/other/goods.jpg',name:'Dior/迪奥小姐花漾淡香水30/50/100ml',num:1200},
          {id:1,img:'http://card-1254165941.cosgz.myqcloud.com/cardImages/other/goods.jpg',name:'Dior/迪奥小姐花漾淡香水30/50/100ml',num:1200},
          {id:2,img:'http://card-1254165941.cosgz.myqcloud.com/cardImages/other/goods.jpg',name:'Dior/迪奥小姐花漾淡香水30/50/100ml',num:1200},
          {id:3,img:'http://card-1254165941.cosgz.myqcloud.com/cardImages/other/goods.jpg',name:'三只松鼠',num:1200},
          {id:4,img:'http://card-1254165941.cosgz.myqcloud.com/cardImages/other/goods.jpg',name:'Dior/迪奥小姐花漾淡香水30/50/100ml',num:1200},
        ],

		reportData: {
          salesFirst: {},
          salesRanking: 1,
          timeFirst: {},
          timeRanking: 1,
          userInfo: {},
          userReportMap: {
            startTime: '',
            endTime: '',
            goodsShareCount: 0,
            goodsShareSize: 0,
            keyList: [],
            onlineTime: 0,
            saleAmount: 0,
            salePercent: '',
            shareList: [],
            timePercent: '',
		  },
		},

      }
    },

	computed: {
      userInfo () {
        return this.reportData.userInfo || {};
	  },
      userReportMap () {
        return this.reportData.userReportMap || {};
	  },
      timeFirst () {
        return this.reportData.timeFirst || {};
	  },
      shareList () {
        return this.userReportMap.shareList || [];
	  },
      salesFirst () {
        return this.reportData.salesFirst || {};
	  },
	},

    mounted (){
      this.$api.getReportDetails().then(result => {
		    console.info(result)
			if(result.userReportMap){
				result.userReportMap.startTime = this.formatDate(result.userReportMap.startTime, 'YYYY-MM-DD');
				result.userReportMap.endTime = this.formatDate(result.userReportMap.endTime, 'YYYY-MM-DD');
				result.userReportMap.onlineTime = result.userReportMap.onlineTime + 'h';

				const timePercent = result.userReportMap.timePercent;
				result.userReportMap.timePercent = timePercent === 0 ? '无变化' : timePercent > 0 ? `增加${(timePercent * 100).toFixed(0)}%` : `减少${(Math.abs(timePercent * 100)).toFixed(0)}%`;

				const salePercent = result.userReportMap.salePercent;
				result.userReportMap.salePercent = salePercent === 0 ? '无变化' : salePercent > 0 ? `增加${(salePercent * 100).toFixed(0)}%` : `减少${(Math.abs(salePercent * 100)).toFixed(0)}%`;

				this.reportData = result;
			}
      }).catch(error => {
        this.showError(error);
      })
    },

    methods: {

    },

  }
</script>

<style lang="less" scoped>

	.td {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

.w_container{
	background:#E3EBFF;box-sizing:border-box;padding:0 0 30upx 0;
	.bgCon{
		background-position: 50%;background-size: 100%;background-repeat: no-repeat;
		width: 100%;height: 485upx;text-align:center;position:relative;
		.shijian{position:relative;padding-top:207upx;
			image{width: 362upx;height: 60upx;}
			.time{font-size: 24upx;font-family: ArialMT;color: #FFFFFF;position: absolute;top:80%;left:33%;}
		}
		
	}
	//标签
	.myLabel{
		width: 92%;margin: 0 auto;margin-bottom:30upx;margin-top:-140upx;position:relative;z-index: 1;
		.infoCon{
			height:140upx;border-radius:20upx 20upx 0px 0px;background:#F8F8F8;
			&>image{width:80upx;height: 80upx;padding: 0 30upx;}
			.name{font-size: 28upx;color: #666666;}
			}
		.labelCon{
			width: 100%; background: #FFFFFF;border-radius: 0 0 20upx 20upx;box-sizing: border-box;padding:40upx 30upx ;
				.label{
					height: 64upx;line-height: 64upx;box-sizing: border-box;padding:0 30upx;margin-right: 16upx;border-radius: 35upx;
					border: 1px solid #A5AFFF;color: #6B7AF8;background: #F8F8FF;font-size: 24upx;margin-bottom: 20upx;}	
		}
	}
	//在线时长
	.onlineCon{
		width: 92%;margin: 0 auto;box-sizing: border-box;padding: 40upx 30upx;background: #FFFFFF;border-radius: 20upx;
		.titleCon{margin-bottom:40upx;position:relative;
			image{width: 516upx;height: 24upx;}
			.title{font-size: 32upx;color: #333333;font-weight: bold;position:absolute;left:38%;top:5upx;}
		}
		//表格
		.table{
			width: 100%;border: 1px solid #DDDDDD; border-right:0;border-bottom: 0;
			.tr{
				background:#F8F8F8;
				.th{width: 33.3%;height: 88upx;line-height: 88upx; font-size: 24upx; color: #666666;text-align: center;border-bottom: 1px solid #DDDDDD;border-right: 1px solid #DDDDDD;}
			}
			.trr{
				background:#FFFFFF;
				.td{width: 33.3%;height: 124upx;;line-height: 124upx; font-size: 36upx;color: #6B7FF8;text-align: center;border-bottom: 1px solid #DDDDDD;border-right: 1px solid #DDDDDD;}
			}
		}
		.rank{
			width: 100%;height: 140upx;margin-top: 30upx;border-radius: 4upx;background: #F8F8F8;box-sizing: border-box;padding: 0 30upx;
			.rankLeft{
				&>image{width: 80upx;height: 80upx;margin-right: 30upx;}
				.name{font-size: 28upx;color: #666666;}
			}
			.rankNum{font-size: 24upx;color: #6B7AF8;}
		}
	}
	//商品
	.goodsCon{
		width: 92%;margin: 30upx auto;box-sizing: border-box;padding: 40upx 30upx;background: #FFFFFF;border-radius: 20upx;
		.titleCon{margin-bottom:40upx;position:relative;
			image{width: 516upx;height: 24upx;}
			.title{font-size: 32upx;color: #333333;font-weight: bold;position:absolute;left:44%;top:5upx;}
		}
		//表格
		.table{
			width: 100%;border: 1px solid #DDDDDD; border-right:0;border-bottom: 0;
			.tr{
				background:#F8F8F8;
				.th{width: 50%;height: 88upx;line-height: 88upx; font-size: 24upx; color: #666666;text-align: center;border-bottom: 1px solid #DDDDDD;border-right: 1px solid #DDDDDD;}
			}
			.trr{
				background:#FFFFFF;
				.td{width: 50%;height: 124upx;;line-height: 124upx; font-size: 36upx;color: #6B7FF8;text-align: center;border-bottom: 1px solid #DDDDDD;border-right: 1px solid #DDDDDD;}
			}
		}
		.goodListCon{
			width: 100%;
			margin-top: 30upx;
			.goods{
				width: 100%;border-radius: 4upx;box-sizing: border-box;padding: 30upx;margin-bottom: 16upx;background:#F8F8F8;
				&>image{width: 160upx;height: 160upx;margin-right: 30upx;}
				.goodsInfo{
					flex: 1;
					.name{font-size:30upx;color: #333333;}
					.num{font-size:24upx;color: #666666;}
				}
			}
		}
		
	}

	//销售额
	.saleCon{
		width: 92%;margin: 0 auto;box-sizing: border-box;padding: 40upx 30upx;background: #FFFFFF;border-radius: 20upx;
		.titleCon{margin-bottom:40upx;position:relative;
			image{width: 516upx;height: 24upx;}
			.title{font-size: 32upx;color: #333333;font-weight: bold;position: absolute;left:41%;top:5upx;}
		}
		//表格
		.table{
			width: 100%;border: 1px solid #DDDDDD; border-right:0;border-bottom: 0;
			.tr{
				background:#F8F8F8;
				.th{width: 33.3%;height: 88upx;line-height: 88upx; font-size: 24upx; color: #666666;text-align: center;border-bottom: 1px solid #DDDDDD;border-right: 1px solid #DDDDDD;}
			}
			.trr{
				background:#FFFFFF;
				.td{width: 33.3%;height: 124upx;;line-height: 124upx; font-size: 36upx;color: #6B7FF8;text-align: center;border-bottom: 1px solid #DDDDDD;border-right: 1px solid #DDDDDD;}
			}
		}
		.rank{
			width: 100%;height: 140upx;margin-top: 30upx;border-radius: 4upx;background: #F8F8F8;box-sizing: border-box;padding: 0 30upx;
			.rankLeft{
				&>image{width: 80upx;height: 80upx;margin-right: 30upx;}
				.name{font-size: 28upx;color: #666666;}
			}
			.rankNum{font-size: 24upx;color: #6B7AF8;}
		}
	}

	.week-goods-cover {
		width:160upx;
		height:160upx;
	}

}

</style>
