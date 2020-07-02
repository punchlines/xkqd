<template>
	<view>
		<view class="select_Type">
			<view class="select_value" v-for="(item,index) in list" :key="item.id" @click="selects(item.id,index)" :style="{background:typeId==item.id?'#cccccc':'#ffffff'}">
				{{item.title}}
			</view>
		</view>
		<view class="text_Type">
			<textarea value="" :placeholder="tips" v-model="content" class="textarea" />
			</view>
		<view class="add_Img">
			<view style="display: flex;flex-direction: row;flex-wrap: wrap; ">
				<image class="GoodsImgsClass" :src="item" lazy-load mode="aspectFill" v-for="(item,index) of reportImg" @click="goodsImgClick(index,idcardFront,1)"
				 :key='item'></image>
				<image v-if="reportImg.length<5" style="width: 200upx;height: 200upx;margin: 0;padding:20upx 20upx 0 0;" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/add.png'"
				 @click="upGoodsImgTap(1)" lazy-load></image>
			</view>
		</view>
		<view class="subitem" @click="sub">
			提交
		</view>
	</view>
</template>

<script>
	import {
		upVideo,
		upImg,
		uploadFile,
		formatTime
	} from '../../js/mzl.js'
	export default {
		data() {
			return {
				tips:'填写举报理由,可提升举报成功率',
				content:'',
				reportImg: [], //举报图片
				liveId:'',
				anchorUserId:'',
				list:[],
				typeId:''
				}
			},
			onLoad(option) {
				this.anchorUserId=option.anchorUserId
				this.liveId=option.liveId
				console.log(option)
				this.$api.getReportTypeList(this.liveId,this.anchorUserId)
					.then(res=>{
						this.list=res
					})
			},
			methods:{
				//点击
				goodsImgClick(index, arr, type) {
					console.info(index)
					let that = this
					uni.showActionSheet({
						itemList: ['预览', '删除'],
						success: function(res) {
							if (res.tapIndex == 0) {
								that.previewImage(index, arr, type)
							} else {
								that.delImg(index, arr, type)
							}
						},
						fail: function(res) {
							console.log(res.errMsg);
						}
					});
				},
				upGoodsImgTap(type) {
					let that = this;
					console.log(type)
					let count = type == 1 ? 3 : 1;
					upImg((res) => {
						console.info(res)
						if (type == 1) {
							if (that.reportImg.length >= 5)
								return
							//that.GoodsImgs.push(res)
							that.reportImg = that.reportImg.concat(res)
							console.log(that.reportImg)
						} 
					}, count);
				},
				selects(id,index){
					console.log(id)
					if(id==1){
						this.typeId=1
					}
					else if(id==2){
						this.typeId=2
					}
					else if(id==3){
						this.typeId=3
					}
					else if(id==4){
						this.typeId=4
					}
				},
				sub(){
					this.$api.reportAnchor(this.liveId,this.anchorUserId,this.typeId,this.content,this.reportImg)
						.then(res=>{
							console.log('举报成功',res)
						})
				}
				
			}
		}
	
</script>

<style>
	page{
	background-color:#F5F5F5;
	
	}
	.select_Type{
		display: flex;
		flex-wrap: wrap;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}
	.select_value{
		background-color: #FFFFFF;
		text-align: center;
		width: 30%;
		height: 60rpx;
		border-radius: 10rpx;
		margin-left: 20rpx;
		margin-top: 30rpx;
		padding-top: 20rpx;
	}
	.text_Type{
		margin-left: 42rpx;
		margin-right: 42rpx;
		border: 1px solid #cccc;
		padding: 20rpx;
		margin-top: 40rpx;
	}
	.textarea{
		width: 100%;
		height: 400rpx;
	}
	.GoodsImgsClass {
		width: 200upx;
		height: 200upx;
		margin: 0;
		padding: 20upx 20upx 0 0;
	}
	.add_Img{
		margin-left: 40rpx;
		margin-top: 30rpx;
	}
	.subitem{
		background-color: #5B77FE;
		position: fixed;
		bottom: 150rpx;
		left: 40rpx;
		right: 40rpx;
		height: 65rpx;
		text-align: center;
		padding-top: 25rpx;
		color: #FFFFFF;
		border-radius: 45rpx;
	}
</style>
