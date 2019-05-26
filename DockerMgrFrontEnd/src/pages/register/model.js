import { routerRedux } from 'dva/router';
import { setAuthority, setUserInfo } from '@/utils/authority';
import { userRegister } from './service';

export default {
  namespace: 'userRegister',

  state: {
    status: undefined,
  },

  effects: {
    *register({ payload }, { call, put }) {
      console.log('sdasdasfasas');


      const response = yield call(userRegister, payload);
      let token = response.data.token;
      // Login successfully
      if (response.msg === 'success') {

        setAuthority(token);
        setUserInfo(response.data);
        yield put(routerRedux.replace('/'));
      }
    }
  },

  reducers: {},
};
