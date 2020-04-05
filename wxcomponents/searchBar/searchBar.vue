<template>
<uni-shadow-root class="searchBar-searchBar"><view class="search-bar">
  <navigator class="search-left" url="/pages/search/search">
    
    <image class="search-icon" :src="searchIcon"></image>
  </navigator>
  <view class="search-right">
    <view class="side-pull">
      <icon class="iconfont icon-caidan1"></icon>
    </view>
    <view class="release" @click="openRelease">
      <icon class="iconfont icon-icon"></icon>
    </view>
  </view>

</view></uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'searchBar/searchBar'
// pages/common/template/searchBar/searchBar.js
var app = getApp();

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持

  },
  /**
   * 组件的属性列表
   */
  properties: { 
    searchIcon: { type: String, value: app.globalData.oosHost+ 'sys/icon_search.png' }, 
    inputVal: { type: String, value: '' }, 
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openRelease:function(){
      wx.showActionSheet({
        itemList: ['活动', '悬赏', '招募'],
        success(res) {
          if(res.tapIndex==0){
            console.log('发布活动')
          }else if(res.tapIndex==1){
            console.log('发布悬赏')
          }else{
            console.log('发布招募')
          }
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })

    }
  }
})
export default global['__wxComponents']['searchBar/searchBar']
</script>
<style platform="mp-weixin">
/* pages/common/template/searchBar/searchBar.css */
@import '/wxcomponents/weui.css';
@import '/wxcomponents/iconfont.css';
.search-bar {
  display: flex;
  align-items: center;
  padding: 18rpx 10rpx;
}

.search-bar .search-left {
  background: #4c6ff3;
  height: 60rpx;
  border-radius: 30rpx;
  position: relative;
  flex: 2;
}

.search-bar .search-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end
}
.search-bar .search-right icon{
  font-size: 44rpx
}
.search-bar .search-right .side-pull{
  margin-right: 14rpx
}

/* input.search-bar__input {
  background-color: #4c6ff3;
  border-radius: 50rpx;
  height: 60rpx;
  color: #fff;
  padding-left: 10rpx;
}
 */

.search-bar__input {
	
	background-color: #f5f5f5;
	color: #f5f5f5;
}

.search-icon {
  position: absolute;
  top: 10rpx;
  right: 20rpx;
  width: 35rpx;
  height: 34rpx;
}
</style>