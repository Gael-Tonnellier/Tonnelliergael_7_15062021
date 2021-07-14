
import userValidation from "../services/userValidation";
//console.log(userValidation.checkUser());

export const state = () => ({
  status: "",
  user: userValidation.checkUser(),
});

export const mutations = {
  setStatus: function(state, status) {
    state.status = status;
  },
  logUser: function(state, user) {
    this.$api.defaults.headers.common["Authorization"] = user.token;
    console.log("premier token", user.token);
    localStorage.setItem("user", JSON.stringify(user));
    state.user = user;
  },
  logout: function(state) {
    state.user = {
      userId: -1,
      token: ""
    };
    localStorage.removeItem("user");
  },
};

export const actions = {
  setStatus: ({ commit }, status) => {
    commit("setStatus", status);
  },
  logout :({commit})=>{
    commit("logout");
    commit("storeConnectedUser/deleteUserInfos")
  }
};
