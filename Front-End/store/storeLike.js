export const state = () => ({
    allLike: "",
  });
  
  export const mutations = {
    getAllLike: function(state, allLike) {
      state.allLike = allLike;
    },
  };
  export const actions = {
    async getAllLike({ commit }) {
      const request = await this.$api.get("/like/getLike");
      console.log(request.data.message);
      commit("getAllLike", request.data.response);
    },
    async postLike({dispatch}, likeInfo){
      const request = await this.$api.post("/like/",likeInfo);
      console.log(request.data.message);
      dispatch("getAllLike")
    },
  }