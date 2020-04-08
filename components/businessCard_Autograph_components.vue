<template>
	<view class="container" >
		<view class="content" @click.stop='stopTap'>
			<textarea @click="focusArea" :focus="focus" @blur="blurArea" maxlength="100" v-model="autograph" @input='inputTap'  placeholder="一句话介绍自己"  placeholder-class="txt" class="mtxt"></textarea>
			<view class="txtLength">
				<text>{{number||autograph.length}}</text>/<text>100</text>
			</view> 
		</view>
		<view class="btn" @click.stop="bcTap">保存</view>
	</view>
</template>

<script>
	export default {
		props:['autograph'],
		data() {
			return {
				value2:'',
				number:'',
				focus:true,
			};
		},
		methods: {
	
		  },
		  //注册组件
		  components:{
		   
		  },
		//监听计算属性
		  computed: {
		 
		  },
		watch:{
			
		},
		methods:{
			
			blurArea(){
				console.log(this.focus)
				this.focus = false;
				this.$forceUpdate();
			},
			
			focusArea(){
				console.log(this.focus)
				this.focus = true;
				this.$forceUpdate();
			},
			
			bcTap(){
				this.$emit('autographTap',this.autograph)
				// if(this.value2){
				// 	this.$emit('autographTap',this.value2)
				// }else{
				// 	this.$emit('autographTap',this.autograph)
				// }
				
			},
			inputTap(e){
				console.info(e.detail)
				this.number=e.detail.cursor
				this.value2=e.detail.value
			},
			stopTap(){
				
			}
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
		 
		  },
		  //监听上拉刷新
		  onReachBottom() {
		   console.log('onReachBottom');
			
		  },
	}
</script>

<style lang="less" scoped>

	@import "../css/jss_base.less";
	.container{
		padding:30upx;
	    margin:20upx;
		border-radius:10upx ;
		background:#fff;
		.content{
			 position:relative;height:400upx;margin:0 auto; margin-bottom:80upx;background:#F8F8F8;
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
