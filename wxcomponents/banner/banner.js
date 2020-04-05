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
