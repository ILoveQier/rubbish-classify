//const root = '/platform/api/';
const root = '/api/';

// const API_BASE_URL = 'http://fly2you.cn' + root;
//const API_BASE_URL = 'http://localhost:8081' + root;
const API_BASE_URL = 'https://test1.idatage.com' + root;

module.exports = {
  IndexUrlShops: API_BASE_URL + 'shop/index', //商铺列表
  //HelpIssueList: API_BASE_URL + 'helpissue/issueList', //查看问题列表
  AuthLoginByWeixin: API_BASE_URL + 'auth/login_by_weixin', //微信登录
  ShopList: API_BASE_URL + 'shop/index', //获取店铺列表
  ShopAdd: API_BASE_URL + 'shop/add', //新增店铺
  ShopDelete: API_BASE_URL + 'shop/delete', //新增店铺
  CityList: API_BASE_URL + 'city/list', //新增店铺
  BrandList: API_BASE_URL + 'brand/list', //新增店铺
  ShopUpdate: API_BASE_URL + 'shop/update', //更新店铺
  GetParams: API_BASE_URL + 'inputParams/getInputPaaramsRange',//获取平均库存参数
  DiagnoseList: API_BASE_URL + 'diagnose/index',//获取店铺诊断列表
  DiagnoseAdd: API_BASE_URL + 'diagnose/add',//新增店铺诊断
  DiagnoseGetById: API_BASE_URL + 'diagnose/get',//查询单独店铺诊断
  DiagnoseDelete: API_BASE_URL + 'diagnose/delete',//删除店铺诊断
  DiagnoseUpdate: API_BASE_URL + 'diagnose/update',//更新店铺诊断
  FeedInfo: API_BASE_URL + 'userInfo/details', // 用户信息
  FeedBack: API_BASE_URL + 'feedback/messages' // 问题反馈
};
