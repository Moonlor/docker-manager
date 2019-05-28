import { routerRedux } from 'dva/router';
import { setAuthority, setUserInfo } from '@/utils/authority';
import { getAllContainers } from './service';
import { getAuthority, getUserInfo } from '@/utils/authority';

export default {
  namespace: 'container',

  state: {
    serversList: undefined, 
    containersList: undefined,
  },

  effects: {
    *get({ payload }, { call, put }) {
      const response = yield call(getAllContainers, payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: {
          servers: response.data.servers,
          containers: response.data.containers,
        },
      });
    }
  },

  reducers: {
    save(state, { payload: { servers: serversList, containers: containersList } }) {
      return { ...state, serversList, containersList};
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
