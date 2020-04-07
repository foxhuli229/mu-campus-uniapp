/**
 * 日期格式化
 * @param {Object} type
 */
const dateformat = function getDate(type) {
	const date = new Date();

	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (type === 'start') {
		year = year - 60;
	} else if (type === 'end') {
		year;
	}
	month = month > 9 ? month : '0' + month;;
	day = day > 9 ? day : '0' + day;

	return `${year}-${month}-${day}`;
}

/**
 * 日期转换
 * @param {Object} time 时间
 * @param {Object} cFormat 需要转换的格式
 */
function parseTime(time, cFormat) {
	if (arguments.length === 0) {
	  return null
	}
	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'undefined' || time === null || time === 'null') {
	  return ''
	} else if (typeof time === 'object') {
	  date = time
	} else {
	  if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
	    time = parseInt(time)
	  }
	  if ((typeof time === 'number') && (time.toString().length === 10)) {
	    time = time * 1000
	  }
	  date = new Date(time)
	}
	const formatObj = {
	  y: date.getFullYear(),
	  m: date.getMonth() + 1,
	  d: date.getDate(),
	  h: date.getHours(),
	  i: date.getMinutes(),
	  s: date.getSeconds(),
	  a: date.getDay()
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
	  let value = formatObj[key]
	  // Note: getDay() returns 0 on Sunday
	  if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
	  if (result.length > 0 && value < 10) {
	    value = '0' + value
	  }
	  return value || 0
	})
	return time_str
}

/**
 * 时间转换
 * @param {Object} time
 * @param {Object} option
 */
function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}


// 替换邮箱字符
function regEmail(email) {
  if (String(email).indexOf('@') > 0) {
    const str = email.split('@')
    let _s = ''
    if (str[0].length > 3) {
      for (var i = 0; i < str[0].length - 3; i++) {
        _s += '*'
      }
    }
    var new_email = str[0].substr(0, 3) + _s + '@' + str[1]
  }
  return new_email
}

// 替换手机字符
function regMobile(mobile) {
  if (mobile.length > 7) {
    var new_mobile = mobile.substr(0, 3) + '****' + mobile.substr(7)
  }
  return new_mobile
}

// 下载文件
function downloadFile(obj, name, suffix) {
  const url = window.URL.createObjectURL(new Blob([obj]))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  const fileName = parseTime(new Date()) + '-' + name + '.' + suffix
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

//获取手机验证码
function getPayYzm() {
    var clock = '';
    var nums = 60;
    var phone = $("#yinlianCard_ul_select").attr("phone");
    $("#getyzm").html(nums + "s后重新获取");
    clock = setInterval(function() {
        nums--;
        if(nums > 0) {
            $("#getyzm").attr("href","javascript:void(0)");
            $("#getyzm").html(nums + "s后重新获取");
        } else {
            clearInterval(clock); // 清除js定时器
            $("#getyzm").attr("href","javascript:getPayYzm()");
            $("#getyzm").html("获取手机验证码");
            nums = 60; // 重置时间
        }
    }, 1000);

    // $.post("/user/getShopYzm",{
    //     "token":$("#yinlianCard_ul_select").attr("token"),
    //     "orderid":play_orderid,
    //     "txnAmt":play_orderpicre, //金额
    //     "txnTime":generateTimeReqestNumber(),
    //     "phoneNo":user_phone
    // },function(value){
    //     if (value.errcode == 0 && value.errmsg == "ok") {

    //     }else {
    //         inquiryWin('接口出现错误！');
    //     }
    // })

}



module.exports = {
	dateformat,
	parseTime,
	formatTime,
	regEmail,
	regMobile,
	downloadFile
} 