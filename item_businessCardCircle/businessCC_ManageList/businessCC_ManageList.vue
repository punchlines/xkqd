<template>
	<view class="content">
		<view class="img">
			<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.NkasX01zzYyJ52b2007bf7943f660883f86ad4fc8135.png"
			 mode="" style="width: 250rpx;height: 269rpx;"></image>
		</view>
		<view class="roles">
			<p>群管理员可以拥有以下能力 </p>
			<p>1.修改社群基本信息（社群名称、社群介绍等）</p>
			<p>2.删除社群成员（群主、社群管理员除外）</p>
			<p>3.同意进群申请</p>
		</view>
		<view class="user">
			<view class="" v-for="(item,index) in list" :key="index" v-if="list.length>0">
				<image :src="item.headImage" style="width: 130rpx; height: 130rpx; border-radius: 10px;margin-right: 20rpx;"></image>
			</view>
			<view @click="addUser(1)">
				<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.x9yqawQXE0vZf1e1f26d63558d78b611f008d881f33d.png"
				 style="width: 130rpx; height: 130rpx; border-radius: 10px;margin-right: 20rpx;"></image>
			</view>
			<view v-if="list.length>0" @click="deleteUser(2)">
				<image src="https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.fgoJe5buw5MS3378273cd0ff0a8aa7cb72736464da0d.png"
				 style="width: 130rpx; height: 130rpx; border-radius: 10px;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				id:''
			}
		},
		onLoad(option){
			this.id = option.id;
		},
		onShow() {
			this.fetch()
		},
		methods: {
			addUser(type){
				this.navigateTo('../businessCC_ManageList/businessCC_AddManage', {
					id: this.id,
					type:type,
					listLength:this.list.length
				})
			},
			deleteUser(type){
				this.navigateTo('../businessCC_ManageList/businessCC_DeleteManage', {
					id: this.id,
					type:type,
					listLength:this.list.length
				})
			},
			
			fetch(){
				uni.showLoading();
				this.$api.getCircleManagerList(this.id).then(res=>{
					uni.hideLoading();
					this.list=res
				})
			}
			
		}
	}
</script>

<style lang="less">
	page {
		background-color: #fff;
	}

	.content {
		display: flex;
		flex-direction: column;

		.img {
			margin: 0 auto;
			text-align: center;
			margin-top: 20rpx;
		}

		.roles {
			font-size: 32rpx;
			color: #333333;
			line-height: 65rpx;
			margin: 0 auto;
			margin-top: 30rpx;
			margin-bottom: 30rpx;
		}

		.user {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			margin-left: 30rpx;
			margin-right: 30rpx;

		}
	}
</style>
