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