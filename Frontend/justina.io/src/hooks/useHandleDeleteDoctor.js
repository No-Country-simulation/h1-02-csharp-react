import api from "../api/axios";

const handleDeleteDoctor = (id) => {
  return api.delete(`/api/HealthCareProviders/${id}`).then((value) => {
    return true;
  }).catch(()=> false);
};

export default handleDeleteDoctor;
