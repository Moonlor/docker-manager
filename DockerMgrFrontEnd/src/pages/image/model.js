import { getAllImages, search, getImageDetail, deleteImage, pullImage, queryImageProcess} from './service';
import { getAuthority, getUserInfo } from '@/utils/authority';

import { notification } from 'antd';

export default {
  namespace: 'image',

  state: {
    serversList: undefined,
    containersList: undefined,
  },

  effects: {
    *getAllImages({ payload }, { call, put }) {
      const response = yield call(getAllImages, payload);
      yield put({
        type: 'save',
        payload: {
          images: response.data.images,
        },
      });
    },

    *search({ payload }, { call, put }) {
      const response = yield call(search, payload);
      yield put({
        type: 'saveSearchResult',
        payload: {
          searchResult: response.data,
        },
      });
    },

    *inspect({ payload }, { call, put }) {
      const response = yield call(getImageDetail, payload);
      yield put({
        type: 'saveImageDetail',
        payload: {
          imageDetail: response.data,
        },
      });
    },

    *delete({ payload }, { call, put }) {
      const r = yield call(deleteImage, payload);
      console.log(r.data);
      notification['info']({
        message: "删除成功",
        description:
          `删除${r.data.length}个layer`
      });
      
      const { id } = getUserInfo();
      const payload2 = { id };
      const response = yield call(getAllImages, payload2);
      yield put({
        type: 'save',
        payload: {
          images: response.data.images,
        },
      });
    },

    *pull({ payload }, { call, put }) {
      const r = yield call(pullImage, payload);
      notification['info']({
        message: "开始拉取镜像",
        description:
          `任务ID: ${r.data}`
      });
      yield put({
        type: 'saveTaskGuid',
        payload: {
          guid: r.data,
        },
      });
    },

    *query({ payload }, { call, put }) {
      const r = yield call(queryImageProcess, payload);
      console.log(r);
      yield put({
        type: 'saveProcess',
        payload: {
          process: r.data,
        },
      });
    },

  },

  reducers: {
    save(state, { payload: { images: imageList} }) {
      return { ...state, imageList };
    },
    saveSearchResult(state, { payload: { searchResult } }) {
      return { ...state, searchResult };
    },
    saveImageDetail(state, { payload: { imageDetail } }) {
      return { ...state, imageDetail };
    },
    saveTaskGuid(state, { payload: { guid } }) {
      return { ...state, guid };
    },
    saveProcess(state, { payload: { process } }) {
      return { ...state, process };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let token = getAuthority();
        if ((pathname === '/image') || (pathname === '/terminal') || (pathname === '/image/hub')&& token !== 'null') {
          const { id } = getUserInfo();
          dispatch({ type: 'getAllImages', payload: { id } });
        }
      });
    },
  },

};
