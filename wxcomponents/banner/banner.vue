<template>
<uni-shadow-root class="banner-banner"><view class="banner">
  <image :src="bannerUrl"></image>
</view></uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'banner/banner'
// pages/common/template/banner/banner.js
var app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持

  },
  /**
   * 组件的属性列表
   */
  properties: {
    bannerUrl: { type: String, value: app.globalData.oosHost+ 'index_banner.jpg' }, 
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

  }
})
export default global['__wxComponents']['banner/banner']
</script>
<style platform="mp-weixin">
/* pages/common/template/banner/banner.css */
@import '/wxcomponents/weui.css';
.banner{
  max-height: 300rpx;
  overflow: hidden
}
.banner image{
  width: 100%;
  height: 300rpx;
}
</style>