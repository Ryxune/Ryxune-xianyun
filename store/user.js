export const state = () => {
  return {
    userInfo: {}
  }
}

export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data;
  }
}

export const actions = {
  async captcha(store, data) {
    let res = await this.$axios({
      url: "/captchas",
      method: "POST",
      data: {
        tel: data
      }
    });

    return res;
  },
  async login(store, data) {
    let res = await this.$axios({
      url: "/accounts/login",
      method: "POST",
      data
    })

    if (res.status === 200) {
      store.commit("setUserInfo", res.data);
    }

    return res;
  },

  async register(store, data) {
    let res = await this.$axios({
      url: "/accounts/register",
      method: "POST",
      data
    });

    if (res.status === 200) {
      store.commit('setUserInfo', res.data);
    }

    return res;
  }
}
