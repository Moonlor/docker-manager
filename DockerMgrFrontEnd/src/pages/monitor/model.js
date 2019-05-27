import { routerRedux } from 'dva/router';
import { setAuthority, setUserInfo } from '@/utils/authority';
import { getAllContainers } from './service';
import { getAuthority, getUserInfo } from '@/utils/authority';

export default {
  namespace: 'container',

  state: {
    payload: '2233'
  },

  effects: {
    *get({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(getAllContainers, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    }
  },

  reducers: {
    save(state, payload) {
      return { ...state, payload};
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/monitor') {
          const { id } = getUserInfo();
          dispatch({ type: 'get', payload: {id}});
        }
      });
    },
  },

};
