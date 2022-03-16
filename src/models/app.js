/* global window */

import { history } from 'umi'
import { stringify } from 'qs'
import store from 'store'
const { pathToRegexp } = require("path-to-regexp")
import { ROLE_TYPE } from 'utils/constant'
import { queryLayout } from 'utils'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import api from 'api'
import config from 'config'

const { queryRouteList, logoutUser/*, queryUserInfo */} = api

const goHome = () => {
  if (pathToRegexp(['/', '/home']).exec(window.location.pathname)) {
    history.push({
      pathname: '/home',
    })
  }
}

export default {
  namespace: 'app',
  state: {
    routeList: [
      {
        id: '1',
        icon: 'laptop',
        name: 'Home',
        zhName: '主页',
        router: '/home',
      },
    ],
    locationPathname: '',
    locationQuery: {},
    theme: store.get('theme') || 'light',
    collapsed: store.get('collapsed') || false,
    notifications: [
      {
        title: 'New User is registered.',
        date: new Date(Date.now() - 10000000),
      },
      {
        title: 'Application has been approved.',
        date: new Date(Date.now() - 50000000),
      },
    ],
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'query' })
    },
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },

    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window

        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE)
            cancelRequest.delete(key)
          }
        })
      })
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      // store isInit to prevent query trigger by refresh
      const { locationPathname } = yield select(_ => _.app)
      // const { success, user } = yield call(queryUserInfo, payload)
      // if (success && user) {
        const { list } = yield call(queryRouteList)
        console.log(list)
        // const { permissions } = user
        let routeList = list
        // if (
        //   permissions.role === ROLE_TYPE.ADMIN ||
        //   permissions.role === ROLE_TYPE.DEVELOPER
        // ) {
        //   permissions.visit = list.map(item => item.id)
        // } else {
          // routeList = list.filter(item => {
          //   const cases = [
          //     permissions.visit.includes(item.id),
          //     item.mpid
          //       ? permissions.visit.includes(item.mpid) || item.mpid === '-1'
          //       : true,
          //     item.bpid ? permissions.visit.includes(item.bpid) : true,
          //   ]
          //   return cases.every(_ => _)
          // })
        // }
        store.set('routeList', routeList)
        // store.set('permissions', permissions)
        // store.set('user', user)
        store.set('isInit', true)
        goHome()
      // } else if (queryLayout(config.layouts, locationPathname) !== 'public') {
      //   history.push({
      //     pathname: '/home',
      //     search: stringify({
      //       from: locationPathname,
      //     }),
      //   })
      // }
    },

    *signOut({ payload }, { call, put }) {
      const data = yield call(logoutUser)
      if (data.success) {
        store.set('routeList', [])
        store.set('permissions', { visit: [] })
        store.set('user', {})
        store.set('isInit', false)
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    handleThemeChange(state, { payload }) {
      store.set('theme', payload)
      state.theme = payload
    },

    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload)
      state.collapsed = payload
    },

    allNotificationsRead(state) {
      state.notifications = []
    },
  },
}
