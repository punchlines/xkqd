<template>
	<view class="r_container">
		<!-- 头部 -->
		<view class="headerCon">		
			<!-- 类别 标题切换-->
			<!-- :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/baiyin.png'" -->
			<view class="menuCon fx-row fx-row-center">
				<view v-for="(item,index) in auditTitleBox.auditTitle" :key="index" @tap="changeTitle($event,index)" 
					:class="{'ATname':true,'ATactive':audiTitleActive==index}" class="title">{{item.title}}</view>
			</view>
			<!-- 排行榜图片 销售额-->
			<view class="rankCon">
				<view class="second fx-column fx-row-center fx-row-space-around">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/2.png'" mode="widthFix" class="se"></image>
					<image :src="rank2.headImage" mode="widthFix"></image>
					<text class="name">{{ rank2.name }}</text>
					<view class="rankNum bg">2</view>
				</view>
				<view>
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/shadow.png'" mode="widthFix" class="shadow"></image>
				</view>
				<view class="first fx-column fx-row-center fx-row-space-around">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/1.png'" mode="widthFix" class="fi"></image>
					<image :src="rank1.headImage" mode="widthFix"></image>
					<text class="name">{{ rank1.name }}</text>
					<view class="rankNum bg">1</view>
				</view>
				<view class="third fx-column fx-row-center fx-row-space-around">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/3.png'" mode="widthFix" class="th"></image>
					<image :src="rank3.headImage" mode="widthFix"></image>
					<text class="name">{{ rank3.name }}</text>
					<view class="rankNum bg">3</view>
				</view>
			</view>
			<!-- 排行榜图片 客户数-->
			<!--<view class="rankCon" v-if="audiTitleActive==1">-->
				<!--<view class="second fx-column fx-row-center fx-row-space-around">-->
					<!--<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/2.png'" mode="widthFix" class="se"></image>-->
					<!--<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/ava.png'" mode="widthFix"></image>-->
					<!--<text class="name">小红</text>-->
					<!--<view class="rankNum bg">2</view>-->
				<!--</view>-->
				<!--<view class="first fx-column fx-row-center fx-row-space-around">-->
					<!--<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/1.png'" mode="widthFix" class="fi"></image>-->
					<!--<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/ava.png'" mode="widthFix"></image>-->
					<!--<text class="name">小黄</text>-->
					<!--<view class="rankNum bg">1</view>-->
				<!--</view>-->
				<!--<view class="third fx-column fx-row-center fx-row-space-around">-->
					<!--<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/3.png'" mode="widthFix" class="th"></image>-->
					<!--<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/ava.png'" mode="widthFix"></image>-->
					<!--<text class="name">小兰</text>-->
					<!--<view class="rankNum bg">3</view>-->
				<!--</view>-->
			<!--</view>-->
		</view>
		<!-- 排名列表 -->
		<view class="listCon">
			<view class="list fx-row fx-row-space-between fx-row-center" v-for="(item, index) of rankList2" :key="item.id" @click="lookCard">
				<view class="fx-row fx-row-center">
					<image :src="item.headImage" mode="widthFix"></image>
					<text class="name">{{item.name}}</text>
				</view>
				<text class="num">{{ index + 4 }}</text>
			</view>
		</view>
	</view>
</template>

<script>
  export default {
    name:'myRank',
    props:['value3'],

    data() {
      return {
        onlineSite:this.global.onlineSite,

        saleList: [],
        customerList: [],

        //标题
        auditTitleBox:{
          auditTitle:[
            {id:0,title:'销售额'},{id:1,title:'客户数'}
          ],
        },
        audiTitleActive:0,   //切换标题
      };
    },

	computed: {
      rank1 () {
        return this.rankList[0] || {};
	  },
	  rank2 () {
        return this.rankList[1] || {};
	  },
	  rank3 () {
        return this.rankList[2] || {};
	  },
      rankList () {
        if (this.audiTitleActive === 0) {
          return this.saleList || [];
        } else {
          return this.customerList || []
		}
	  },
	  rankList2 () {
      	return this.rankList.slice(3)
	  },
	},

    mounted () {
      this.$api.getReportRanking().then(result => {
        this.saleList = result.saleList;
        this.customerList = result.customerList;
      }).catch(error => {
        this.showError(error);
      })
    },

    methods: {
      //点击事件
      lookCard(){
        uni.navigateTo({
          url: '/pages/businessCard/businessCard'
        });
      },
      //切换标题
      changeTitle(e,index){
        this.audiTitleActive=index;
      },

    },

  }
</script>

<style lang="less">

@import "../../css/jss_base.less";
.r_container{
	background:#F5F5F5;font-family: PingFangSC;
	.headerCon{
		width:100%;height:505upx;margin-bottom: 24upx; box-sizing: border-box;padding:0 30upx 20upx 30upx;background:linear-gradient(180deg,rgba(255,100,113,1) 0%,rgba(255,185,117,1) 100%);
		.menuCon{
			.title{width: 50%; font-size: 30upx;color: #FFFFFF;padding-bottom: 5upx;text-align: center;position: relative;margin:30upx 0;}
			.ATactive{font-size: 30upx;color: #FFFFFF;}
			.ATactive::after{position: absolute;content: '';width: 80upx;height: 6upx;left: 50%;bottom: -6upx;margin-left: -40upx;  border-radius: 3upx;background: #FFFFFF;}
		}
		.rankCon{
			display: flex;flex-direction: row;align-items: flex-end;justify-content: center;margin-top:40upx;text-align: center;
			.name{font-size: 28upx;color: #666666;width:70%;.ellipsis();}
			.rankNum{width: 36upx;height: 36upx;line-height: 36upx;text-align: center; font-size:24upx;border-radius: 50%;color: #FFFFFF;}
			.second{
				width: 216upx;height:304upx;background: #FFFFFF;box-sizing: border-box;padding: 30upx;border-radius: 10upx 0 0 10upx;
				image{width: 90upx;height: 90upx;}
				.se{width: 40upx;height: 24upx;}
				.bg{background: #B4C4D9;}
			}
			.shadow{width:286upx;height: 280upx;position: absolute;top:280upx;left:50%;margin-left:-143upx;}
			.first{
				width: 258upx;height:334upx;background: #FFFFFF;box-sizing: border-box;padding: 30upx;border-radius: 10upx 10upx 0 0;position: relative;z-index: 1;
				image{width: 120upx;height: 120upx;}
				.fi{width: 50upx;height: 30upx;}
				.bg{background: #FFBD0B;}
				}
			.third{
				width: 216upx;height: 302upx;background: #FFFFFF;box-sizing: border-box;padding: 30upx;border-radius: 0 10upx 10upx 0;
				image{width: 90upx;height: 90upx;}
				.th{width: 40upx;height: 24upx;}
				.bg{background:#F7A86E;}
				}
		}
			
	}
	//排名列表
	.listCon{
		width:100%;background:#ffffff;box-sizing:border-box;padding:0 30upx;
		.list{height:160upx;border-bottom:1px solid #E1E1E1;
			image{width: 80upx;height: 80upx;margin-right: 30upx;}
			.name{font-size: 28upx;color: #333333;}
			.num{font-size:40upx;font-family:Arial-ItalicMT;font-weight:normal;color: #B78C31;font-style: italic}
		}
	}
	
}
</style>
