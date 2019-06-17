//const root = '/platform/api/';
const root = '/api/';

// const API_BASE_URL = 'http://fly2you.cn' + root;
//const API_BASE_URL = 'http://localhost:8081' + root;
const API_BASE_URL = 'https://test2.idatage.com' + root;

module.exports = {
  AuthLoginByWeixin: API_BASE_URL + 'auth/login_by_weixin', //微信登录
  UserRegister: API_BASE_URL + 'user/register', //普通用户注册
  GetChildrenArea: API_BASE_URL + 'address/getChildrenArea', //获取级联地址
};
