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
	//页面跳转
	gonewWeb(e) {
		let url = e.currentTarget.dataset.imgurl;
		url= encodeURIComponent(url)
		if (url != '') {
			wx.navigateTo({
				url: "/pages/home/web/web?url=" + url
			});
		}
	},
  }
})
