import { getAllContainers, AddServer, DeleteServer, StopContainer, RemoveContainer, RunContainer } from './service';
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
      yield put({
        type: 'save',
        payload: {
          servers: response.data.servers,
          containers: response.data.containers,
        },
      });
    },

    *addNewServer({ payload: p }, { call, put }) {
      yield call(AddServer, p);
      const { id } = getUserInfo();
      const response = yield call(getAllContainers, {id: id});
      yield put({
        type: 'save',
        payload: {
          servers: response.data.servers,
          containers: response.data.containers,
        },
      });
    },

    *delete({ payload }, { call, put }) {
      yield call(DeleteServer, payload);
      const { id } = getUserInfo();
      const response = yield call(getAllContainers, { id: id });
      yield put({
        type: 'save',
        payload: {
          servers: response.data.servers,
          containers: response.data.containers,
        },
      });
    },

    *stop({ payload }, { call, put }) {
      yield call(StopContainer, payload);
      const { id } = getUserInfo();
      const response = yield call(getAllContainers, { id: id });
      yield put({
        type: 'save',
        payload: {
          servers: response.data.servers,
          containers: response.data.containers,
        },
      });
    },

    *remove({ payload }, { call, put }) {
      yield call(RemoveContainer, payload);
      const { id } = getUserInfo();
      const response = yield call(getAllContainers, { id: id });
      yield put({
        type: 'save',
        payload: {
          servers: response.data.servers,
          containers: response.data.containers,
        },
      });
    },

    *run({ payload }, { call, put }) {
      yield call(RunContainer, payload);
      const { id } = getUserInfo();
      const response = yield call(getAllContainers, { id: id });
      yield put({
        type: 'save',
        payload: {
          servers: response.data.servers,
          containers: response.data.containers,
        },
      });
    },
  },

  reducers: {
    save(state, { payload: { servers: serversList, containers: containersList } }) {
      return { ...state, serversList, containersList};
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let token = getAuthority();
        if ((pathname === '/monitor' || pathname === '/terminal') && token !== 'null') {
          const { id } = getUserInfo();
          dispatch({ type: 'get', payload: {id}});
        }
      });
    },
  },

};
