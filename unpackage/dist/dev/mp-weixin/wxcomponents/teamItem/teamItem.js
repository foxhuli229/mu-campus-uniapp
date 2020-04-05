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
