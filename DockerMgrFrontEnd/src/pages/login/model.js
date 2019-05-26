import { routerRedux } from 'dva/router';
// import { setAuthority } from './utils/authority';
// import { reloadAuthorized } from './utils/Authorized';
import { accountLogin } from './service';

export default {
  namespace: 'userLogin',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      console.log('here');
      const response = yield call(accountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        // reloadAuthorized();
        yield put(routerRedux.replace('/'));
      }
    }
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status
      };
    },
  },
};
