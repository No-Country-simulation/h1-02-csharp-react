import api from "../api/axios";

const useHandleDeleteDoctor = (id) => {
  api.delete(`/api/HealthCareProviders/${id}`).then((value) => {
    console.log("Deleted: ", value);
    const doctorStore = localStorage.getItem("doctorStore")
      ? JSON.parse(localStorage.getItem("doctorStore"))
      : {};
    if (doctorStore) {
      localStorage.setItem(
        "doctorStore",
        JSON.stringify({
          version: 0,
          state: { ...doctorStore.state, doctorDeleted: id },
        })
      );
    }
  });
};

export default useHandleDeleteDoctor;
