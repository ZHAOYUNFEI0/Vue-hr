const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,

  username: state => state.user.getUser.username,
  staffPhoto: state => state.user.getUser.staffPhoto,
  userId: state => state.user.getUser.userId
}
export default getters
