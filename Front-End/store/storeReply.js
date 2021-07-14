export const state = () => ({
  allReply: ""
});

export const mutations = {
  getAllReply: function(state, allReply) {
    state.allReply = allReply;
  },
  deleteReply: function(state, replyToDelete) {
    const findReplyToDelete = state.allReply.findIndex(
      elem => elem.idReply == replyToDelete
    );
    state.allReply.splice(findReplyToDelete, 1);
  }
};
export const actions = {
  async getAllReply({ commit }) {
    const request = await this.$api.get("/reply/getReply");
    console.log(request.data.message);
    commit("getAllReply", request.data.response);
  },
  async createReply({ dispatch }, reply) {
    const request = await this.$api.post("/reply/createReply", reply);
    console.log(request.data.message);
    dispatch("getAllReply");
  },
  async deleteReply({ commit }, idReply) {
    try {
      const request = await this.$api.delete("/reply/deleteReply/" + idReply);
      commit("deleteReply", idReply);
      console.log(request.data.message);
    } catch (error) {
      console.log(error);
    }
  },
  async updateReply({ dispatch }, reply) {
    try {
        console.log(reply.content);
      const request = await this.$api.put(
        "/reply/updateReply/" + reply.idReply, {reply}
      );
      dispatch("getAllReply");
      console.log(request.data.message);
    } catch (error) {
      console.log(error);
    }
  }
};
