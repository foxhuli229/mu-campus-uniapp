// pages/common/template/activeList/activeList.js
Component({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持

	},
	/**
	 * 组件的属性列表
	 * @param {type} activeUrl: 图片返回url地址
	 * @param {type} activeUrl: 图片返回url地址
	 * @param {type} title: 图片返回url地址
	 * @param {type} activeUrl: 图片返回url地址
	 * @param {type} activeUrl: 图片返回url地址
	 * @param {type} activeUrl: 图片返回url地址
	 * @param {type} activeUrl: 图片返回url地址
	 * @param {type} activeUrl: 图片返回url地址
	 */
	properties: {
		activeUrl: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		},
		content: {
			type: String,
			default: ''
		},
		imgUrl: {
			type: String,
			default: ''
		},
		date: {
			type: String,
			default: ''
		},
		labelText: {
			type: String,
			default: ''
		},
	},
	onLoad() {
		if(this.imgUrl.includes(",")) {
			let url = this.imgUrl.split(",");
			this.setData({
				imgUrl: url[0]
			})
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
		goactive(url) {
			console.log(url)
			wx.navigateTo({
				url: url
			})
		}
	},
	
})
