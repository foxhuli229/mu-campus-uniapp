import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false, //是否登录
		loginProvider: "", //登录设备
		token: "",
		userinfolist: {}, //用户信息
		SET_SYSTEM_IOSANDROID: false, //是否是Android平台
		SET_STATUS_BAR: 0, //当前设备的系统高度  状态栏高度
		SET_CUSTOM_BAR: 0, //当前设置的系统高度 + 45  状态栏高度 + 导航栏高度
		SET_SYSTEM_INFO: "" //当前设备的系统信息
	},
	mutations: {
		login(state, user) {
			state.hasLogin = true;
			state.loginProvider = user.provider || "";
			state.userinfolist = user;
			try {
			    uni.setStorageSync('userinfolist', user);
			} catch (e) {
			    // error
				console.log("uni.userinfolist存储失败")
			}
			try {
			    uni.setStorageSync('loginProvider', user.provider);
			} catch (e) {
			    // error
				console.log("uni.provider存储失败")
			}
		},
		logout(state) {
			state.hasLogin = false
			state.token = "",
			state.userinfolist = {};
			uni.clearStorageSync()
		},
		loginProvider(state, provider) {
			state.loginProvider = provider;
			try {
			    uni.setStorageSync('loginProvider', provider);
			} catch (e) {
			    // error
				console.log("uni.provider存储失败")
			}
		},
		token(state, token) {
			state.token = token;
			try {
			    uni.setStorageSync('token', token);
			} catch (e) {
			    // error
				console.log("uni.token存储失败")
			}
		},
		userinfolist(state, userinfo) {
			console.log(userinfo);
			state.userinfolist = userinfo;
			uni.setStorageSync("userinfolist", userinfo);
		},
		SET_SYSTEM_IOSANDROID(state, SET_SYSTEM_IOSANDROID) {
			state.SET_SYSTEM_IOSANDROID = SET_SYSTEM_IOSANDROID;
		},
		SET_STATUS_BAR(state, SET_STATUS_BAR) {
			state.SET_STATUS_BAR = SET_STATUS_BAR
		},
		SET_CUSTOM_BAR(state, SET_CUSTOM_BAR) {
			state.SET_CUSTOM_BAR = SET_CUSTOM_BAR
		},
		SET_SYSTEM_INFO(state, SET_SYSTEM_INFO) {
			state.SET_SYSTEM_INFO = SET_SYSTEM_INFO
		}
	},
	getters: {
		
	},
	actions: {
		
	},
	modules:{
		
	}
})

export default store