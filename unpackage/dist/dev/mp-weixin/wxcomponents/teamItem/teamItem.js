// pages/common/template/teamItem/teamItem.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持

  },
  /**
   * 组件的属性列表
   */
  properties: {
	activeUrl: { type: String, value: '' }, 
	avatarUrl: { type: String, value: 'https://mumu-small.oss-cn-shenzhen.aliyuncs.com/images/head1.png' }, 
	name: { type: String, value: 'Annine_' }, 
	title: { type: String, value: '参加重庆市计算机设计大赛' }, 
    totalNum: { type: Number, value: 10 }, 
    currentNum: { type: Number, value: 0 },
    remainTime: { type: Number, value: 24 },
    content: { type: String, value: '' },
    belong: { type: String, value: '重庆文理学院' },
    range: { type: Array, value: ['计算机学院','美术学院'] },
    cover: { type: String, value: '' }

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
	toJoin(){
		wx.navigateTo({
			url:'/pages/teamRecruitment/join/join'
		})
	}
  }
})
