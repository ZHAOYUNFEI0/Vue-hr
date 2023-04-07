import { getToken, setToken, removeToken } from '@/utils/auth'
import { getUser, getUserInfo } from '@/api/user'
// import { Message } from 'element-ui'
export default {
  namespaced: true,
  state: {
    token: getToken() || '',
    getUser: {}
  },
  mutations: {
    addToken(state, token) {
      state.token = token
      setToken(token)
    },
    // 删除token
    removeToken(state) {
      state.token = ''
      removeToken()
    },
    // 删除用户信息
    removeUser(state) {
      state.getUser = {}
    },
    // 获取用户信息
    getUser(state, getUser) {
      state.getUser = getUser
    }
  },
  actions: {

    denglu(context, token) {
      context.commit('addToken', token)
      // login(loginForm).then(res => {
      //   context.commit('addToken', res.data.data)
      // }).catch(err => {
      //   console.log(err)
      //   Message.error(err.message)
      // })
    },
    // 获取用户信息
    async getUser(context) {
      const res1 = await getUser()
      // console.log(res1.data.data.userId)
      const res2 = await getUserInfo(res1.data.data.userId)
      // console.log(res1)
      // console.log(res2)
      context.commit('getUser', { ...res1.data.data, ...res2.data.data })
      // console.log(res1)
      return res1.data.data.roles.menus
      // getUser().then(res1 => {
      //   getUserInfo(res1.data.data.userId).then(res2 => {
      //     context.commit('getUser', { ...res1.data.data, ...res2.data.data })
      //   })
      // })
    }
  }
}
