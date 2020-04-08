<template>
	<view>
		<map name="map"  class="map" :latitude="latitude" :longitude="longitude"  :markers="marker" id="mapid">
			<cover-view class="fixText">{{showAddress}}</cover-view>
			<cover-view class="btn-primary fixbtn" @click="confirm">确定</cover-view>
		</map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude:0,
				longitude:0,
				address:null,
				mapContext:null,
				AppMap:null,
				clicking:false
			};
		},
		
		computed: {
			journal () {
				return this.$store.state.journalPublish;
			},
			showAddress(){
				return "我的位置："+this.address;
			},
			marker() {
				return [
					{
						id:1,
						latitude: this.latitude,
						longitude: this.longitude,
						iconPath: '../../static/chat/icon-location.png',
						label:{
							content:"我的位置", 
						}
					}
				]
			}
		},
		onLoad(options) {
			this.latitude = options.latitude;
			this.longitude =options.longitude;
			
			//获取定位信息
			
			this.getPosition().then(res=>{
				this.latitude = res.coords.latitude;
				this.longitude = res.coords.longitude;
				//console.log(res)
				this.address = res.addresses;
				//设置地图点击事件
				
				this.mapContext = uni.createMapContext('mapid');
				this.AppMap = this.mapContext.$getAppMap();
				
				//重新设置地图中心点
				this.AppMap.onclick = point=>{
					
					if(this.clicking) return
					this.clicking = true;
					this.latitude = point.latitude;
					this.longitude = point.longitude;
					//反向地理编码
					this.reverseGeocode(point).then(res=>{
						//console.log(res)
						this.address = res.address;
						this.clicking=false;
					});
					
				}
				
			});
			
		},
		methods: {
			//反向地理编码
			reverseGeocode(point){
				return new Promise((resolve,reject)=>{
					plus.maps.Map.reverseGeocode(point,
						{
							coordType:"gcj02",
						},
						(res)=>{
							resolve(res);
						},
						(err)=>{
							reject(err);
						}
					);
					
				});
			},
			getPosition(){
				return new Promise((resolve,reject)=>{
					
					plus.geolocation.getCurrentPosition((res)=>{
							resolve(res)
							
						},(err)=>{
							this.showTips("获取位置失败");
							reject(err)
						},
						{
							enableHighAccuracy:true,
							geocode:true
						})
					});
				
			},
			confirm(){
				//点击确定
				this.journal.location = {
					address: this.address,
					addressName: this.address,
					lat: this.latitude,
					lng: this.longitude
				};
				
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="less" scoped>
	.map{
		width: 750upx;
		height: 100vh;
	}
	.fixText{
		position: absolute;
		top: 0;
		width: 750upx;
		background-color: white;
		height: 60upx;
		line-height: 60upx;
		font-size: 24upx;
		
	}
	
	.fixbtn{
		position: absolute;
		bottom: 10upx;
		width: 90%;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
