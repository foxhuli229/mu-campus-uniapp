<template>
<uni-shadow-root class="sidePull-sidePull"><view class="page-slidebar">
  <view class="page-content">
    <view class="wc">
      <text>首页</text>
    </view>
    <view class="wc">
      <text>导航一</text>
    </view>
    <view class="wc">
      <text>导航二</text>
    </view>
    <view class="wc">
      <text>导航三</text>
    </view>
  </view>
</view>！</uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'sidePull/sidePull'
// pages/common/template/sidePull/sidePull.js
Component({
  options:{
    multipleSlots:true
  },
  /**
   * 组件的属性列表
   */
  properties: {

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
export default global['__wxComponents']['sidePull/sidePull']
</script>
<style platform="mp-weixin">
/* pages/common/template/sidePull/sidePull.css */

/* 侧边栏样式 */
.page-slidebar {
    height: 100%;
    width: 750rpx;
    position: fixed;
    background-color:white;
    z-index: 0;
}
 
/* 控制侧边栏的内容距离顶部的距离 */
.page-content {
    padding-top: 60rpx;
}
 
/* 侧边栏内容的 css 样式 */
.wc {
    color:black;
    padding: 30rpx 0 30rpx 150rpx;
    border-bottom: 1px solid #eee; 
}
 
/* 当屏幕向左滑动，出现侧边栏的时候，主页的动画样式 */
/* scale：取值范围 0~1 ，表示屏幕大小是原来的百分之几，可以自己修改成 0.8 试下*/
/* translate(60%,0%) 表示向左滑动的时候，侧边栏占用平时的宽度为 60%   */
/* .c-state {
    transform: rotate(0deg) scale(1) translate(60%, 0%);
    -webkit-transform: rotate(0deg) scale(1) translate(60%, 0%);
} */
</style>