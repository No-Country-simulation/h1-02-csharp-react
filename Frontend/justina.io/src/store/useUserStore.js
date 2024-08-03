import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

//Guarda el token y el usuario en localStorage con el nombre "userStore"
const storeInit = (store, persistence) => devtools(persist(store, persistence));
/* 
user: {
  id: string,
  fullname: string,
  roles: string,
  email: string,
}
*/
const useUserStore = create()(
  storeInit((set) => ({
    user: null,
    token: "",
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
  }), {name: "userStore"})
);

export default useUserStore;
