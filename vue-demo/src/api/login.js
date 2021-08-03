import { reject, resolve } from 'core-js/fn/promise';

export function loginByUsername(account, password) {
  return new Promise((resolve, reject) => {
    if (account) {
      if (account == 'admin') {
        resolve({ data: { token: 'test_2021072601' } });
      } else if (account == 'super') {
        resolve({ data: { token: 'test_2021072602' } });
      } else {
        resolve({ data: { token: 'test_2021072603' } });
      }
    } else {
      reject('账号不存在');
    }
  });
}
export function getInfo(token) {
  return new Promise((resolve, reject) => {
    if (token) {
      let obj = {
        name: '账号名',
        info: {},
        roles: [],
      };
      if (token == 'test_2021072601') {
        obj.roles.push('admin');
      } else if (token == 'test_2021072602') {
        obj.roles.push('super');
      }
      resolve(obj);
    } else {
      reject('账号不存在');
    }
  });
}
