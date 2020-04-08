<template>
  <view class="s_container">
    <!-- 选择器 -->
	 <view class="content fx-row fx-row-space-between">
		 <view class="selType fx-row fx-row-center fx-row-space-between" @click="showDropDown = true">
			<text>销售额</text>
			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/down.png'" mode=""></image>
		 </view>
		 <view class="dropDown" :style="{ display: showDropDown ? 'block' : 'none' }" @click="showDropDown = false">
		 	<view @click="selectSaleDataType">销售额</view>
		 	<view @click="selectCustomerDataType">客户数</view>
		 </view>
		 
		<view class="selDate fx-row fx-row-center fx-row-space-between" >
			<picker class="picker-item" mode="date" start="2018-01-01" end="2090-01-01" :value='startDate'   @change="dateChange1">
				<view class="picker-item-zi">
					<text>{{startDate}}</text>
					</view>				
			</picker>			
		</view>
		<view class="zj">
			至
		</view>
		<view class="selDate fx-row fx-row-center fx-row-space-between" >
			<picker class="picker-item" mode="date" start="2018-01-01" end="2090-01-01" :value='endDate'  @change="dateChange2">
				<view class="picker-item-zi">
					<text>{{endDate}}</text>
					</view>				
			</picker>			
		</view>
		
    </view>
	<!--  -->
    <view class="salesCon">
      <view class="category fx-row fx-row-center fx-row-space-between">
          <view class="total fx-column">
              <text class="title">{{ isSale ? '销售总额' : '客户数' }}</text>
              <text class="money">{{ allSalesReport }}</text>
          </view>
           <view class="week fx-column">
              <text class="title">本周{{ isSale ? '销售总额' : '客户数' }}</text>
              <text class="money">{{ weekSalesReport }}</text>
          </view>
      </view>
       <!-- 图表显示区域 -->    
         		<view class="canvasView">
							<mpvue-echarts :echarts="echarts" :onInit="onInit" />
						</view>
      
    </view>
  </view>

</template>

<script>

  var getDay = require('date-fns/get_day')
  var addDays = require('date-fns/add_days')
  var parse = require('date-fns/parse')
  var differenceInDays = require('date-fns/difference_in_days')
  var startOfWeek = require('date-fns/start_of_week')

  import echarts from '../../components/echarts/echarts.simple.min.js'
  import mpvueEcharts from '../../components/mpvue-echarts/src/echarts.vue';

  let lineOption = {
    animation: false,
    color: ['#EA80FC'],
    grid: {
      x: 35,
      y:100,
    },
    calculable: false,
    xAxis: [{
      type: 'category',
      axisLine: {
        show: false,
	  },
      axisTick: {
        show: false,
	  },
      axisLabel: {
        color: '#A9ACBD'
	  },
      data: []
    }],
    yAxis: [{
      show: false,
      type: 'value',
      splitArea: {
        show: false
      }
    }],
    series: [{
      type:'line',
      smooth:true,
      symbol: 'none',
      sampling: 'average',
      itemStyle: {
        color: 'rgb(234, 128, 252)'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(234, 128, 252, 0.5)'
        }, {
          offset: 1,
          color: 'rgba(234, 128, 252, 0)'
        }])
      },
      data: []
    },]
  };

  let chart = null;

  function initChart(canvas, width, height) {
    //console.log(canvas, width, height)
    chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);
    chart.setOption(lineOption);

    return chart;
  }

  const DATA_TYPE_SALE = 0
  const DATA_TYPE_CUSTOMER = 1

  export default {

    data () {
      return {
        onlineSite:this.global.onlineSite,
        showDropDown: false,
        echarts: echarts,
        onInit: initChart,

		startDate: '',
		startDateValue: 0,
		endDate: '',
        endDateValue: 0,

        allSalesReport: 0,
        salesReport: [],

		currentType: DATA_TYPE_SALE,
      }
    },

    //注册组件
    components:{
      mpvueEcharts
    },

	watch: {
      currentType () {
        this.fetch()
        console.log('xxx' + this.currentType);
	  },
	},

	computed: {
      isSale () {
        return this.currentType === DATA_TYPE_SALE;
	  },
      weekSalesReport () {
        return (this.salesReport.map(item => item.amount).reduce((a, b) => a + b, 0) || 0).toFixed(2);
	  }
	},

    mounted:function(){
      const startDate = addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), -7);
      const endDate = addDays(startDate, 6);

      this.startDateValue = startDate;
      this.endDateValue = endDate;

      this.startDate = this.formatDate(startDate, 'YYYY-MM-DD');
      this.endDate = this.formatDate(endDate, 'YYYY-MM-DD');

      this.fetch();
    },

    methods: {
      // 获取销售数据
      fetch(){
        uni.showLoading();
        const isSale = this.isSale;
        const action = isSale
			? this.$api.getSalesReport(this.startDate, this.endDate)
			: this.$api.getImportUserReport(this.startDate, this.endDate)

        action.then((res)=>{
          uni.hideLoading();
          if (res.ERROR === '40001') {
            this.showError('最大时间跨度为30天')
            return;
		  }
          this.allSalesReport = isSale ? res.allSalesReport : res.allCustomerNum;
          this.salesReport = isSale ? res.salesReport : res.customerReport;

          this.processWeeklyData(this.salesReport);
        }).catch((err)=>{
          uni.hideLoading();
          console.info(err)
        })
      },

	  processWeeklyData (list) {
        const x = [], y = [];

        const dataMap = {};
        list.forEach(item => {
          dataMap[this.formatDate(item.completeTime, 'MM.DD')] = item.amount;
        })

        const diffDay = differenceInDays(this.endDateValue, this.startDateValue)
        for (let i = 0; i <= diffDay; i++) {
          const date = this.formatDate(addDays(this.startDateValue, i), 'MM.DD');
          x.push(date);
          y.push(dataMap[date] || 0);
		}

        lineOption.xAxis[0].data = x;
        lineOption.series[0].data = y;

        if (chart) chart.setOption(lineOption);
	  },

      dateChange1(evt) {
		this.startDate = evt.detail.value;
		this.startDateValue = parse(evt.detail.value);
        this.getSalesReport();
      },
      dateChange2(evt){
		this.endDate = evt.detail.value;
        this.endDateValue = parse(evt.detail.value);
        this.getSalesReport();
      },

	  selectSaleDataType () {
        this.currentType = DATA_TYPE_SALE;
	  },

      selectCustomerDataType () {
        this.currentType = DATA_TYPE_CUSTOMER;
      },

      // 图表
      lineInit(canvas, width, height) {
        let lineChart = echarts.init(canvas, null, {
          width: width,
          height: height
        })
        canvas.setChart(lineChart)

        lineChart.setOption(lineOption)
        return lineChart
      },
    },



  }

</script>

<style scoped lang="less">


  .s_container{
	  width:100%;background:#F8F8F9;font-family:PingFangSC;
	  // 选择时间和类别
	  .content{
	  	box-sizing:border-box;padding:40upx 30upx;
	  	.selType{
	  		width:200upx;height:80upx;background:#ffffff;box-sizing:border-box;padding:0 30upx;position:relative;
	  		font-size:28upx;color:#333333;
				image{width: 20upx;height: 11upx;}
	  	}
	  	.selDate{
	  		width:200upx;height:80upx;background:#FFFFFF;box-sizing:border-box;padding:0 20upx;
	  		image{width: 20upx;height: 11upx;}
	  	}
	  	.picker-item{
	  		font-size: 28upx;color: #333333;font-weight: 400;font-family: PingFangSC;
				
	  	}
			.zj{
				height:80upx;background:#ffffff;box-sizing:border-box;font-size:28upx;font-weight: bold;line-height: 80upx;
				padding:0 10upx;
			}
	  }
	 .salesCon{
	   width: 100%;background:#ffffff;
	   .category{
	     width: 100%;box-sizing:border-box;padding:0 30upx;padding-top:80upx;
	     .total{width: 330upx;height: 180upx;box-shadow:0upx 0upx 20upx 0upx rgba(107,122,248,0.21);
	     border-radius:10upx;border-left: 16upx solid #808AFC;
	     }
	     .week{
	       width:330upx;height:180upx;margin-left:30upx;box-shadow:0upx 0upx 20upx 0upx rgba(107,122,248,0.21);
	     border-radius:10upx;border-left: 16upx solid #FF8272;
	     }
	     .title{font-size: 24upx;color: #666666;padding:26upx 0 33upx 0upx;}
	     .money{font-size: 36upx;color: #232A44;padding-left:30upx;}
	   }
	   // 图表显示区域
	   .tableCon{
	     margin-top:165upx;
				
	   }
	 } 
	 
	 .dropDown {
	 	width: 334upx;position: absolute;top: 235upx;left:30upx;background: rgba(255, 255, 255, 1);
	 	box-shadow: 0upx 1upx 8upx 0upx rgba(187, 187, 187, 0.55);z-index: 1000;zoom: 1;border-radius: 8upx;			
	 	view {
	 		font-size: 28upx;color: #333333;line-height: 80upx;text-align: center;
	 		&:after {
	 			content: "";display: block;width: calc(~"100%" - 40upx);height: 2upx;background-color: #E1E1E1;margin-left: 20upx;
	 		}
	 		&:active {background-color: #eee;}
	 		&:last-child {
	 			&:after {display: none;}
	 		}
	 		&:before {
	 			content: "";position: absolute;width: 0;height: 0;top: 0;
	 			right: -15upx;box-sizing: border-box;transform-origin: 0 0;
	 			transform: rotate(135deg);box-shadow: -1upx 1upx 8upx -1upx rgba(187, 187, 187, 0.55);
	 		}
	 	}
	 }
  }
// 图表

	page {
		min-height: 100%;
	}
	.page-section-title {
		padding: 0 30upx;
	}

	.title {
		margin-left: 30upx;
		color: #8f8f94;
	}

	.container {
		padding-bottom: 30upx;
		box-sizing: border-box;
	}

	.canvasView {
		flex: 1;
		flex-direction: column;
		width: 100%;
		height: 600upx;
	}

	.navigate {
		color: #007AFF;
	}

	.canvas-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.update-btn {
		margin-right: 30upx;
	}

</style>