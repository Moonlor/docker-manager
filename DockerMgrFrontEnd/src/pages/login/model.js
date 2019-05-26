import { routerRedux } from 'dva/router';
import { setAuthority } from '@/utils/authority';
import { accountLogin } from './service';

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
        yield put(routerRedux.replace('/'));
      }
    }
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.msg
      };
    },
  },
};
