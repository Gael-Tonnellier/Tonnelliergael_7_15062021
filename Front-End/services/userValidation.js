const axios = require("axios");
const server = axios.create({
  baseURL: "http://localhost:4000/api/"
});

export default {
  checkUser() {
    let user = localStorage.getItem("user");
    if (!user) {
      user = {
        userId: -1,
        token: ""
      };
    } else {
      try {
        user = JSON.parse(user);
        console.log(user.token);
        server.defaults.headers.common['Authorization'] = user.token;
      } catch (ex) {
        user = {
          userId: -1,
          token: ""
        };
      }
    }
    return user;
  }
};
