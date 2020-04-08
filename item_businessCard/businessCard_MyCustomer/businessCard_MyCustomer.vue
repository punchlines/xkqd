<template>
	<view class="container fx-column fx-row-center">
		<view class="searchCon fx-row fx-row-center">
			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/search.png'" mode="widthFix" @click="search"></image>
			<input type="text" @confirm='search'  placeholder="请输入成员姓名/职位" class="input" placeholder-class="beinput" v-model="seText"/>
		</view>
		<!-- 客户列表 -->
		<view class="customerListCon" v-if="!isSearch">
			<view class="customer fx-row fx-row-center fx-row-space-between" v-for="item of customerList" :key="item.mpUserInfo.id"  @click="cusDetail(item)">
				<view class="left fx-row fx-row-center">
					<default-image :src="item.mpUserInfo.headImage" custom-class="aa"></default-image>
					<view class="name">{{item.mpUserInfo.name}}</view>
					<view class="position">{{item.mpUserInfo.job}}</view>
				</view>
				<view class="date">{{item.time}}</view>
			</view>
		</view>
		<!-- 搜索结果 -->
		<view class="customerListCon" v-if="isSearch">
			<view class="customer fx-row fx-row-center fx-row-space-between" v-for="item of searchResult" :key="item.id"  @click="cusDetail(item)">
				<view class="left fx-row fx-row-center">
					<default-image :src="item.headImage" custom-class="aa"></default-image>
					<view class="name">{{item.name}}</view>
					<view class="position">{{item.job}}</view>
				</view>
				<view class="date">{{item.registerTime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				onlineSite:this.global.onlineSite,
				customerList:[],
				seText:'',
				searchResult:[],
				isSearch:false,
				userId:2,
				pageNo:1,
			};
		},
		methods:{
			cusDetail(item){//我的客户详情页
			console.info(item)
			
				uni.navigateTo({
					url: '/pages/businessCard2/businessCard2?cardUserId='+item.mpUserInfo.id
				});
			},
			listMyCustomer(){//我的客户列表
				this.$api.myCustomer(1).then(result => {
					console.info( result.customerList)
					this.customerList = result.customerList;
					if(this.customerList.length==0){
						this.showTips('抱歉，暂无顾客');						
					}
					
				}).catch(error => {
					console.error(error)
				})
			},
			searchMyCustomer(){//搜索我的客户
				this.$api.searchMyCustomer(this.userId,this.pageNo,this.seText).then(result => {
					this.searchResult = result.customerList;
				  this.searchResult.forEach(item => {
                    item.registerTime = this.formatDate(item.registerTime, 'YYYY.MM.DD')
				  })

					console.info( result.customerList)
					if(result.customerList.length==0){
						this.showTips('抱歉，没有搜索到相关内容');						
					}
				}).catch(error => {
					console.error(error)
				})
			},
			search(){
				if(!this.seText){
					this.showTips('请输入搜索内容');
					this.isSearch = false
				}
				else{
					this.searchMyCustomer();
					this.isSearch = true										
				}
				
			}
		},
		onLoad(e){
			this.userId=e.userId
			this.listMyCustomer();
		}
	}
</script>

<style lang="less">

	.container{
		background:#F5F5F5;
		.searchCon{
			width:92%;height:72upx;background:#ffffff; margin:40upx 0 30upx 0;
			&>image{width: 32upx;height: 32upx;padding: 0 20upx;}
			.input{height: 28upx;font-size: 28upx;}
			.beinput{font-size: 28upx;color: #CCCCCC;}
		}
		.customerListCon{
			width: 100%;
			.customer{
				width: 100%;height: 160upx;border-bottom: 1px solid #E1E1E1;box-sizing: border-box;padding:0 30upx ;background: #FFFFFF;
				.left{
					width:80%;
					.aa{width: 80upx;height: 80upx;margin-right: 30upx;}
					.name{font-size: 30upx;color: #333333;margin-right: 22upx;}
					.position{padding:0 15upx;height: 36upx;line-height: 36upx;border-radius: 18upx;background:#F1F1F1 ;color: #666666;font-size: 20upx;text-align: center;}
				}
				.date{width:20%;font-size: 24upx;color: #999999;text-align: right;}
			}
		}
	}
</style>
