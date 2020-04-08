<template>
	<view class="container">
		<view class="title fs3a32">允许朋友查看日志的范围</view>
		<view class="logBox">
			<view class="LogList fx-row fx-row-center fx-row-space-around" v-for="(item,index) in logList" :key="index" @click="selectPrivary(index,item.title)">
				<view class="LogImage" @click.stop="selectPrivary(index,item.title)">
					<image :src="item.show?'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose_un.png'"></image>
				</view>
				<view class="LogTitle fs3a30">{{item.title}}</view>
			</view>
			<view class="agreeBtn" @click="agreePrivacy">
				<view class="btn">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logList:[
					{id:0,title:'全部可见',show:true},
					{id:1,title:'3天内可见',show:false},
					{id:2,title:'半年内可见',show:false},
					{id:3,title:'一年内可见',show:false}
				],
				privaryIndex:1,
				privaryTitle:'全部可见',
			};
		},

	  onLoad () {
        this.$api.getUserInfor(this.currentUser.id).then(result => {
          const user = result.userMap;
          let journalList=['全部可见','3天内可见','半年内可见','一年内可见'];
          this.privaryIndex = Number(user.journalType);
          this.logList[0].show = false;
          this.logList[this.privaryIndex - 1].show = true;
        }).catch(error => {
          this.showError(error);
        })
	  },

		methods:{
			// 选择隐藏范围
			selectPrivary(index,title){
				this.privaryIndex=index+1;
				this.privaryTitle=title;
				console.log(this.privaryIndex);
				for(let i of this.logList){
					i.show=false;
				}
				this.logList[index].show=true;
			},
			// 确定提交
			agreePrivacy(){
				this.$api.updateJournalStatus(this.privaryIndex).then(res=>{
					console.log(res);
					this.showTips('设置成功').then(res=>{})	
					uni.navigateBack();
				})
			},
			
		}
	}
</script>

<style scoped lang="less">
	@import '../../css/mzl_base.less';

	page{background: #fff;;width:100%;height:100%;}
	.container{
		border-top:1upx solid #E1E1E1;
		.title{text-align: center;padding:30upx;font-weight: 600;}
		.logBox{
			.LogList{
				padding:30upx;
				.LogImage{
					width:12%;
					image{width:30upx;height: 30upx;vertical-align: middle;}
				}
				.LogTitle{width:88%;text-align: left;}
			}
		}
		.agreeBtn{
			width:100%;position: fixed;bottom:0;height: 100upx;background: #fff;border-top:1upx solid #E1E1E1;
			.btn{
				.buttonRadius();margin:6upx auto;font-size: 32upx;color:#fff;
			}
		}
	}
	
</style>
