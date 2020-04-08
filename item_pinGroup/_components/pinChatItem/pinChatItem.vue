<template>
	<view class="fx-row fx-row-top container" @click="oclick">
		<view>
			<image class="avatar" :src="avatar" mode="aspectFill"></image>
		</view>
		<view class="content">
			<slot></slot>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			avatar: {
				type: String,
				default: ''
			},
		},
		methods:{
			oclick(){
				this.$emit('oclick')
			}
		}
	}
</script>

<style lang="less" scoped>
	.container{
		margin-top: 15upx;
	}
	
	.avatar{
		width:66upx;
		height:70upx;
	}
	
	.content{
		color:black;
		max-width:460upx;
		background:rgba(255,255,255,1);
		border-radius:25upx;
		font-size:20upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(0,0,0,1);
		line-height:30upx;
		padding: 15upx;
		margin-left: 20upx;
		position: relative;
		

		&::before{
			display: block;
			content: '';
			position: absolute;
			background: white;
			width: 20upx;
			height: 20upx;
			left: -5upx;
			top:5upx;
			transform: rotate(65deg);
			
		}
		
		
	}
</style>
