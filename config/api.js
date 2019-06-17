//const root = '/platform/api/';
const root = '/api/';

// const API_BASE_URL = 'http://fly2you.cn' + root;
//const API_BASE_URL = 'http://localhost:8081' + root;
const API_BASE_URL = 'https://test2.idatage.com' + root;

module.exports = {
  AuthLoginByWeixin: API_BASE_URL + 'auth/login_by_weixin', //微信登录
  GetCheckCodeByPhone: API_BASE_URL + 'auth/getCheckCodeByPhone', //获取验证码
  GetChildrenArea: API_BASE_URL + 'address/getChildrenArea', //获取级联地址
  UserRegister: API_BASE_URL + 'user/register', //普通用户注册
  SorterBind: API_BASE_URL + 'user/sorterBind', //分拣员登录
  GetCurrentUserInfo: API_BASE_URL + 'user/getCurrentUserInfo', //获取用户信息
  UpdateNormal: API_BASE_URL + 'user/updateNormal', //更新用户信息
  GetGreenMoneyHistory: API_BASE_URL + 'recycle/getGreenMoneyHistory', //获取环保金明细
  GetCurrentUserOrderCount: API_BASE_URL + 'recycle/getCurrentUserOrderCount', //获取预约单数量
};
