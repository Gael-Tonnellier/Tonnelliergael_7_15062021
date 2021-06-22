const axios = require("axios");
const server = axios.create({
  baseURL: "http://localhost:4000/api/"
});

let user = localStorage.getItem("user");
console.log(user);
if (!user) {
  user = {
    userId: -1,
    token: ""
  };
} else {
  try {
    user = JSON.parse(user);
    server.defaults.headers.common["Authorization"] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: ""
    };
  }
}

export const state = () => ({
  status: "",
  user: user,
  userInfos: {
    userId: "",
    pseudo: "",
    created: "",
    description: "",
    image: "",
    email:""
  }
});

export const mutations = {
  setStatus: function(state, status) {
    state.status = status;
  },
  logUser: function(state, user) {
    server.defaults.headers.common["Authorization"] = user.token;
    localStorage.setItem("user", JSON.stringify(user));
    state.user = user;
  },
  userInfos: function(state, userInfos) {
    state.userInfos = userInfos;
  },
  logout: function(state){
      state.user= {
          userId : -1,
          token :''
      }
      localStorage.removeItem('user')
  },
  deleteUserInfos:function(state){
      state.userInfos= {
        userId: "",
        pseudo: "",
        created: "",
        description: "",
        image: "",
        email:""
      }
  }
};

export const actions = {
  createAccount: ({ commit }, userInfos) => {
    commit("setStatus", "loading");
    return new Promise((resolve, reject) => {
      server
        .post("/user/signup", userInfos)
        .then(function(response) {
          commit("setStatus", "created");
          resolve(response);
        })
        .catch(function(error) {
          commit("setStatus", "error_create");
          reject(error);
        });
    });
  },
  login: ({ commit }, userInfos) => {
    commit("setStatus", "loading");
    return new Promise((resolve, reject) => {
      server
        .post("/user/login", userInfos)
        .then(function(response) {
          commit("setStatus", "");
          commit("logUser", response.data);
          resolve(response);
        })
        .catch(function(error) {
          commit("setStatus", "error_login");
          reject(error);
        });
    });
  },
  getUserInfo: ({ commit }, userInfos) => {
    server
      .get("/user/info/" + userInfos)
      .then(function(response) {
        commit("userInfos", response.data);
      })
      .catch(function() {});
  },

  deleteUser: ({commit},userInfos) =>{
      server.delete("/user/delete/" + userInfos)
      .then(function() {
        commit("deleteUserInfos")
      })
      .catch(function(){});
  },

};
