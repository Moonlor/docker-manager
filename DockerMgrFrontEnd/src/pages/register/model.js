import { routerRedux } from 'dva/router';
import { setAuthority, setUserInfo } from '@/utils/authority';
import { userRegister } from './service';
import { notification } from 'antd';

export default {
  namespace: 'userRegister',

  state: {
    status: undefined,
  },

  effects: {
    *register({ payload }, { call, put }) {
      const response = yield call(userRegister, payload);
      let token = response.data.token;
      notification.success({
        message: '注册成功',
        description: '欢迎注册Docker管理系统',
      })
      if (response.msg === 'success') {

        setAuthority(token);
        setUserInfo(response.data);
        yield put(routerRedux.replace('/'));
      }
    }
  },

  reducers: {},
};
