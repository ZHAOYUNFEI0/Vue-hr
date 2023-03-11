import { getToken, setToken, removeToken } from '@/utils/auth'
// import { login } from '@/api/user'
// import { Message } from 'element-ui'
export default {
  namespaced: true,
  state: {
    token: getToken() || ''
  },
  mutations: {
    addToken(state, token) {
      state.token = token
      setToken(token)
    },
    removeToken(state) {
      state.token = ''
      removeToken()
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
    }
  }
}
