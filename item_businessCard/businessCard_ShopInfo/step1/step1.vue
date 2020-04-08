<template>
	<view class="container">
		<title-bar title="选择商户类型"></title-bar>
		
		<view class="text_box">
			<text class="bold_text">请选择您的身份 \n</text>
			<text class="sub_text">明确后将为您提供更准确的服务</text>
		</view>
		
		<view class="select_img_box">
			<image class="imgCard" @click="toStep2" src="http://card-1254165941.cos.ap-guangzhou.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs2r1bMrWHaOln0s72530D84.7Lg417NB8Z5hffd78a44c472e8e47d5e8ddaa05420e1.jpg" mode="widthFix">
				
			</image>
		<!-- 	<image class="imgCard" @click="toStep2(2)" src="http://card-1254165941.cos.ap-guangzhou.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs2r1bMrWHaOln0s72530D84.da6PeUll2PRM19a0844b8af48fbd2948ee7440c18023.jpg" mode="widthFix"></image> -->
		</view>
	</view>
</template>

<script>
	
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			toStep2(key){
				uni.navigateTo({
						url:"../step2_1/step2_1?type=1"
				})
			}
			
		}
	}
</script>

<style lang="less" scoped>
	.text_box{
		text-align: center;
		margin-top: 150upx;
		.bold_text{
			font-weight: bold;
			font-size: 50upx;
		}
		
		.sub_text{
			
			font-size: 30upx;
			color:#666;
		}
	}
	.select_img_box{
		width: 100%;
		text-align: center;
		margin-top:20upx; 
		.imgCard{
			width: 90%;
			margin: 20upx auto;
		}
		
	}


</style>
