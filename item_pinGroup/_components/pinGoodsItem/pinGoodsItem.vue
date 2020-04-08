<template>
	<view class="goods fx-row fx-row-start">
		<view >
			<image class="img" :src="item.cover" mode=""></image>
		</view>
		
		
		
		<view class="goodsInfo fx-column fx-row-space-between">
			<view class="title">{{item.goodName}}</view>
			<view class="sku">规格: {{item.skuName}}</view>
			<view class="fx-row fx-row-space-between">
				<view class="goodsPrice fx-row fx-row-bottom">
					<text class="text">拼团价:</text>
					<price size="29" :value="item.goodPrice"></price>
				</view>
				<view class="takeNum fx-row fx-row-center">
					<view class="add"  @click="sub">-</view>
					<input class="numInput" type="text" disabled v-model="item.number">
					<view class="add reduce" @click="add">+</view>	
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { price } from '../price/price.vue';
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
		},
		methods: {
			sub() {
			
				this.$emit('sub');
				
			},
			
			add(){
		
				this.$emit('add');
				
			}
		},
	}
</script>

<style lang="less" scoped>
	.goods{
		
		.img{
			width:151upx;
			height:151upx;
		}
		.goodsInfo{
			width: calc(100% - 191upx);
			padding-left: 40upx;
			.title{
				width:100%;
				height:29upx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size:30upx;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(51,51,51,1);
				line-height:30upx;

			}
			
			.sku{
				font-size:22upx;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(153,153,153,1);
				// line-height:18upx;
			}
			
			.goodsPrice{
				font-size:20upx;
				color: #333;
				.text{margin-right:8upx; }
			}
			.takeNum{
				.add{
					width:40upx;
					height:40upx;
					background:rgba(255,187,69,1);
					border-radius:50%;
					line-height: 38upx;
					text-align: center;
					color: white;
					&.reduce{
						background:rgba(107,120,250,1);
					}
				}
				
				.numInput{
					text-align: center;
					width: calc(100% - 80upx);
				}
			}
		}
		
	}
</style>
