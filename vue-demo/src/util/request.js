import axios from 'axios';
import { reject, resolve } from 'core-js/fn/promise';

let ROOT_SERVE_TEST = 'https://gmstest.gtmc.com.cn/GMSAPPIF';
let ROOT_SERVE_PRODUCT = 'https://gms.gtmc.com.cn';
let ROOT_SERVE_MOCK = 'http://mdm.jinxixin.com:444';

// 创建axios实例
const service = axios.create({
  baseURL: ROOT_SERVE_TEST,
  timeout: 60000,
});

let commonParam = {};

function request(url, type, data) {
  // 处理url 一般URL格式应为ICP20087/QueryOnlineRequestList
  url = url.split('/')[0] + '.asmx/' + url.split('/')[1];
  let Params = {
    url: url,
    method: type,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  };
  type == 'get' ? (Params.params = data) : (Params.data = data);

  return new Promise((resolve, reject) => {
    service
      .request(Params)
      .then((res) => {
        // 返回的是字符串，先将其转化为HTML节点
        let str = document.createElement('string');
        str.innerHTML = res.data;
        let data = JSON.parse(str.getElementsByTagName('string')[0].innerHTML);
        if (data.ResultCode == 1) {
          resolve(data);
        } else {
          // 其他状态码处理
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function post(url, data) {
  let dataParam = Object.assign({}, commonParam, data);
  dataParam = 'data=' + JSON.stringify(dataParam);
  return request(url, 'post', dataParam);
}

export function get(url, data) {
  let dataParam = Object.assign({}, commonParam, data);
  return request(url, 'get', dataParam);
}
