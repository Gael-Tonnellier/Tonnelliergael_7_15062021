
export const state = () => ({
    allCategory: {}
  });
  
  export const mutations = {
    getAllCategory: function(state, allCategory) {
      state.allCategory= allCategory;
    },
    deleteCategory: function(state, categoryToDelete) {
      const findCategoryToDelete = state.allCategory.findIndex(
        elem => elem.idCategory === categoryToDelete
      );
      state.allCategory.splice(findCategoryToDelete, 1);
    }
  };
  export const actions = {
    async getAllCategory({ commit }) {
      const request = await this.$api.get("/category/getCategory");
      console.log(request.data.message);
      commit("getAllCategory", request.data.response);
    },
    async createCategory({ dispatch }, reply) {
      const request = await this.$api.post("/category/createCategory", reply);
      console.log(request.data.message);
      dispatch("getAllReply");
    },
    async deleteCategory({ commit }, idReply) {
      try {
        const request = await this.$api.delete("/reply/deleteReply/" + idReply);
        commit("deleteReply", idReply);
        console.log(request.data.message);
      } catch (error) {
        console.log(error);
      }
    },
  };