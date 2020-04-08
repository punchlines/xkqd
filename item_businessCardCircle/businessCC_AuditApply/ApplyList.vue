<template>
  <view class="apply-list">
    <block v-for="(item,index) in list" :key="index">
      <view class='item_container'>
        <image class='select_icon'
               v-if="status === 1"
               @click.stop="select(item)"
               :src="item._select?'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose_un.png'"></image>
        <view class="auditList">
          <view class="auditCard" :class="{ bottomPaddding: status === 2 }">
            <view class="status" v-if="status === 2">{{ item.result == 1 ? '已同意' : '已拒绝' }}</view>
            <view class="ACcardHeader">
              <view class="ACimage" @click="openMemberDetail(item)">
                <image :src="item.headImage"></image>
              </view>
              <view class="ACtitle">
                <view class="ACTitlebOX">
                  <text class="ACTname">{{ item.name }}</text>
                  <text class="ACTsubname">{{ item.job }}</text>
                </view>
                <view class="ACcomany">{{ item.company }}</view>
              </view>
            </view>
            <view class="ACadd">
              <view v-if="item.inviterUserName">申请渠道：由 {{ item.inviterUserName }} 邀请加入</view>
              <view v-else>申请渠道：名片圈搜索</view>
              <view>申请信息：{{ item.content }}</view>
            </view>
            <view class="ACcardBottem" v-if="status === 1">
              <view class="ACrefuse" @click="refuseCircleApply(item)">拒绝</view>
              <view class="ACreagree" @click="agreeCircleApply(item)">同意</view>
            </view>
          </view>
        </view>
      </view>
    </block>

    <uni-load-more :loading-type="loadingType"></uni-load-more>

    <!--全选 -->
    <view class="allChecked" v-if="status === 1">
      <view class="selectAll" @click="changeSelectAll">
        <image class='select_icon' :src="allSelected?'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose_un.png'"></image> 全选
      </view>
      <view class="buttonAll">
        <view class="allRefuse" @click="refuseSelectCircleApply">全部拒绝</view>
        <view class="allAgree" @click="agreeSelectCircleApply">全部同意</view>
      </view>
    </view>

  </view>
</template>

<script>
  export default {
    name: "ApplyList",

    data () {
      return {
        currentPage: 1,
        list: [],
        loading: false,
        noMore: false,

        allSelected: false, // 全选按钮
      }
    },

    props: {
      circleId: [String, Number],
      status: Number, // 1: 待处理 2: 已处理
    },

    computed: {
      loadingType () {
        if (this.noMore) return 2;
        if (this.loading) return 1;
        return 0;
      },
      selectList () {
        return this.list.filter(item => item._select);
      },
    },

    onReachBottom () {
      if (this.noMore || this.loading) return;
      this.fetch();
    },

    mounted () {
      console.log('xxxx')
      this.fetch();
    },

    methods: {
      fetch () {
        if (this.loading) return;
        this.loading = true;
        this.$api.listCircleApply(this.circleId, this.status, this.currentPage).then(result => {
          this.loading = false;
          const list = result.applyList || result.applyResultList;
          list.forEach(item => {
            item._select = false;
          })
          if (list.length === 0) {
            this.noMore = true;
          }
          this.list = this.list.concat(list);
          this.currentPage++;
        }).catch(error => {
          this.loading = false;
        })
      },

      select (item) {
        item._select = !item._select;
        this.allSelected = this.selectList.length === this.list.length;
      },

      changeSelectAll () {
        this.allSelected = !this.allSelected;
        this.list.forEach(item => {
          item._select = this.allSelected;
        })

      },

      refuseCircleApply (data) {
        let idList = []
        if (data instanceof Array) {
          idList = data.map(item => item.id);
        } else {
          idList = [data.id]
        }
        uni.showLoading();
        this.$api.refuseCircleApply(this.circleId, JSON.stringify(idList)).then(result => {
          uni.hideLoading();
          this.reset();
          this.fetch();
        }).catch(error => {
          this.showError(error);
          uni.hideLoading();
        })
      },

      agreeCircleApply (data) {
        let idList = []
        if (data instanceof Array) {
          idList = data.map(item => item.id);
        } else {
          idList = [data.id]
        }
        uni.showLoading();
        this.$api.agreeCircleApply(this.circleId, JSON.stringify(idList)).then(result => {
          uni.hideLoading();
          this.reset();
          this.fetch();
        }).catch(error => {
          this.showError(error);
          uni.hideLoading();
        })
      },

      refuseSelectCircleApply () {
        if (!this.selectList.length) return;
        this.refuseCircleApply(this.selectList);
      },

      agreeSelectCircleApply () {
        if (!this.selectList.length) return;
        this.agreeCircleApply(this.selectList);
      },

      reset () {
        this.currentPage = 1;
        this.list = [];
        this.loading = false;
        this.noMore = false;
      },

      openMemberDetail (apply) {
        this.navigateTo('/pages/businessCard2/businessCard2', { cardUserId: apply.userId });
      },

    },

  }
</script>

<style scoped lang="less">
  @import '../../css/mzl_base.less';

  .apply-list {

  }

  // 复选框按钮
  .item_container {
    display: flex;
    flex-direction: row;
    align-items: top;
    padding: 20upx;

    .select_icon {
      width: 34upx;
      height: 34upx;
      border-radius: 50%;
    }
  }
    .auditList{
      width:100%;margin-left:20upx;box-sizing:border-box;background:#fff;
      .auditCard{
        position: relative;
        .ACcardHeader{
          padding:30upx 30upx 0 30upx;
          width:100%;
          display: flex;

          .ACimage{
            width:20%;
            image{width:100upx;height: 100upx;}
          }
          .ACtitle{
            width:80%;padding:0upx;box-sizing:border-box;
            .ACTitlebOX{
              width:100%;height:45upx;
              margin-bottom: 17upx;

              .ACTname{margin-right:30upx;font-size:@fsContentTitle;color:@title;font-weight: bold;}
              .ACTsubname{width:auto;padding: 0 18upx; display: inline-block;height:36upx;font-size:20upx;color:#666;background:#F8F8F8;text-align:center;line-height:36upx;border-radius: 18upx; }
            }
            .ACcomany{
              width:100%;height:40upx;font-size:@fsNum;color:@logoNote;
            }
          }
        }
        .ACadd{
          // padding:10upx 30upx 10upx 30upx;
          width: 90%;margin:0 auto;line-height:80upx;background:#F8F8F8;box-sizing:border-box;font-size:@fsNum;color:#666;padding-left:20upx;
        }
        .ACcardBottem{
          border-top:1upx solid @grayBg;font-size:28upx;color:#666;margin-top:20upx;text-align: center;
          .flex();
          .ACrefuse{width:50%;border-right:1upx solid @grayBg;padding:20upx;}
          .ACreagree{width:50%;font-size:28upx;color:@tabActive;padding:20upx;}
        }
      }

    }


  // 底部全选按钮
  .allChecked{
    .flex();position: fixed;font-size:@fsSubTitle;bottom:0;background:#fff;border-top:1upx solid @grayBg;padding:20upx;box-sizing: border-box;
    .selectAll{
      width:20%;
      display: flex;
      align-items: center;
      image{
        width: 34upx; height: 34upx;border-radius: 50%;
        margin-right: 20upx;
      }
    }
    .buttonAll{
      .flex(space-between);width:65%;text-align: center;line-height: 70upx;
      .allRefuse{
        .buttonRadius(@w:200upx;@h:70upx;@bg:none;);
        border:1upx solid @logoNote;
      }
      .allAgree{
        .buttonRadius(@w:200upx;@h:70upx;@bg:none;);
        color: @tabActive;
        border:1upx solid @tabActive;
      }
    }
  }

  .bottomPaddding {
    padding-bottom: 30upx;
  }

  .status {
    position: absolute;
    font-size:24upx;
    color:rgba(102,102,102,1);
    line-height:33upx;
    top: 35upx;
    right: 28upx;
  }

</style>