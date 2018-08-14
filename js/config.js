

var domain_url = 'https://witkey.dev.ty6pe.cn/api/v1'
localStorage.setItem("access_token",GetQueryString('token'));
var token = localStorage.getItem("access_token");
var app_id = 100002;
var secret = 'witkey_console';
// 获取地址栏指定参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
}

// 请求服务器时间
function timestamp() {
    var timestamp = Date.parse(new Date()) / 1000; //时间戳
    return timestamp;
}
// 签名字典排序
function signOfParam(params,inx = false) {
    params.nonce = Math.random();
    params.timestamp = timestamp();
    params.app_id = app_id;
    let keys = [];
    for (let key in params) {
        keys.push(key)
    }

    let param = [];
    for (var key in params) {
        param[key] = params[key]
    }

    params.signature = sign(keys, param);

    return params;
}

// 签名算法
function sign(key, val) {
    var str = '';
    var s = key.sort();

    for (i in s) {
        if (val[s[i]] !== '') {
            str += s[i] + '=' + val[s[i]] + '&'
        }
    }
    str += ('secret=' + secret);
    var hash = md5(str)
    return hash;
}
//Ajax
function Ajax(opt) {
    var obj = opt;
    $.ajax({
        url: domain_url + obj.url,
        dataType: 'json',
        method: "get",
        data: obj.param || '',
        async: obj.async || true,
        headers:{Authorization:'Bearer '+token},
        success: function (res) {
            console.log(res)
        },
        error: function (xhr, type, errorThrown) {
            console.log(xhr.responseJSON)
        }
    });
}

