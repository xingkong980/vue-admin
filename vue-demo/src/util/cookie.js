//写cookies
export function setCookie(name, value) {
  var days = 1;
  var exp = new Date();
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie =
    name + '=' + escape(value) + ';path=/;expires=' + exp.toGMTString();
}

//读取cookies
export function readCookie(name) {
  let arr = null;
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if (document.cookie && document.cookie.match(reg)) {
	arr = document.cookie.match(reg)
    return unescape(arr[2]);
  } else {
    return null;
  }
}

//删除cookies
export function delCookie(name) {
  var cval = readCookie(name);
  if (cval != null) {
    document.cookie = name + '=;path=/;expires=' + new Date(0).toGMTString();
  }
}
