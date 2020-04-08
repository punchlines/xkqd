<template>
	<view class="container">
		<view class="conBody fx-row">
			<view class="leftCon" :style="'height:'+height+'px'" >
				<view @tap="changeTitle(item,index)" 
					:class="{'nav':true,'active':categoryActive==index}" v-for="(item,index) in aa">
					{{item.classifyName}}
				</view>
			</view>
			<view class="rightCon"  :style="'height:'+height+'px'">
					<view class="cateCon"  >
						<view class="titleCon" v-for="(item,ind) in bb" :key="ind" @click="itemTap(item,ind)">
							<view class="title">
								<view class="line"></view>
								<text class="txt">{{item.classifyName}}</text>
								<view class="line"></view>
							</view>
						
							<view class="cateList fx-wrap fx-row fx-row-center">
								<view class="one fx-column fx-row-center"  v-for="(items,inx) in item.child" @click="item_ziTap(items,inx)" :class="{ active: currentSelectId === items.id }">
									<view class="bg">
										<image :src="items.classifyImage" mode="widthFix" lazy-load></image>
									</view> 
									<text :class="[inx==indexKEY3&&indexKEY2==ind?'nameColor':'','name']">{{items.classifyName}}</text>
								</view>
							</view>
						</view>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				height:'',
				categoryActive:0,
				aa:[],
				bb:[],
				indexKEY1:-1,
				indexKEY2:-1,
				indexKEY3:-1,
				storgeChildList:{},
				currentSelectId: -1,
			};
		},
		methods:{
			//切换标题
			changeTitle(categroy,index){
				this.categoryActive=index;
				this.indexKEY1=index;
				//this.bb = categroy.child
				this.listChildId(categroy.id)
				console.info(index)
			},
			//选择分类
			itemTap(item,index){
				console.info(index)
				this.indexKEY2=index;

			},
			//分类的子类
			item_ziTap(item,index){
				console.info(item)
				this.indexKEY3=index;
				this.setItemShopClassify(item)
              	uni.navigateBack();
			},
			async listChildId(id){
				this.showLoading();
				if(this.storgeChildList[id]){
					this.bb=this.storgeChildList[id];
					this.hideLoading();
					return
				}
				
				let result = await this.$api.childClassify(id);
				this.bb=result;
				this.storgeChildList[id] = result;
				this.hideLoading();
				
				//console.log(result)
			},
			
			listGoodsClassify(){
			  uni.showLoading();
			this.$api.parentClassify().then(result => {
				this.aa = result;
				let firstId = result[0].id;
				//获取子类Id
				this.listChildId(firstId);
				

               
					// this.bb = this.aa[0].child;//默认显示数据
				}).catch(error => {
				  this.showError(error)
                  uni.hideLoading();
					console.log(error)
				})
			},
		//Vuex引入方法
		...mapMutations(['setItemShopClassify'])	
		},
		computed: {
		//Vuex引入属性
			...mapState(['itemShopClassify'])
		}, 
		onLoad(){
			console.info(111)
			this.height = uni.getSystemInfoSync().windowHeight;
			this.listGoodsClassify()
		
		},
	}
</script>
<style lang="less">

@import "../../css/jss_base.less";
	.container{
		width:100%;
		.conBody{
			width:100%;
			.leftCon{
				width:37%;background: #F5F5F5;overflow-y:auto;overflow-x: hidden;
				.nav{width:100%;height: 106upx;line-height: 106upx;text-align: center;font-size: 28upx;}
				.active{background: #FFFFFF;color:#6B7AF8;border-left:10upx solid #6B7AF8;}
			}
			.rightCon{
				width: 63%;background-color: #ffffff;overflow-y:auto;
				.cateCon{
					color:#333333;font-size:30upx;padding:0 14upx;margin:60upx 0 33upx 0;height:30upx;line-height: 30upx;text-align: center;
					.titleCon{
						.title{margin:30upx;
							.line{display: inline-block;width:50upx;border-top:1px solid #BBBBBB;}
							.txt{padding:0 15upx;vertical-align: -15%;}
						}
						.cateList{
							width:100%;

							.one{
								width:33.3%;height:180upx;
								font-size:24upx;color:#666666;text-align:center;margin-bottom:40upx;
								.bg{width:90upx;height: 90upx;border-radius: 50%;background:#ffffff;margin-bottom:15upx;
									image{
										width:90upx;
										height: 90upx;
									}
								}
								.name{width: 90upx;.Tellipsis();}
								.nameColor{color:#6B7AF8;}
								}
							}
						.active {
							.name {
								color:#6B7AF8;
							}
						}
						}
					
				}
				
			}
		}
		
	}
</style>