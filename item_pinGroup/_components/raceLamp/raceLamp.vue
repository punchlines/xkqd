<template>
	<!-- 跑马灯
	* 	List - 滚动列表数组对象
	*  -->
	<view class="container" >
		<template v-for="(it,index) in List">
			<view :key="index" :style="{'bottom':trans(active * 42 - (index+1)*42)+'px','opacity':getopa(index)}" 
			class="fx-row fx-row-space-between item" 
			:class="{'fade-in':index+1==active}">
				<view class="name">{{it.name}}</view>
				<view class="red">欢迎加入</view>
			</view>
		</template>	
	</view>
</template>

<script>
	import {XING} from '@/js/constant.js';
	export default {
		data() {
			return {
				active:0, //滚动指标
				List:[

				],
				timer:null
			};
		},
		computed: {
			
		},
		
		mounted(){
			this.timer = setInterval(()=>{
				this.List.push({id:this.active,"name":XING[this.rad(0,309)]+"**"});
				this.active++;
			},1500)
			
		},
		
		destroyed(){
			clearInterval(this.timer);
		},

		methods: {
			//px2upx
			trans(px) {
				return uni.upx2px(px);
			},
			getopa(index){
				//渐变
				if(index>this.active-2) return 1;
				else if(index<=this.active-5) return 0;
				else return 1-(this.active-index-2)*0.33
			},
			rad(min,max) {
				 return Math.floor(Math.random()*(max-min)+min); 
			}
		}
		
	}
</script>

<style lang="less" scoped>
	@keyframes fain{ //飞进来
		
		0%{
			left:-180upx;
			opacity: 0;
		}
		
		100%{
			left:0;
			opacity: 1;
		}

	}
	

	.container{
		height: 210upx;
		width:170upx;
		position: relative;
		.item{
			width:150upx;
			padding: 0 10upx;
			height:32upx;
			background:rgba(0,0,0,1);
			border-radius:16upx;
			font-size:16upx;
			font-family:PingFangSC-Regular;
			font-weight:bold;
			color:rgba(255,255,255,1);
			line-height:32upx;
			position: absolute;
			bottom: 0upx;
			transition: .5s linear;
			margin-top:10upx;
		
			
			.name{
				text-overflow: ellipsis;
				overflow: hidden;
				width: 55%;
			}
			
			.red{
				color:rgba(254,209,104,1);
			}
			
			&.fade-in{
				animation: fain .5s linear;
			}
			
			&.fade-out{
				animation: faout .5s linear;
			}
		}
	}
</style>
