<template>
	<view class="container top">
		<!-- 所在地 -->
		<view class="storeName storeCategory fx-row fx-row-center fx-row-space-around borderB">
		  <view class="SCtitle fs3a28">所在地</view>
				<!-- @click="showMulLinkageThreePicker" -->
				 <picker  class="perRight fx-row fx-row-space-between fx-row-center" style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;margin-left: 43upx;color: #666;" mode="region"  @change="regionChange" @onConfirm="onConfirm">
					<view style="font-size:28upx;display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
						<text>
							{{searchArea[0] || '请选择'}}--
						</text>
						<text>
							{{searchArea[1] || '请选择'}}--
						</text>
						<text>
							{{searchArea[2] || '请选择'}}
						</text>
					</view>
				</picker>
				
				
		</view>
		
		<view class="storeCategory adressDetail fx-row fx-row-center fx-row-space-around borderB">
		  <view class="SCtitle fs3a28">最小价格</view>
				<view class="SCinput fs6a28">
					<input  :value="searchMinPrice" @input="changeMin"  type="digit" placeholder="请输入最小价格">
				</view>
		</view>
		
		<view class="storeCategory adressDetail fx-row fx-row-center fx-row-space-around borderB">
		  <view class="SCtitle fs3a28">最大价格</view>
				<view class="SCinput fs6a28">
					<input :value="searchMaxPrice"  @input="changeMax" type="digit" placeholder="请输入最大价格">
				</view>
		</view>
	
		<view class="btnContainer fx-row fx-row-center fx-row-space-between">
			<view class="btn" @click="clear">
				清空筛选
			</view>
			<view class="btn" @click="confirm">
				确认
			</view>
		</view>
	
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				// province:'广东省',
				// city:'广州市',
				// area:'白云区',
				// min:0,
				// max:0
			};
		},
		
		computed: {
			
			...mapState(['searchArea', 'searchMinPrice', 'searchMaxPrice']),
		},
		
		methods:{
			confirm(){
				uni.navigateBack();
			},
				
			clear(){
				this.$store.commit("setSearchMinPrice",0);
				this.$store.commit("setSearchMaxPrice",0);
				this.$store.commit("setSearchArea",[]);
				uni.navigateBack();
			},
			
			changeMin(e){
				this.$store.commit("setSearchMinPrice",e.detail.value)
			},
			
			changeMax(e){
				this.$store.commit("setSearchMaxPrice",e.detail.value)
			},
			regionChange(e){
				let area = e.detail.value
				this.$store.commit("setSearchArea",area)
				// this.searchArea[0] = e.detail.value[0];
				// this.searchArea[1] = e.detail.value[1];
				// this.searchArea[2] = e.detail.value[2];
				
			},
			// 选择的省市区
			onConfirm(e) {
				const data = e.label.split('-').join('');
				let area = e.detail.value1;
				this.$store.commit("setSearchArea",area)
				// console.log(e);
				// this.searchArea[0] = data.value1[0];
				// this.searchArea[1] = data.value1[1];
				// this.searchArea[2] = data.value1[2];
			}
		}
	}
</script>

<style lang="less">
  @import '../../css/mzl_base.less';
  .page{width:100%;height: 100%;background:@grayBg;}
  .container{
    background:@grayBg;width:100%;height: 100%;
	  .storeName{
		margin-top:30upx;background: #fff;padding:30upx;
		.SNtitle{width:25%;text-align:left;}
		.SNinput{
		  width:75%;text-align:left;
		  input{border:none;}
		}
	  }
	  .storeCategory{
	    background: #fff;padding:30upx;
	    .SCtitle{width:25%;text-align: left;}
	    .SCinput{width:60%;text-align: left;}
	    .SCgoto{
	      width:15%;text-align:right;
	      .SCimage{width:12upx;height: 24upx;vertical-align: middle;}
	    }
	  }
	  .adressDetail{
	    .SCtitle{width:25%;text-align: left;}
	    .SCinput{width:75%;height:40upx;text-align:left;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
	  }
	  
	  
  }
  .btnContainer{
	 width: 100%;
	 background: #fff;
	 font-size: 32rpx;
	 margin: 0 auto;
	 padding: 20rpx 0 20rpx 0;
	 position: fixed;
	 bottom: 0;
	 z-index: 999;
	 .btn{
		 margin: 0 auto;
		 color: #fff;
		 width: 310rpx;
		 height: 80rpx;
		 background: #6B7AF8;
		 border-radius: 40rpx;
		 text-align: center;
		 line-height: 80rpx;

	 }

  }
</style>
