<template>
	<view class="container">
		<view class="content">
			<textarea maxlength="100" placeholder="一句话介绍自己" value="1111" placeholder-class="txt" class="mtxt"></textarea>
			<view class="txtLength">
				<text>0</text>/<text>100</text>
			</view>
		</view>
		<view class="btn">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
				 //点击事件
				
				   //浮层
				   
				   //组件回调
		
				   //网络请求
			       //Vuex
				   // ...mapMutations(['ChangeRefreshuserInfoState'])
				  },
				  //注册组件
				  components:{
				   
				  },
				//监听计算属性
				  computed: {
				   
				  // ...mapState(['ISneedRefreshuserInfo'])
				  },
		
		
				// 监听页面加载
				  onLoad: function () {
				   console.log('监听页面加载');
				  },
				  // 监听页面显示
				  onShow: function () {
				   console.log('监听页面显示');
				  },
				  //监听页面隐藏
				  onHide: function () {
				   console.log('监听页面隐藏');
				  },
				  
				  // 监听页面卸载
				  onUnload: function () {
				   console.log('监听页面卸载');
				  },
				  //监听下拉刷新
				  onPullDownRefresh() {
				   console.log('onPullDownRefresh');
				   
					//    var bool = true;
					//    this.getalldataNetwork(bool);
		
					   
					  //    setTimeout(function() {
					//     uni.stopPullDownRefresh();
					//    }, 1000);
				  },
				  //监听上拉刷新
				  onReachBottom() {
				   console.log('onReachBottom');
					//    var bool = false;
					//    this.getalldataNetwork(bool);
				  },
	}
</script>

<style lang="less">

	@import "../../css/jss_base.less";
	.container{
		.content{
			 position:relative;width:92%;height:400upx;margin:0 auto; margin-bottom:80upx;background:#F8F8F8;
			 .txt{padding-top: 30upx;padding-left: 30upx;color: #CCCCCC;font-size: 28upx;}
			 .mtxt{font-size: 28upx;color: #333333;padding:30upx 0 0 30upx;}
			.txtLength{
				position: absolute;right: 36upx;bottom: 25upx;font-size: 24upx;color: #999999;
			}
		}
		.btn{
			.buttonRadius();
			margin: 0 auto;line-height: 88upx;text-align: center;color: #FFFFFF;font-size: 32upx;font-family: PingFangSC;
			}
	}
	
</style>
