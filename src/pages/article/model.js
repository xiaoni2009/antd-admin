import modelExtend from 'dva-model-extend'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'
import { pageModel } from 'utils/model'

const {
  queryArticle,
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
        if (pathToRegexp('/article').exec(location.pathname)) {
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
      console.log(queryArticle)
      const data = yield call(  queryArticle, payload)
      console.log(data)
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.list,
            pagination: {
              current: Number(data.data.pageNum) || 1,
              pageSize: Number(data.data.pageSize) || 10,
              total: data.data.total,
            },
          },
        })
      }
    },
  },
})
