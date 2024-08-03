import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const storeInit = (store, persistence) => devtools(persist(store, persistence));

const useDoctorStore =create()(
  storeInit((set) => ({
    doctorDeleted: "",
    openRegisterDoctor: false,
    setOpenRegisterDoctor: (openRegisterDoctor) => set({ openRegisterDoctor }),
    setDoctorDeleted: (doctorDeleted) => set({ doctorDeleted }),
  }), {name: "doctorStore"})
);


export default useDoctorStore;