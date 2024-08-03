import { create } from "zustand";


const useDoctorStore =create(((set) => ({
  openRegisterDoctor: false,
  doctors: [],
  setDoctors: (doctors) => {
    set({ doctors })
  },
  removeId: (ID)=> set((state) => ({
    doctors: state.doctors.filter((doctor) => doctor.id !== ID),
  })),
  addDoctor: (doctor) => set((state) => ({ doctors: [...state.doctors, {
    id: doctor.id,
    email: doctor.email,
    fullName: `${doctor.firstName} ${doctor.lastName}`,
    identification: doctor.identificationNumber
}] })),
  setOpenRegisterDoctor: (openRegisterDoctor) => set({ openRegisterDoctor }),
})));


export default useDoctorStore;