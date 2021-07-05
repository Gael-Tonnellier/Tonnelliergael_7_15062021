/* const axios = require("axios");
const server = axios.create({
  baseURL: "http://localhost:4000/api/"
}); */
//import axios from 'axios';
export const state = () => ({
  post: "",
  allUsers: "",
  allLike: "",
  allReply: ""
});

export const mutations = {
  getAllPost: function(state, allPost) {
    state.post = allPost;
  },
  getAllUser: function(state, allUser) {
    state.allUsers = allUser;
  },
  getAllLike: function(state, allLike) {
    state.allLike = allLike;
  },
  getAllReply: function(state, allReply) {
    state.allReply = allReply;
  }
};
export const actions = {
  async getAllPost({ commit }) {
    const request = await this.$api.get("/publish/");
    console.log(request.data.message);
    commit("getAllPost", request.data.response);
  },
  async getAllUser({ commit }) {
    const request = await this.$api.get("/user/");
    console.log(request.data.message);
    commit("getAllUser", request.data.response);
  },
  async getAllLike({ commit }) {
    const request = await this.$api.get("/publish/getLike");
    console.log(request.data.message);
    commit("getAllLike", request.data.response);
  },
  async getAllReply({ commit }) {
    const request = await this.$api.get("/publish/getReply");
    console.log(request.data.message);
    commit("getAllReply", request.data.response);
  }
}
