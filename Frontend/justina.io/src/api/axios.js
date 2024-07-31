import axios from "axios";

//Se Setea URL base
const api = axios.create({
  baseURL: "https://www.justina.somee.com",
  headers: {
    "Content-Type": "application/json",
  },
});

//Intercepta la request para agregar el token si existe
api.interceptors.request.use(
  (config) => {
    //Recupera la store
    let userStore = localStorage.getItem("userStore") ? JSON.parse(localStorage.getItem("userStore")) : undefined;
    //Si existe recupera el token
    const token = userStore ? userStore.state.token : null;
    if (token) {
      //Si hay token se agrega al header
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
