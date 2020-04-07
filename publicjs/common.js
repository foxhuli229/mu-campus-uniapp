import store from '../store/index.js'

const app = getApp();
const requestURL = ({
	url,
	method = "POST",
	params
}) => {
	// 返回一个Promise实例对象
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中',
		})
		//获取token
		let token = store.state.token;
		if(token == "") {
			token = uni.getStorageSync("token")
		}
		uni.request({
			url: app.globalData.host + "" + url,
			header: {
				"token": token,
				// 'content-type': "application/x-www-form-urlencoded"
				'content-type': "application/json;charset=utf-8"
			},
			method: method,
			data: params,
			success: res => {
				console.log(res.data);
				resolve(res.data);
			},
			fail: function(res) {
				uni.showToast({
					title: res.errMsg || url + '调用失败！',
					icon: 'none',
					duration: 2000,
					mask: true
				})
				console.log(res)
				reject(res)
			},
			complete: function() {
				//接口调用结束的回调函数
				uni.hideLoading()
			}
		})
	})
}

/**
 * 检查token是否存在
 */
const checkToken = function checkToken() {
	let token = store.state.token;
	if(token == "") {
		token = uni.getStorageSync("token")
	}
	if(typeof token === "undefined" || typeof token === "") {
		uni.showModal({
			title: "温馨提示",
			content: "请先授权登录！",
			showCancel: false,
			success: function(res) {
				if(res.confirm) {
					uni.redirectTo({
						url: '/pages/home/login/login'
					})
				}
			}
		})
	}else {
		//检查token是否存在
		uni.checkSession({
			fail: (res) => {
				uni.request({
					url: app.globalData.host + "/user/refresh",
					method: 'POST',
					data: {"token": store.state.token},
					success: (res) => {
						console.log("刷新了token值", res);
						store.state.commit("token", res.token);
						// uni.setStorage({key: 'token', data: res.token})
					}
				})
			}
		})
	}
}

/**
 * 检查是否登录
 * 从本地缓存中异步获取指定 key 对应的内容。
 */
const checkLogin = function checkLogin() {
	uni.checkSession({
		success() {
			
		},
		fail: () => {
			login(); //登录
		}
	})
}


/**
 * 登录
 */
const login = function login() {
	uni.getProvider({
		service: 'oauth',
		success(provRes) {
			if(~res.provider.indexOf('weixin')) {
				uni.login({
					provider: 'weixin',
					success(res) {
						if (res.code) {
							let code = res.code;
							uni.getUserInfo({
								provider: 'weixin',
								success: (userRes) => {
									console.log(userRes);
									let iv = userRes.iv;
									let encryptedData = userRes.encryptedData;
									let param = {
										code,
										iv,
										encryptedData
									}
									console.log(param)
									uni.request({
										url: app.globalData.host +  '/user/wxlogin',
										method: 'POST',
										params: JSON.stringify({ code, encryptedData, iv }),
										success: (res) => {
											res = res.data;
											if (res.code === 200) {
												store.state.commit("token", res.data.token);
												store.state.commit("userinfolist", res.data.user);
												console.log("common.js 登录成功")
											}else {
												uni.showModal({
													title: '提示',
													content: '登录失败,请重试！',
												})
											}
										},
										fail: (res) => {
											uni.showModal({
												title: '提示',
												content: '登录失败,请重试！',
											})
										}
									})
								},
								fail(userRes) {
									console.log("获取用户信息报错了", userRes);
								}
							})
						} 
					},
					fail: (res) => {
						console.log("登录失败", res)
						uni.showModal({
							title: '提示',
							content: '登录失败,请重试！',
						})
					}
				})
			}else {
				uni.showModal({
					title:"温馨提示",
					content: "目前暂不支持，其他设备登录！"
				})
			}
		}
	})
}

// 加载网络字体
const fonts = function fonts() {
	// 动态加载网络字体，文件地址需为下载类型。
	uni.loadFontFace({
		family: "PangMenZhengDao",
		source: "url('https://cmrs-oos.oss-cn-beijing.aliyuncs.com/font/pmzd.ttf')",
	});
}

module.exports = {
	requestURL,
	login,
	fonts,
	checkLogin,
	checkToken
}
