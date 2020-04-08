<template>
	<view class="page">
		<!-- 语音列表 -->
		<view class="bar fx-row fx-row-center fx-row-space-around">
				<view class="selAll fx-row fx-row-center" @click="selAllItem">
					<image class="sel" v-if="!selAll" src="http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose_un.png"></image>
					<image class="sel" v-else src="http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose.png"></image>
					<view class="text">全选</view>
				</view>
				
				<view class="del" @click="deletes">
					<view class="delBtn">删除</view>
				</view>
		</view>
		<!-- 滑动区域 排序 -->
		<scroll-view style="margin-top: 80rpx;" scroll-y>
			<view class="list">
				<!-- 可拖动排序 -->
				<!-- <dragSort :list="list" :props="props" @change="onDragSortChange"></dragSort> -->
				<template v-for="(item,index) in list">
					<!-- 非置顶排序 -->
					<view class="item fx-row fx-row-center fx-row-space-around" :class="{'active':item.sort>=1}" :key="index">
						 <view class="fx-row fx-row-center gird-80">
								<view style="height: 100%;" @click="sel(index)">
									<image v-if="!item.selected" src="http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose_un.png"  class="sel"></image>
									<image v-else src="http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose.png"  class="sel"></image>
								</view>
								<view class="fx-column info">
									<view class="fx-row fx-row-center">
										<input class="vname"  @click="sel(index)" :focus="item.editing" :disabled="!item.editing" @input="inputText($event,index)" :value="item.title" type="text"></input>
										<view class="edit" @click="edit(index)">{{item.editing?"完成":"可编辑"}}</view>
										<view class="edit setTop" @click="setTop(index)">{{item.sort>=1?"取消置顶":"置顶"}}</view>
									</view>
									
									<view class="vdate">{{item.createTime| fntime }}</view>
								</view>
								
								<!-- {{item[props.label]}} -->
						</view>
						<view class="touch-tight fx-row fx-row-right gird-20">
							<!-- https://card-1254165941.cos.ap-guangzhou.myqcloud.com/cardImages/voice/%E6%9A%82%E5%81%9Cicon.png -->
								  <image class="sel" v-if="!item.playing" src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/cardImages/voice.png"></image>
								  <image class="sel" v-else src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/cardImages/voice/%E6%9A%82%E5%81%9Cicon.png"></image>
								  <text class="text" style="width: 75rpx;">{{item.time | fptime}}</text>
						 <!-- <view class="ico_drag"></view> -->
						</view>
					</view>
					
				</template>
			
				
			</view>
			
		</scroll-view>
		
		<!-- 底部栏 -->
		<view class="footer fx-row fx-row-center fx-row-space-around">
			<view class="btn" @click="action(false)">播放语音</view>
			<view class="btn blue" @click="action(true)">发送到群</view>
		</view>
		
	</view>
</template>

<script>
	// import dragSort from '../../components/drag-sort/index.vue'
	import loadMoreMixins from "@/js/mixins/loadMoreMixins2.js";
	import audioPlayMixins from "../_mixins/audioPlayMixins.js";
	export default {
		mixins:[loadMoreMixins,audioPlayMixins],
		components: {
			// dragSort
		  },
		data() {
			return {
				  props: {
					label: 'id'
				  },
				  list: [
					
				  ],
				  selArr:[],
				  selLength:0,
				  listPlay:true,
				  cid:null
			};
		},
		computed: {
			selAll() {
				return this.selLength == this.list.length && this.list.length!=0;
			}
		},
		
		onLoad(options){
			this.cid=options.id;
			this.fetch();
		},
		
		filters: {
			fptime(value){
				return ~~(value/1000) + "秒";
			},
			
			fntime: function(value) {
				const time = new Date(value);
				let y = time.getFullYear()
				let M = time.getMonth()+1;
				let d = time.getDate();
				M=String(M).length<2?"0"+M:M;
				d=String(d).length<2?"0"+d:d;
				return [y,M,d].join('-');
			}
		},
		onUnload() {
				this.resetVoice();
		},
		
		methods: {
			
			
			
			action(mode){
				//清空播放数组
				if(mode){
					const plist = [].reduce.call(this.list,(totalList,item,index)=>{
						if(item.selected){
							totalList.push({id:String(item.id)});
						}
						return totalList;
					},[]);
					
					if(plist.length<=0){
						return this.showTips("请选择语音");
					};
					
					uni.showModal({
						showCancel:true,
						content:"确定发送?",
						success: (res) => {
							if(res.confirm){
								//发送群
								this.$api.sendVoiceCircle(this.cid,JSON.stringify(plist)).then(res=>{
									uni.showModal({
										showCancel:false,
										content:"发送成功",
										complete:()=>{
											uni.setStorageSync('_needVoiceList',true);
											uni.navigateBack();
											
										}
									})
								}).catch(err=>this.showError(err));
							}
						}
					})
					
					
					
				}else{
					
					const plist = [].reduce.call(this.list,(totalList,item,index)=>{
						if(item.selected){
							totalList.push(index);
						}
						return totalList;
					},[]);
					if(plist.length<=0){
						return this.showTips("请选择语音");
					};
					
					this.playList.length=0;
					this.resetVoice();
					this.playList=plist;
					this.playVoice(plist[0]);
				}
				
				
		
			},
			
			inputText(e,index){
				// console.log(e,index)
				setTimeout(()=>{
					this.$set(this.list[index],"title",e.detail.value);
				},50)
			},
			
			async edit(index){
				if(this.list[index].title==""){
					return this.showTips("请输入标题");
				}
				
				let mode = this.list[index].editing?false:true;
				if(!mode){
					//编辑
					await this.$api.voiceTitle(this.list[index].title,this.list[index].id)
				}
				this.$set(this.list[index],"editing",mode);
				
			},
			
			deletes(){
				const dlist = [].reduce.call(this.list,(totalList,item,index)=>{
					if(item.selected){
						totalList[index] = String(item.id);
					}
					return totalList;
				},{});
				console.log(dlist)
				
				const delKeys = Object.keys(dlist);
				const delVals = Object.values(dlist);
				if(delKeys.length==0) this.showTips("请选择要删除的语音");
				
				uni.showModal({
					showCancel:true,
					content:"确定删除？",
					success: (res) => {
				
						if(res.confirm){
							this.resetVoice();
							this.$api.deleteMyVoice(JSON.stringify(delVals)).then(res=>{
								//删除成功
								delKeys.reverse().forEach((item)=>{
									this.list.splice(Number(item),1);
								});
								this.selLength-=delKeys.length;
								
							}).catch(err=>{
								this.showError(err);
							})
						}
					}
				})
				
				
			},
			
			selAllItem(){
				if(this.selAll){
					var mode = false;
				}else{
					var mode = true;
				}
				
				this.list.forEach((item,index)=>{
					this.$set(this.list[index],"selected",mode);
				});
				
				this.selLength = mode?this.list.length:0;
				
			},
			
			sel(index){
				if(!this.list[index].selected){
					this.$set(this.list[index],"selected",true);
					this.selLength+=1;
				}else{
					this.$set(this.list[index],"selected",false);
					this.selLength-=1;
				}
				
			},
			
			//置顶/取消
			setTop(index){
				this.$api.voiceSort(this.list[index].id).then(res=>{
					this.resetVoice();
					const item = this.list[index];
					const newItem = Object.assign({},item);
					this.list.splice(index,1);
					if(item.sort>=1){
						newItem.sort=0;
						//从底部插入
						this.list.push(newItem);	
					}else{
						//从顶部插入
						newItem.sort=999;
						this.list.unshift(newItem);
					}	
					
				});
				
			},
			
			 onDragSortChange (e) {
				  console.log(e)
				  // frontData 插到谁后面
				  // data 操作的数据
			},
			fetch(){
				this.loading=true;
				this.$api.myVoiceList(this.currentPage).then(res=>{
					this.loading=false;
					this.currentPage++;
					res = res || [];
					if(res.length<=0){
						this.noMore=true;
						return;
					}
				
					this.list = this.list.concat(res);
					
				}).catch(error => {
					this.loading = false;
				});
			}
		},
	}
</script>

<style lang="less" scoped>
	.sel{
		width: 35upx;
		height: 35upx;
		&+.text{
			margin-left: 14upx;
		}
		
	}
	.page{
		padding-bottom: 120upx;
		
		.list{
			padding: 0;
			.item{
				&.active{
					background: #EEE;
				}
				padding: 25upx;
				
				box-sizing: border-box;
				border-bottom: 1upx solid rgba(204,204,204,1);
			}
			.sel{
				width: 38upx;
				height: 38upx;
				&+.text{
					font-size:26upx;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:32upx;
					margin-left: 15upx;
				}
			}
			.info{
				margin-left: 10upx;
				.edit{
					width:110upx;
					height:32upx;
					text-align: center;
					border:2upx solid rgba(107,120,250,1);
					border-radius:16upx;
					font-size:24upx;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(107,120,250,1);
					line-height:32upx;
					&.setTop{
						border:2upx solid #FDBA44;
						color:#FDBA44;
						margin-left: 10upx;
					}
				}
				
				
				.vname{
					font-size:28upx;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(102,102,102,1);
					line-height:32upx;
				}
				.vdate{
					font-size:26upx;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:32upx;
				}
			}
		}
	}
	.bar{
		width:750upx;
		position: fixed;
		top:0;
		left:0;
		z-index: 999;
		height:80upx;
		background:rgba(245,245,245,1);
		padding: 26upx 30upx 19upx 30upx;
		box-sizing: border-box;
		.delBtn{
			width:150upx;
			height:45upx;
			background:rgba(107,120,250,1);
			border-radius:23upx;
			font-size:30upx;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(255,255,255,1);
			text-align: center;
			line-height: 45upx;
		}
	}
	.footer{
		position: fixed;
		bottom: 0;
		z-index: 999;
		width:750upx;
		height:120upx;
		background:rgba(255,255,255,1);
		border:1upx solid rgba(204,204,204,1);
		.btn{
			width:330upx;
			height:80upx;
			background:rgba(253,186,68,1);
			border-radius:40upx;
			text-align: center;
			font-size:32upx;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(255,255,255,1);
			line-height:80upx;
			&.blue{
				background: #6B78FA;
			}
		}
	}
</style>
