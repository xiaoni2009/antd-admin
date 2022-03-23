import modelExtend from 'dva-model-extend'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'
import { pageModel } from 'utils/model'

const {
  queryUserList,
} = api

export default modelExtend(pageModel, {
  namespace: 'article',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathToRegexp('/user').exec(location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const data = yield call(queryUserList, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },
})
