<template>
	<view class="content">
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index" :data-newsid="item.post_id">
				<view class="uni-media-list">
					<image class="uni-media-list-logo" :src="items.img" v-for="(items,index) in listuser" :key="index" :id="items.id" v-if="items.id==item.grade"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">开通时间：{{item.createTime}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">到期时间：{{item.endTime}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listuser: [{
						id: 1,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.to2Lb4E1vxV608af3840344b5543809ec4316196961d.png',
						text: '黄金会员'
					}, {
						id: 2,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.4VKotSOn93V3ff5444dd7904cfdd150c363b7953184e.png',
						text: '白金会员'
					},
					{
						id: 3,
						img: 'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs39Q4DzIbe0mBW0b5UpEIL4.KojOKaJYKUnMf3e772c0f4e513fb601b95994621b46a.png',
						text: '钻石会员'
					}
				],
				list:[],
				pageNo:1
			}
		},
		onLoad() {
			this.getUserVipOrderList()
		},
		methods: {
			getUserVipOrderList(){
				console.log(this.pageNo)
				this.$api.getUserVipOrderList(this.pageNo)
				.then(res=>{
					this.list=res
					console.log(this.list)
				})
			}
		}
	}
</script>

<style>
	.uni-list-cell{
		margin-top: 30rpx;
		background: #EEEEEE;
		padding: 20rpx;
		border-radius: 20rpx;
	}
	.uni-media-list{
		display: flex;
		flex-direction: row;
	}
	.uni-media-list-logo{
		width: 80rpx;
		height: 80rpx;
	}
	.uni-list{
		margin: 40rpx;
		

	}
	.uni-media-list-body{height: auto;margin-left: 40rpx;}
	.uni-media-list-text-top{line-height:1.6em;}
</style>
