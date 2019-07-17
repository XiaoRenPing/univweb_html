
/**
 * 设置cookies
 * @param {[String]}
 * @param {[String]}
 */
function setCookie (name, value, days) {
    let Days = days || 7 // 此 cookie 将被保存 30 天
    let exp = new Date() // new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 3600 * 1000)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + '; path=/'
}
/**
 * 设置允许子域共享的cookie
 * @param {[String]}
 * @param {[String]}
 */
function setCorsCookie (name, value) {
    // 设置过期时间
    let d = new Date()
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000))
    let expires = d.toUTCString()
    // 设置共享子域
    let host = location.hostname.split('.')
    let domain = host[1] + '.' + host[2]
    // 设置cookie
    document.cookie = name + '=' + escape(value) + ';domain=' + domain + ';expires=' + expires + ';path=/'
}
/**
 * 清除指定cookie
 * @param  {[String]}
 */
function clearCookie (name) {
    let exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = getCookie(name)
    if (cval != null) {
        document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + '; path=/'
    }
}
/**
 * 获取cookie
 * @param  {[String]}
 */
function getCookie (name) {
    let arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
    if (arr != null) {
        return unescape(arr[2])
    } else {
        return null
    }
}
/**
 * 清除所有cookie
 */
function clearAllCookie () {
    let cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i]
        let eqPos = cookie.indexOf('=')
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    }
    if (cookies.length > 0) {
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i]
            let eqPos = cookie.indexOf('=')
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
            let domain = location.host.substr(location.host.indexOf('.'))
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + domain
        }
    }
}
/**
 * 时间戳格式转换
 * @param  {[String]}
 * @param  {[Number]}
 */
function filterTime (val, type) {
    if (!type) {
        type = 1
    }
    val = Number(val)
    let teshu = new Date(val).getFullYear() - 2000
    let year = new Date(val).getFullYear()
    let month = new Date(val).getMonth() + 1 < 10 ? '0' + (new Date(val).getMonth() + 1) : new Date(val).getMonth() + 1
    let day = new Date(val).getDate() < 10 ? '0' + new Date(val).getDate() : new Date(val).getDate()
    let week = new Date(val).getDay()
    let hours = new Date(val).getHours() < 10 ? '0' + new Date(val).getHours() : new Date(val).getHours()
    let minute = new Date(val).getMinutes() < 10 ? '0' + new Date(val).getMinutes() : new Date(val).getMinutes()
    let second = new Date(val).getSeconds() < 10 ? '0' + new Date(val).getSeconds() : new Date(val).getSeconds()
    let timeObj = {
        year: year,
        month: month,
        day: day,
        hours: hours,
        minute: minute,
        second: second,
        teshu: teshu
    }
    let weekStr
    if (type === 1) {
        return timeObj.year + '-' + timeObj.month + '-' + timeObj.day
    } else if (type === 2) {
        return timeObj.year + '-' + timeObj.month + '-' + timeObj.day + ' ' + timeObj.hours + ':' + timeObj.minute + ':' + timeObj.second
    } else if (type === 3) {
        return timeObj.hours + ':' + timeObj.minute + ':' + timeObj.second
    } else if (type === 4) {
        return timeObj.year + '-' + timeObj.month + '-' + timeObj.day + ' ' + timeObj.hours + ':' + timeObj.minute
    } else if (type === 5) {
        return timeObj.month + '-' + timeObj.day
    } else if (type === 6) {
        return timeObj.hours + ':' + timeObj.minute
    } else if (type === 7) {
        switch (week) {
        case 1:
            weekStr = '星期一'
            break
        case 2:
            weekStr = '星期二'
            break
        case 3:
            weekStr = '星期三'
            break
        case 4:
            weekStr = '星期四'
            break
        case 5:
            weekStr = '星期五'
            break
        case 6:
            weekStr = '星期六'
            break
        case 0:
            weekStr = '星期日'
            break
        }
        return weekStr
    } else if (type === 8) {
        return timeObj.teshu + timeObj.month + timeObj.day + timeObj.hours + timeObj.minute + timeObj.second
    }
}
// 处理返回价格和数字返回的数字
function addComma (str, currentIndex, result) {
    if (currentIndex === undefined) {
        currentIndex = str.length - 1
    }
    if (result === undefined) {
        result = ''
    }
    if (currentIndex < 0) {
        return result
    }
    result = str.charAt(currentIndex) + result
    if ((str.length - currentIndex) % 3 === 0 && currentIndex !== 0) {
        result = ',' + result
    }
    return addComma(str, currentIndex - 1, result)
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
function treeDataTranslate (data, id, pid) {
    var res = []
    var temp = {}
    for (var i = 0; i < data.length; i++) {
        temp[data[i][id]] = data[i]
    }
    for (var k = 0; k < data.length; k++) {
        if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
            if (!temp[data[k][pid]]['children']) {
                temp[data[k][pid]]['children'] = []
            }
            if (!temp[data[k][pid]]['_level']) {
                temp[data[k][pid]]['_level'] = 1
            }
            data[k]['_level'] = temp[data[k][pid]]._level + 1
            temp[data[k][pid]]['children'].push(data[k])
        } else {
            res.push(data[k])
        }
    }
    return res
}

// 车牌验证
function plateNum (str) {
    return /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[\u4E00-\u9FA5]{1}[A-Z]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/.test(str)
}

// 判断字符串长度，汉字2个字符英文数字1个
function getByteLen (val) {
    var len = 0
    for (var i = 0; i < val.length; i++) {
        var length = val.charCodeAt(i)
        if (length >= 0 && length <= 128) {
            len += 1
        } else {
            len += 2
        }
    }
    return len
}

export {
    plateNum,
    filterTime,
    setCookie,
    clearCookie,
    getCookie,
    clearAllCookie,
    addComma,
    treeDataTranslate,
    setCorsCookie,
    getByteLen
}
