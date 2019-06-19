//const root = '/platform/api/';
const root = '/api/';

// const API_BASE_URL = 'http://fly2you.cn' + root;
//const API_BASE_URL = 'http://localhost:8081' + root;
const API_BASE_URL = 'https://testtra.treeyee.com' + root;

module.exports = {
  AuthLoginByWeixin: API_BASE_URL + 'auth/login_by_weixin', //微信登录
  GetCheckCodeByPhone: API_BASE_URL + 'auth/getCheckCodeByPhone', //获取验证码
  UserRegister: API_BASE_URL + 'auth/register', //普通用户注册
  SorterBind: API_BASE_URL + 'auth/sorterBind', //分拣员登录
  GetCurrentUserInfo: API_BASE_URL + 'auth/getCurrentUserInfo', //获取用户信息
  UpdateNormal: API_BASE_URL + 'auth/updateNormal', //更新用户信息
  GetChildrenArea: API_BASE_URL + 'address/getChildrenArea', //获取级联地址
  GetAreasById: API_BASE_URL + 'address/getAreasById', //获取当前id下的所有级联地址
  GetIdByDetailArea: API_BASE_URL + 'address/getIdByDetailArea', //获取级联地址
  GetGreenMoneyHistory: API_BASE_URL + 'recycle/getGreenMoneyHistory', //获取环保金明细
  GetCurrentUserOrderCount: API_BASE_URL + 'recycle/getCurrentUserOrderCount', //获取预约单数量
  GetRecyclables: API_BASE_URL + 'recycle/getRecyclables', //获取可回收垃圾类型
  CreateReservationList: API_BASE_URL + 'recycle/createReservationList', //创建预约单
  GetCurrentUserOrders: API_BASE_URL + 'recycle/getCurrentUserOrders', //获取预约单
  CancelAppointment: API_BASE_URL + 'recycle/cancelAppointment', //取消预约单
  GetOrderDetail: API_BASE_URL + 'recycle/getOrderDetail', //根据id获取订单详情
  SorterConfirm: API_BASE_URL + 'recycle/sorterConfirm', //分拣员确认接单
  UpdateSorterConfirmTime: API_BASE_URL + 'recycle/updateSorterConfirmTime', //分拣员确认上门时间
  AuditChecklist: API_BASE_URL + 'recycle/auditChecklist', //分拣员确认审核预约订单
};
