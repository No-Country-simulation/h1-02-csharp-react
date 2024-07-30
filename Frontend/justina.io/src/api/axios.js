import axios from "axios";

//Se Setea URL base
const api = axios.create({
  baseURL: "https://justina.somee.com",
  headers: {
    "Content-Type": "application/json",
  },
});

//Intercepta la request para agregar el token si existe
api.interceptors.request.use(
  (config) => {
    //Recupera store
    let userStore = localStorage.getItem("userStore");
    userStore = userStore ? JSON.stringify(userStore) : undefined;
    //Si existe recupera el token
    const token = userStore ? userStore.token : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(response => {
    // Modificar datos de respuesta antes de pasarlos al llamado
    return response.data;
  }, error => {
    return Promise.reject(error);
  });
  

  //Usar api en vez de axios
export default api;
