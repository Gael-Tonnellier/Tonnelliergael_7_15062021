
export const state = () => ({
  post: "",
  allUsers: "",
  postToUpdate:"",
});

export const mutations = {
  getAllPost: function(state, allPost) {
    state.post = allPost;
  },
  getAllUser: function(state, allUser) {
    state.allUsers = allUser;
  },
  deletePost: function(state,postToDelete){
    const findPostToDelete = state.post.findIndex((elem)=>elem.idMessage == postToDelete);
    state.post.splice(findPostToDelete,1);
  },
  storePostToUpdate : function(state,postUpdate){
    state.postToUpdate = postUpdate;
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
  async deletePost({ commit }, idMessage) {
    try {
      const request = await this.$api.delete("/publish/deletePost/" + idMessage);
      commit("deletePost",idMessage);
      console.log(request.data.message)
    } catch (error) {
      console.log(error);
    }
  },
}
