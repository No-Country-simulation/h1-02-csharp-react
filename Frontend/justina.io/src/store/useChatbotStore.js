import { create } from "zustand";


const useChatbotStore =create(((set) => ({
  openChatBot: true,
  buttonRef: null,
  setButtonRef: (ref) => set({ buttonRef: ref }),
  setOpenChatbot: (openChatBot) => {
    set({ openChatBot })
  },
})));


export default useChatbotStore;