<template>
	<view class="a_container">
		<!-- 专题栏 -->
		<view class="titleItem fx-row fx-row-center fx-row-space-around">
			<view class="item" :class="{'active':index==titleIndex}" @tap="changeTitle(index)" v-for="(item,index) in allTitle" :key="index">{{item.title}}</view>
		</view>
		<!-- 我的周报 -->
		<view v-if="titleIndex==0">
			<my-weekly></my-weekly>
		</view>
		<!-- 销售数据 -->
		<view v-if="titleIndex==1" >
			<mySales></mySales>
		</view>
		<!-- 排行榜 -->
		<view v-if="titleIndex==2">
			<myRank></myRank>
		</view>		
	</view>
</template>

<script>
  import myRank from '../businessCard_MyRank/businessCard_MyRank.vue';
  import mySales from '../businessCard_MySales/businessCard_MySales.vue';
  import myWeekly from '../businessCard_MyWeekly/businessCard_MyWeekly.vue';

  export default {

    data() {
      return {
        allTitle:[
          {id:0,title:'我的周报'},
          {id:1,title:'销售数据'},
        ],
        titleIndex:0,
        userId:'',
        //我的周报信息
        MyCustomer:{},
      };
    },

    //注册组件
    components:{myRank,mySales,myWeekly,},

	  mounted () {
		  const type = Number(this.currentUser.userType);
		  if (type === 3 || type === 4 || type === 5 || type === 6) {
		  	this.allTitle.push({ id:2, title:'排行榜' });
		  }
	  },

    methods: {
      changeTitle(index){//切换标题
        this.titleIndex = index;
      },

      // 获取我的周报
      searchMyCustomer(){
        this.$api.searchMyCustomer(this.userId).then(res=>{
          console.info(res)
          this.MyCustomer=res

          console.info(this.MyCustomer.salesFirst)
        }).catch(err=>{
          console.info(err)
        })
      }

    },

  }
</script>

<style lang="less">

	.a_container{
		font-family:PingFangSC;border-top:1px solid #EEEEEE;
		.titleItem{
			width:100%;font-family:PingFangSC;height:106upx;
			.item{font-size: 28upx;color: #999999;font-weight: 500;letter-spacing: 2; position:relative;}
			.active{color: #7483FF;}
			.active::after{
				width:70upx;height: 6upx;border-radius: 3upx; background: #6B7AF8;position:absolute;content: '';
				top:54upx;left:15%;
				}
		}
	}

</style>
