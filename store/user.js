export const state = () => {
  return {
    userInfo: {}
  }
}

export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data;
  },
  cleanUserInfo(state, info) {
    // if (process.browser) {
    //   localStorage.removeItem("userInfo");
    // }
  }
}

export const actions = {}