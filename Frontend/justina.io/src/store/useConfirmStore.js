import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const storeInit = (store, persistence) => devtools(persist(store, persistence));
/* 
user: {
  open: boolean, 
}
*/
const useConfirmStore = create()(
  storeInit((set) => ({
    open: false,
    modalType:"",
    onConfirm: ()=>{},
    setOnConfirm: (onConfirm) => set({ onConfirm }),
    setModalType: (modalType) => set({ modalType }),
    setOpen: (open) => set({ open }),
    toggle: () => set((state)=> ({...state, open: !state.open})),
  }), {name: "confirmStore"})
);

export default useConfirmStore;
