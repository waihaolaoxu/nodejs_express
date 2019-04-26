import Qs from 'qs'

function ajaxByParam(url, data) {
  data = filterEmptyObj(data);
  return window.$http({
    url: url,
    method: 'post',
    data: Qs.stringify(data)
  })
}

function ajaxByObj(url, data) {
  data = filterEmptyObj(data);
  return window.$http({
    url: url,
    method: 'post',
    data:data
  })
}

function each(data, callback) {
  for (var x in data) {
    var d = callback(x, data[x]);
    if (d === false) {
      break;
    }
  }
}

function filterEmptyObj(obj) {
  var o = {};
  each(obj, function (i, d) {
    if (d !== null) {
      o[i] = d;
    }
  });
  return o;
}

export {
  ajaxByParam,
  ajaxByObj
}