export default function({ $axios,redirect },inject) {
  // Create a custom axios instance
  const api = $axios;
  api.onRequest(config=>{
    const user = JSON.parse(localStorage.getItem("user"));
      if(user){
        config.headers.Authorization = user.token
      }
      return config;
  })
  api.onError(error=>{
    const code = parseInt(error.response && error.response.status)
    if(code===401){
      localStorage.removeItem("user");
      redirect('/')
      console.log('Vous n\'êtes pas authentifié, merci de vous connectez')
    }
  })
  // Set baseURL to something different
  api.setBaseURL("http://localhost:4000/api/");

  // Inject to context as $api
  inject("api", api);
}
