<template>
<uni-shadow-root class="activeList-activeList"><view class="weui-panel__bd">
  <navigator :url="activeUrl" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
    <view class="weui-media-box__hd weui-media-box__hd_in-appmsg">
      <image class="weui-media-box__thumb" :src="imgUrl"></image>
    </view>
    <view class="weui-media-box__bd weui-media-box__bd_in-appmsg">
      <view class="weui-media-box__title">{{title}}</view>
      <view class="weui-media-box__desc">{{content}}</view>
      <view class="weui-media-box__date"><icon class="iconfont icon-shizhong"></icon>{{date}}</view>
    </view>
  </navigator>
</view></uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'activeList/activeList'
// pages/common/template/activeList/activeList.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持

  },
  /**
   * 组件的属性列表
   */
  properties: {
    activeUrl: { type: String, value: '' }, 
    title: { type: String, value: '' }, 
    content: { type: String, value: '' }, 
    imgUrl: { type: String, value: '' },
    date: { type: String,value:''} 
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
export default global['__wxComponents']['activeList/activeList']
</script>
<style platform="mp-weixin">
/* pages/common/template/activeList/activeList.css */
@import '/wxcomponents/weui.css';
@import '/wxcomponents/iconfont.css';
.weui-panel__bd{
  margin-bottom: 25rpx;
}
.weui-media-box {
  padding: 12rpx;
}

.weui-media-box_appmsg {
  background: #f8f8f8;
  border-radius: 20rpx;
}

.weui-media-box__hd {
  flex: 4;
}

.weui-media-box__bd {
  flex: 8;
  text-align:left;

}

.weui-media-box__hd_in-appmsg {
  margin-right: 20rpx;
  width: 100%;
  height: 180rpx;
  line-height: unset;
}

.weui-media-box__title {
  font-weight: 400;
  font-size: 0.9rem;
  color: #585858;
  line-height: 2.5;
}

.weui-media-box__desc {
  color: #797979;
  font-size: 0.6rem;
  line-height: 1.5;
}
.weui-media-box__date{
  font-size: 0.6rem;
  color: #414141;
  /* display: flex;
  align-items: center; */
}
.weui-media-box__date icon{
  font-size: 0.6rem;
  color: #1297DC;
  /* vertical-align: top */
  margin-top: -20rpx;
  margin-right: 10rpx
}
</style>