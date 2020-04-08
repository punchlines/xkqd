<template>
	<view class="container">
		<view class="treatList fx-row fx-row-center" v-for="(item,index) of treatList" :key="index">
			<image :src="item.isSelect?'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/chose.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/chose_un.png'" mode="widthFix" @click="getSelect(index)"></image>
			<view class="cardCon fx-row fx-row-space-between">
				<default-image :src="item.headImage" custom-class="aa"></default-image>
				<view class="info fx-column fx-row-space-between">
					<view class="name">{{item.name}}</view>
					<view class="detail">{{item.job}} | {{item.company}}</view>
				</view>
				<view class="collect" @click="collect(item, index)">收藏</view>
			</view>
		</view>
		<view v-if="treatList.length==0" class="default fx-row fx-row-center">
			<view class="DefaultImage">
				<default-page  :messageToPage="messageToPage"></default-page>
			</view>
		</view>
		<!-- 批量处理 -->
		<wx-view custom-class="allCon fx-row fx-row-center fx-row-space-between">
			<view class="allCon fx-row fx-row-center fx-row-space-between">
			<view class="allSelect fx-row fx-row-center">
				<image :src="allSelect?'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/chose.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/chose_un.png'" mode="widthFix"  @click="allGet"></image>
				<text class="txt">全选</text>
			</view>
			<view class="right fx-row">
				<view class="alldel" @click="alldel">全部删除</view>
				<view class="allCollect" @click="allCollect">全部收藏</view>
			</view>
			</view>
		</wx-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				onlineSite:this.global.onlineSite,
				treatList:[],
				allSelect:false,
				list:[],
				messageToPage:{
					image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png',
					title:'您当前没有待处理名片'
				},
			};
		},
		methods: {
			listMyCardWalletPengding(){
				this.$api.listMyCardWallet(0,1).then(result => {
					for(let i=0; i < result.collectList.length; i++){
							result.collectList[i].isSelect = false;
					  }
					  this.treatList = result.collectList
					}).catch(error => {
						console.error(error)
					})
			},
			insertPendingCard(list, index){//收藏待处理名片
				this.$api.insertPendingCard(JSON.stringify(list)).then(result => {
						this.showTips('收藏成功');
						this.notifyPrevPageUpdate();
						if (index !== undefined) {
							this.treatList.splice(index, 1)
						} else {
							this.listMyCardWalletPengding();
						}
					}).catch(error => {
						console.error(error)
					})
			},
			deletePendingCard(){//删除待处理名片
				this.$api.deletePendingCard(JSON.stringify(this.list)).then(result => {
					this.showTips('删除成功');
					this.listMyCardWalletPengding();
					this.notifyPrevPageUpdate();
					}).catch(error => {
						console.error(error)
					})
			},
			getSelect(index){
				this.treatList[index].isSelect = !this.treatList[index].isSelect;
				this.checkSelect()
			},
			checkSelect(){//判断是否是全选
				var temp = [];
				var temp1 = [];
				for(let i=0; i < this.treatList.length; i++){
					if(this.treatList[i].isSelect == true){
						temp.push(this.treatList[i].id)
					}
				}
				temp1 = temp;
				this.list = temp1;
				if(temp.length == this.treatList.length){
					this.allSelect=true;
				}
				else{
					this.allSelect=false;
				}
				temp=[];//清空原数组
			},

			allGet(){//全选
				var aa=[];
				this.allSelect = !this.allSelect;
				if(this.allSelect == false){
					for(let i=0;i<this.treatList.length;i++){
						this.treatList[i].isSelect=false;
						aa=[]
					}
					this.list = aa;
				}
				else{
					for(let i=0;i<this.treatList.length;i++){
						this.treatList[i].isSelect=true;
						aa.push(this.treatList[i].id)
					}
					this.list = aa;
				}
			},
			alldel(){//全部删除
				if (this.list.length === 0) {
					this.showTips('请选择要删除的名片')
					return;
				}
				this.deletePendingCard();

			},
			allCollect(){//全部收藏
				if (this.list.length === 0) {
					this.showTips('请选择要收藏的名片')
					return;
				}
				this.insertPendingCard(this.list);
			},

			collect (item, index) {
				this.insertPendingCard([item.id], index);
			},

			notifyPrevPageUpdate () {
				var pages = getCurrentPages();
				var page = pages[pages.length - 2];
				console.log(page)
				if (page) {
					console.log(page.$vm)
					console.log(page.$vm.needUpdate)
					page.$vm.needUpdate = true;
				}
			},

		},
		  //注册组件
		  components:{
		   
		  },
		//监听计算属性
		  computed: {
		   
		  },


		// 监听页面加载
		  onLoad: function () {
		   	this.listMyCardWalletPengding();
		  },


	}
</script>

<style lang="less">

	@import "../../css/jss_base.less";
	page{
		background:#F5F5F5;
	}
	.container{
		width:100%;padding:30upx 0 100upx 0;
		.treatList{
			margin-bottom:30upx;box-sizing:border-box;padding:0 30upx;
			&>image{width: 34upx;height: 34upx;margin-right: 20upx;}
			.cardCon{
				width:90%; position: relative;background:#FFFFFF;box-sizing:border-box;padding:40upx;border-radius: 8upx;
				.aa{width: 100upx;height: 100upx;margin-right:30upx;}
				.info{width:75%;
					.name{font-size: 32upx;color: #333333;}
					.detail{
						width:100%; font-size: 24upx;color: #999999;
						.ellipsis();//超出部分显示...
						}
				}
			.collect{position:absolute;top:20upx;right:-20upx; width: 110upx;height: 48upx;
				line-height:48upx;background: #6B7AF8;font-size: 24upx;color: #ffffff;text-align: center;
				}
			}
		}
		.default{
			position: fixed;top:50%;left:50%;margin-top:-86upx;margin-left:-115upx;
		}
		.allCon{
			width:100%;height:98upx; background: #FFFFFF;font-size: 28upx;font-family: PingFangSC;box-sizing:border-box;padding:0 30upx;
			position: fixed;bottom: 0;
			.allSelect{
				&>image{width: 34upx;height: 34upx;margin-right: 12upx;}
				.txt{line-height: 34upx;color: #333333;}
			}
			.right{
				.alldel{
						width: 200upx;height: 70upx;line-height: 70upx;text-align: center; border-radius: 35upx;
						border: 1px solid #AAAAAA;color: #666666;
					}
				.allCollect{
						width: 200upx;height: 70upx;line-height: 70upx;text-align: center; border-radius: 35upx;
						border: 1px solid #9CA6FB;color: #6B7AF8;margin: 0 0 0 30upx;
					}
			}

		}

	}

</style>
