

export const state = () => ({
  post: "",
  allUsers: "",
  postToUpdate:"",
});

export const mutations = {
  getLastPost: function(state, lastPost) {
    state.post = lastPost;
  },
  getOlder:function(state,older){
    older.map(post=>{
      state.post.push(post)
    })
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
  async getLastPost({commit}){
    const request = await this.$api.get("/publish/last");
    console.log(request.data.message);
    commit("getLastPost", request.data.response);

  },
  async getAllPost({ commit }, postCount) {
    const request = await this.$api.get("/publish/getOlder"+postCount);
    console.log(request.data.message);
    commit("getOlder", request.data.response);
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
