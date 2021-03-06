
export const state = () => ({
  userInfos: {
    userId: "",
    pseudo: "",
    created: "",
    description: "",
    avatar: "",
    email: ""
  }
});

export const mutations = {
  userInfos: function(state, userInfos) {
    state.userInfos = userInfos;
  },
  deleteUserInfos: function(state) {
    state.userInfos = {
      userId: "",
      pseudo: "",
      created: "",
      description: "",
      avatar: "",
      email: ""
    };
  }
};
export const actions = {
  async createAccount({ dispatch }, userInfos) {
    dispatch("setStatus", "loading", { root: true });
    try {
      const request = await this.$api.post("/user/signup", userInfos);
      console.log(request.data.message);
      dispatch("setStatus", "created", { root: true });
      this.$router.push("/");
    } catch (error) {
      console.log(error.message);
      dispatch("setStatus", "error_create", { root: true });
    }
  },
  async login({ commit, dispatch }, userInfos) {
    dispatch("setStatus", "loading", { root: true });
    try {
      const request = await this.$api.post("/user/login", userInfos);
      dispatch("setStatus", "connected", { root: true });
      commit("logUser", request.data, { root: true });
      this.$router.push("/landing");
    } catch (error) {
      if (error.response.status === 401) {
        console.log("Mot de passe incorrect ||", error);
        dispatch("setStatus", "incorrect_password", { root: true });
      } else if (error.response.status === 429) {
        console.log("Trop d'essaie ||", error);
        dispatch("setStatus", "too_much_try", { root: true });
      }
    }
  },
  async getUserInfo({ commit, dispatch }, userInfos) {
    try {
      const request = await this.$api.get("/user/info/" + userInfos.userId);
      console.log("logUserInfo", request.data);
      commit("userInfos", request.data);
    } catch (error) {
      console.log(error);
      dispatch("setStatus", "error_login", { root: true });
    }
  },
  async deleteUser({ commit, dispatch }, userInfos) {
    try {
      const request = await this.$api.delete("/user/delete/" + userInfos);
      commit("deleteUserInfos");
      dispatch("logout", "", { root: true });
      console.log("compte supprim??");
    } catch (error) {
      console.log(error);
    }
  },
  async updateUser({dispatch},userInfos){
    try {
      const request = await this.$api.put("/user/update/", userInfos)
      console.log(request.data.message)
      dispatch('getUserInfo',userInfos)
      dispatch('setStatus',"data_update",{root:true})
    } catch (error) {
      console.log(error.response)
    }
  }
};
