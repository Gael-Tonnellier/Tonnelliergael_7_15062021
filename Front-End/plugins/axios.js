export default function({ $axios }, inject) {
  // Create a custom axios instance
  let user = JSON.parse(localStorage.getItem('user'));

  const api = $axios.create({
    headers: {
      'Authorization': user.token,
    }
  });

  // Set baseURL to something different
  api.setBaseURL("http://localhost:4000/api/");

  // Inject to context as $api
  inject("api", api);
}

