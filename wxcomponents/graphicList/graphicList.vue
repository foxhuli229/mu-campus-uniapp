<template>
<uni-shadow-root class="graphicList-graphicList"><view class="weui-panel__bd">
  <navigator :url="activeUrl" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
    <view class="weui-media-box__hd weui-media-box__hd_in-appmsg">
      <image class="weui-media-box__thumb" :src="imgUrl" style="border-radius: 20rpx;"></image>
    </view>
    <view class="weui-media-box__bd weui-media-box__bd_in-appmsg">
      <view class="weui-media-box__title">{{title}}</view>
      <view class="weui-media-box__desc">{{content}}</view>
      <view class="weui-media-box__date"><icon class="iconfont icon-shizhong" v-if="label"></icon>{{date}}</view>
    </view>
  </navigator>
</view></uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'graphicList/graphicList'
// pages/common/template/graphicList/graphicList.js
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
    date: { type: String, value: '' },
	label: {
		type: [Boolean, String],
		value: false
	}
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
export default global['__wxComponents']['graphicList/graphicList']
</script>
<style platform="mp-weixin">
@import "/wxcomponents/activeList/activeList.css";
.weui-media-box__hd {
	width: 240rpx;
	height: 180rpx;
}
.weui-media-box__hd image {
	border-radius: 20rpx;
}
</style>