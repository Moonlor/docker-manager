import { routerRedux } from 'dva/router';
import { setAuthority, setUserInfo } from '@/utils/authority';
import { accountLogin } from './service';
import { notification } from 'antd';

export default {
  namespace: 'userLogin',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      let token = response.data.token;
      // Login successfully
      if (response.msg === 'success') {
        setAuthority(token);
        setUserInfo(response.data);
        yield put(routerRedux.replace('/'));
      }
    }
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      notification.success({
        message: '登陆成功',
        description: '欢迎登入Docker管理系统',
      })
      return {
        ...state,
        status: payload.msg
      };
    },
  },
};
