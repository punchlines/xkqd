<template>
  <movable-area class="drag-sort" :style="{height: currentListLength * height + 'px'}" id="drag">
    <movable-view
    v-for="(item, index) in currentList"
    :key="index"
    :x="0"
    :y="item.y"
    direction="vertical"
    disabled
    damping="40"
    :animation="active !== index"
    class="drag-sort-item"
    style="height:55px"
    :class="{'active': active === index, 'vh-1px-t': item.index > 0}">
      <view class="item fx-row fx-row-center">
		<view>
			<image src="http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose_un.png"  class="sel"></image>
		</view>
		<view class="fx-column info">
			<view class="vname">教你年赚五百万{{index}}</view>
			<view class="vdate">2015.09.30</view>
		</view>
		
		<!-- {{item[props.label]}} -->
	  </view>
      <view class="touch-tight">
		  <image class="sel" src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/cardImages/voice.png"></image>
		  <text class="text">50秒</text>
       <!-- <view class="ico_drag"></view> -->
      </view>
    </movable-view>
    <movable-view
    class="touch"
    :x="2000"
    @touchmove="touchmove"
    @touchend="touchend"
	@longpress.stop="touchstart"
    catchtouchmove
    catchtouchend></movable-view>
	<!-- @touchstart="touchstart" -->
	<!-- catchtouchstart -->
  </movable-area>
</template>

<script>
export default {
  name: 'drag-sort',
  mixins: [],
  components: {},
  data () {
    return {
      height: 55, // 高度
      currentList: [],
      active: -1, // 当前激活的item
      itemIndex: 0, // 当前激活的item的原index
      topY: 0, // 距离顶部的距离
      deviationY: 0// 偏移量
    }
  },
  computed: {
    currentListLength (){
      return this.currentList.length
    }
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    props: {
      type: Object,
      default: () => {
        return {
          label: 'label',
          value: 'value'
        }
      }
    }
  },
  watch: {
    list (val) {
      this.onUpdateCurrentList()
    }
  },
  created () {
    this.onUpdateCurrentList()
  },
  mounted () {

  },
  updated () {},
  filters: {},
  methods: {
	  lp(e){
		  console.log(e)
	  },
	  
    onUpdateCurrentList () {
      let arr = []
      for (const key in this.list) {
        arr.push({
          ...this.list[key],
          index: Number(key),
          y: key * this.height,
          animation: true
        })
      }
      this.currentList = arr
    },
    touchstart (e) {
      // 计算y轴点击位置
      var query = uni.createSelectorQuery().in(this)
      query.select('#drag').boundingClientRect()
      query.exec((res) => {
        this.topY = res[0].top
        let touchY = e.mp.touches[0].clientY - res[0].top
        this.deviationY = touchY % this.height
        // console.log(touchY)
        for (const key in this.currentList) {
          if ((this.currentList[key].index * this.height < touchY) && ((this.currentList[key].index + 1) * this.height > touchY)) {
            this.active = Number(key)
            this.itemIndex = this.currentList[key].index
            break
          }
        }
      })
    },
    touchmove (e) {
      if (this.active < 0) return
      let touchY = (e.mp.touches[0].clientY - this.topY) - this.deviationY
      // console.log(touchY)
      this.currentList[this.active].y = touchY
      for (const key in this.currentList) {
        // 跳过当前操作的item
        if (this.currentList[key].index !== this.currentList[this.active].index) {
          if (this.currentList[key].index > this.currentList[this.active].index) {
            if (touchY > this.currentList[key].index * this.height - this.height / 2) {
              this.currentList[this.active].index = this.currentList[key].index
              this.currentList[key].index = this.currentList[key].index - 1
              this.currentList[key].y = this.currentList[key].index * this.height
              break
            }
          } else {
            if (touchY < this.currentList[key].index * this.height + this.height / 2) {
              this.currentList[this.active].index = this.currentList[key].index
              this.currentList[key].index = this.currentList[key].index + 1
              this.currentList[key].y = this.currentList[key].index * this.height
              break
            }
          }
        }
      }
    },
    touchend (e) {
	  if (this.active < 0) return
      if ((this.itemIndex !== this.currentList[this.active].index) && (this.active > -1)) {
		  // console.log(this.currentList)
        this.$emit('change', {
          // 操作值
          data: (() => {
            let data = {
              ...this.currentList[this.active]
            }
            delete data.index
            delete data.y
            delete data.animation
            return data
          })(),
          // 插队的位置前面的值
          frontData: (() => {
            for (const iterator of this.currentList) {
              if (this.currentList[this.active].index - 1 === iterator.index) {
                let data = {
                  ...iterator
                }
                delete data.index
                delete data.y
                delete data.animation
                return data
              }
            }
          })()
        })
      }
      this.currentList[this.active].animation = true
      this.currentList[this.active].y = this.currentList[this.active].index * this.height
      this.active = -1
    }
  }
}
</script>

<style lang='less' scoped>
@import "~./1px.less";
.drag-sort {
  width: 100%;
}
.sel{
	width: 35upx;
	height: 35upx;
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

.drag-sort-item {
  position: absolute !important;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0;
  margin: 0;
  background: #fff;
  padding: 0 30upx;
  box-sizing: border-box;
  .item {
    flex: 1;
  }
  .touch-tight {
    /* width: px; */
    display: flex;
    justify-content: center;
  }
}
.touch {
  height: 100%;
  width: 350upx;
}
.ico_drag {
  display: inline-block;
  width: 24px;
  height: 12px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAYCAYAAAC8/X7cAAAAAXNSR0IArs4c6QAAAEtJREFUWAnt1cEJACAMA0B1/506moIr5FEK51+Jl0d2Vd01+JzB2X90H5jeoPwECBDIBLYlzgDj25Y4JvQAAQIERgtY4u76LHF3Aw8rGQnK3sYAXQAAAABJRU5ErkJggg==) 0 0 no-repeat;
  background-size: 100% auto;
}
.active {
  box-shadow: 0 0 40rpx #DDDDDD;
  z-index: 99;
}
</style>
