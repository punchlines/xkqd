<template>
		<view class="goodsitem fx-row fx-row-start fx-row-space-between" :style="{'margin-top':noMargin?'0rpx':'30rpx'}" @click="sel()">
				<view class="goodimage">
					<image class="goodimage" :src="item2.covermage"></image>
				</view>
				
				<view class="goodtitle fx-column fx-col-top fx-row-space-between">
						<view class="t">{{item2.title}}</view>
						<view class="price fx-row fx-row-start fx-row-space-between">
							<price v-model="item2.preferentialPrice" size="36" color="#ff0000"></price>
							<view :style="{'opacity':showSel?1:0}">
									<image class="go" v-if="index==active" src="http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/gouxuan.png" mode=""></image>
									<image class="go" v-else src="http://card-1254165941.cosgz.myqcloud.com/cardImages/shop/gouxuan_un.png" mode=""></image>
							</view>
						</view>
				</view>
		</view>
	
</template>

<script>
	import {price} from '../price/price';
	export default {
		data() {
			return {
				
			};
		},
		components: {
			price
		},
		props: {
			item: {
				type: Object,
				default: {}
			},
			active:Number,
			index:Number,
			showSel:{
				type:Boolean,
				default:true
			},
				
			noMargin:{
				type:Boolean,
				default:false
			}
		},
		
		computed: {
			item2() {
				return this.item; 
			}
		},
		
		methods: {
			sel() {
				this.$emit('sel')
			}
		},
	}
</script>

<style lang="less" scoped>
		.goodsitem{
				// margin-top: 30upx;
				width:636upx;
				height:150upx;
				background:rgba(255,255,255,1);
				border-radius:10upx;
				padding: 10upx 27upx;
				
				.goodimage{
					width:150upx;
					height:150upx;
				}
				.goodtitle{
					width: 426upx;
					height:150upx;
					
					.t{
						width: 426upx;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size:30upx;
						font-family:PingFangSC-Regular;
						font-weight:400;
						color:rgba(51,51,51,1);
						white-space: nowrap;
				
					}
					.go{
						width:36upx;
						height:36upx;
					}
				}
			}
</style>
