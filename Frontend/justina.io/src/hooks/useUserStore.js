import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const storeInit = (store, persistence) => devtools(persist(store, persistence));

const useUserStore = create()(
  storeInit((set) => ({
    user: null,
    token: "",
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
  }), {name: "userStore"})
);

export default useUserStore;
