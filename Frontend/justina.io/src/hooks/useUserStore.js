import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const storeInit = (store, persistence) => devtools(persist(store, persistence));

const useUserStore = create()(
  storeInit((set) => ({
    userFullName: "",
    token: "",
    setUserFullname: (userFullName) => set({ userFullName }),
    setToken: (token) => set({ token }),
  }), {name: "userStore"})
);

export default useUserStore;
