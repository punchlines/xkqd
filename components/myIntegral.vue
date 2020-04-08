<template>
	<view class="container3">
		<view class="popup fs3a28">
			<!-- 解除企业绑定 -->
			<view class="DeleteLog"  @click="$emit('close')">
				<view class="DLlist">
					<view class="DbgImage">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/my/jifenbg.png'" mode=""></image>
					</view>
					<view class="Dcontent">
						<view class="SinginSucc fs3a32">签到成功，+{{pointsScore}}积分</view>
						<view v-if="continuation" class="SinginGetScore fs6a24">连续签到7天，可获得10积分</view>
						<view class="SinginButon fsf28" @click="$emit('close')">确定</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'integral',
		data() {
			return {

			};
		},
		props: {
		  visible: Boolean,
		  pointsScore:Number,
		  continuation:Boolean,
		},
	}
</script>

<style scoped lang="less">
	@import '../css/mzl_base.less';
	// 弹出层
	.container3{	
		z-index:99999999;
		.popup{
			width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.5);text-align:center;
			.DeleteLog{
				.DLlist{
					width:624upx;height:660upx;background: #fff;position: absolute;border-radius:25upx;
					top:50%;left:50%;margin-left:-312upx;margin-top:-330upx;
					.DbgImage{
						image{width:100%;height:340upx;}
					}
					.Dcontent{
						.SinginSucc{color:#7483FF;margin-top:50upx;margin-bottom:30upx;}
						.SinginButon{
							margin:30upx auto;
							.buttonRadius(@w:328upx,@h:80upx);
						}
					}
				}
			}
		}
	}
</style>
