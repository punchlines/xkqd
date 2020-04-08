<template>
	<view class="container">
		<!-- 搜索框 -->
		<view class="searchCon">
			<view class="search">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/search.png'" mode="widthFix"></image>
				<input type="text" value="" placeholder="请输入选择的国家" placeholder-class="in" />
			</view>
		</view>
		<!-- 选择列表 -->
		<view class="page">
			<scroll-view class="scrollList" scroll-y :scroll-into-view="scrollViewId" :style="{height:winHeight + 'upx'}">
				<view class="uni-list">
					<block v-for="(list,key) in lists" :key="key" v-if="list.data[0]">
						<view class="uni-list-cell-divider" :id="list.letter">
							{{list.letter}}
						</view>
						<view @click="getPhoneCode(item.name_zh,item.phonecode)" class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list.data" :key="index"
						:class="list.data.length -1 == index ? 'uni-list-cell-last' : ''">
							<view class="uni-list-cell-navigate">
								{{item.name_zh}}  
							</view>
							<view class="phoneCode">{{item.phonecode}}</view>
						</view>
					</block>
				</view>
			</scroll-view>
			<view class="uni-indexed-list-bar" :class="touchmove ? 'active' : ''" @touchstart="touchStart" @touchmove="touchMove"
			@touchend="touchEnd" @touchcancel="touchCancel"  :style="{height:winHeight + 'upx'}">
				<text v-for="(list,key) in lists" :key="key" class="uni-indexed-list-text" :class="touchmoveIndex == key ? 'active' : ''"
				 :style="{height:itemHeight + 'px',lineHeight:itemHeight + 'px'}">{{list.letter}}</text>
			</view>
			<view class="uni-indexed-list-alert" v-if="touchmove">
				{{lists[touchmoveIndex].letter}}
			</view>
		</view>
	</view>

</template>

<script>
	var airportDate = require("../../js/airport.js");

	export default {
		data() {
			return {
				onlineSite:this.global.onlineSite,
				title: 'grid',
				lists: airportDate.list,
				touchmove: false,
				touchmoveIndex: -1,
				itemHeight: 0,
				winHeight: 0,
				scrollViewId: "A",
				titleHeight: 0
			}
		},
		onLoad() {
			let winHeight = uni.getSystemInfoSync().windowHeight + 142;//当前设备的高度
			this.itemHeight = winHeight / 26;//每个字母所占高度
			this.winHeight = winHeight;
		},
		methods: {
			// 获取手机号国际区号列表
			getPhoneCode(name,code){
				uni.navigateTo({
					url: '../register/register?name='+name+'&code='+code
				});
			},
			touchStart(e) {
				this.touchmove = true;
				let pageY = e.touches[0].pageY - 72;
				let index = Math.floor((pageY - this.titleHeight) / this.itemHeight);
				let item = this.lists[index];
				if (item) {
					this.scrollViewId = item.letter;
					this.touchmoveIndex = index;
				}
			},
			touchMove(e) {
				let pageY = e.touches[0].pageY -72;
				let index = Math.floor((pageY - this.titleHeight) / this.itemHeight);
				let item = this.lists[index];
				if (item) {
					this.scrollViewId = item.letter;
					this.touchmoveIndex = index;
				}
			},
			touchEnd() {
				this.touchmove = false;
				this.touchmoveIndex = -1;
			},
			touchCancel() {
				this.touchmove = false;
				this.touchmoveIndex = -1;
			}
		},
		onLoad() {
			// this.getPhoneCode();
		}
	}
</script>

<style>
	.container{
		width:100%;
		height: 100%;
		background:#F5F5F5;
	}
	.searchCon{
		padding:40upx 0 30upx;
	}
	.searchCon .search{
		display: flex;
		flex-direction: row;
		align-items: center;
		background: #FFFFFF;
		width:92%;
		height:72upx;
		margin: 0 auto;
	}
	.searchCon .search>image{
		width: 32upx;
		height: 32upx;
		padding: 0 30upx;
	}
	.in{
		font-size: 28upx;
		color: #CCCCCC;
	}
	.searchCon input{
		font-size: 28upx;
		color: #333333;
	}
	.page {
		display: flex;
		flex-direction: row;
	}

	.scrollList {
		flex: 1;
		height: 100vh;
	}
	.uni-list-cell-divider{
		font-size: 28upx;
		height: 68upx;
		line-height: 68upx;
		background: #F4F5FF;
		padding-left:30upx;
	}
	.uni-list-cell{
		width:100%;
		height: 88upx;
		line-height: 88upx;
		box-sizing:border-box;
		padding:0 30upx;
		font-size:28upx;
		color: #333333;
		background: #FFFFFF;
		border-bottom: 1px solid #E1E1E1;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.uni-list-cell-navigate{
		width:50%;text-align: left;
	}
	.phoneCode{
		width:50%;text-align: right;
	}
	.uni-indexed-list-bar {
		width: 46upx;
		height: 100vh;
		/* background-color: lightgrey; */
		display: flex;
		flex-direction: column;
	}

	.uni-indexed-list-bar.active {
		background-color: rgb(200, 200, 200);
	}

	.uni-indexed-list-text {
		color: #6D7CF8;
		font-size: 22upx;
		text-align: center;
	}

	.uni-indexed-list-bar.active .uni-indexed-list-text {
		color: #333;
	}

	.uni-indexed-list-text.active,
	.uni-indexed-list-bar.active .uni-indexed-list-text.active {
		color: #007AFF;
	}

	.uni-indexed-list-alert {
		position: absolute;
		z-index: 20;
		width: 160upx;
		height: 160upx;
		left: 50%;
		top: 50%;
		margin-left: -80upx;
		margin-top: -80upx;
		border-radius: 80upx;
		text-align: center;
		line-height: 160upx;
		font-size: 70upx;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.5);
	}
	.phoneCode{display: inline-block;}
</style>
