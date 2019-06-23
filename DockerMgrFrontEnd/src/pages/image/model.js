import { getAllImages, getImageByIp, search} from './service';
import { getAuthority, getUserInfo } from '@/utils/authority';

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
  },

  reducers: {
    save(state, { payload: { images: imageList} }) {
      return { ...state, imageList };
    },
    saveSearchResult(state, { payload: { searchResult } }) {
      return { ...state, searchResult };
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let token = getAuthority();
        if ((pathname === '/image') || (pathname === '/image/hub')&& token !== 'null') {
          const { id } = getUserInfo();
          dispatch({ type: 'getAllImages', payload: { id } });
        }
      });
    },
  },

};
