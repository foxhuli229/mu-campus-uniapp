<template>
<uni-shadow-root class="teamItem-teamItem"><view class="weui-panel__bd">
  <view :class="ellipsis?'ellipsis':'unellipsis'">
    <view>
      <image src="https://mumu-small.oss-cn-shenzhen.aliyuncs.com/images/head1.png"></image>
    </view>
    <view></view>
  </view>
  <view @click="ellipsis">{{ellipsis?'展开信息 ▽':'收起信息 △'}}</view>

</view></uni-shadow-root>
</template>

<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'teamItem/teamItem'
// pages/common/template/teamItem/teamItem.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持

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
    ellipsis: true,// 文字是否收起，默认收起
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ellipsis() {
      let that = this;
      // let value = !this.data.ellipsis;
      that.setData({
        ellipsis: !that.data.ellipsis
      })
    },
  }
})
export default global['__wxComponents']['teamItem/teamItem']
</script>
<style platform="mp-weixin">
/* pages/common/template/teamItem/teamItem.css */
@import '/wxcomponents/weui.css';
@import '/wxcomponents/iconfont.css';

/* 修改列数 3行 */
.ellipsis {
    display: -webkit-box;
    -webkit-box-orient:vertical;
    text-overflow: ellipsis;
    overflow:hidden;
    -webkit-line-clamp: 3;
}
/* 展示全部 */
.unellipsis {
  display: -webkit-box;
  -webkit-box-orient:vertical;
  text-overflow: ellipsis;
  overflow:hidden;
  -webkit-line-clamp: 0;
}
</style>