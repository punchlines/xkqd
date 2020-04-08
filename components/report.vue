<template>
	<view class="container3">
		<view class="popup fs3a28">
			<view class="report fs3a28">
				<view class="ReportList fs3a28">
					<view class="Rcancle" @click="$emit('close')">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/tuichu.png'"></image>
					</view>
					<view class="RtypeInfort">
						<view class="RTtitle">举报这条动态</view>
						<view class="RTlistInfore fx-wrap fx-row fx-row-center fx-row-space-around">
							<view @click="changeTitle(index,item.title)" :class="{'RTIttle':true,'RTtitleActive':index==Ractive}" 
								v-for="(item,index) in ReportList" :key="index">{{item.enumName}}</view>
						</view>
					</view>
					<view class="Tbutton" @click="complainTrend">举报</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 举报内容
				ReportList:[],
				Ractive:0,
				title:null,
			};
		},
		props: {
		  visible: Boolean,
		  journalId:Number
		},
		onLoad() {
			this.listComplainType();
		},
		methods:{
			// 获取动态举报类型列表
			listComplainType(){
				uni.showLoading();
				this.$api.listComplainType().then(res=>{
					uni.hideLoading();
					this.ReportList=res.complainType;
				}).catch(error=>{
					uni.hideLoading();
					this.showError(error);
				})
			},
			// 返回该举报类型
			complainTrend(){
				uni.showLoading();
				this.$api.setJournalComplainApply(this.journalId,this.Ractive+1).then(res=>{
					uni.hideLoading();
					this.showTips('举报成功').then(res=>{
						this.$emit('close');
					})
					console.info(res);
				}).catch(error=>{
					uni.hideLoading();
					this.showError(error);
				})
			},
			//举报切换标题
			changeTitle(index,title){
				console.log(index);
				this.Ractive=index;
				this.title=title;
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../css/mzl_base.less';
	.container3{	
		z-index:99999999;
		.popup{
			width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,.5);text-align:center;
			z-index:99999999;
			//举报
			.report{
				width:690upx;height:580upx;background: #fff;position: absolute;top:50%;left:50%;border-radius: 10upx;
				margin-top:-275upx;margin-left:-345upx;
				.ReportList{
					position:relative;
					.Rcancle{
						position:absolute;top:-80upx;right:0;
						image{width:50upx;height:50upx;}
					}
					.RtypeInfort{
						width:100%;padding:30upx;
						.RTtitle{width:100%;text-align: left;margin-left:10upx;}
						.RTlistInfore{
							margin:20upx;
							.RTIttle{
								.buttonRadius(@w:300upx;@h:70upx;@bg:none);
								color:#666;border:1upx solid #DDDDDD;line-height: 70upx;margin:20upx 0;
							}
							.RTtitleActive{
								color:@tabActive;border-color:@tabActive;
							}
						}
					}
					.Tbutton{
						.buttonRadius(@w:630upx;@h:80upx;@bg:@tabActive;);margin:0 auto;line-height: 80upx;color:#fff;
					}
				}
			}
		}
	}
</style>
