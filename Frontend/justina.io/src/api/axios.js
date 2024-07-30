import axios from "axios";

const api = axios.create({
  baseURL: "https://justina.somee.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    let userStore = localStorage.getItem("token");
    userStore = userStore ? JSON.stringify(userStore) : undefined;
    if (userStore) {
      const token = userStore.token || "";
      config.headers["Authorization"] = token ? `Bearer ${token}` : "";
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
  

export default api;
