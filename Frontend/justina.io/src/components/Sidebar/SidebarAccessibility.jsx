import { useRef } from "react";
import justina from "../../assets/imgs/JustinaHelper.png";
import useChatbotStore from "../../store/useChatbotStore";
import { PersonIcon, AskIcon } from "../icons";
import { useEffect } from "react";

const SidebarAccessibility = () => {
  const { setOpenChatbot, setButtonRef } = useChatbotStore();
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) setButtonRef(ref);
  }, [ref.current]);
  return (
    <div className="w-[207px] p-4 mt-4 flex-col justify-start items-center gap-[13px] inline-flex">
      <div className="w-[104px] text-base font-normal font-['Noto Sans'] leading-tight flex items-center">
        <span className="text-neutrals800 font-semibold text-shadow">
          ¿Necesitas ayuda?
        </span>
      </div>
      <div className="flex flex-col gap-y-4">
        <button
          className="shadow-glass-effect bg-rose-o40 rounded-full p-2 opacity-70"
          onClick={() => alert("Not implemented")}
          disabled
          title="Accesibilidad, muy pronto..."
        >
          <PersonIcon />
        </button>
        <button
          ref={ref}
          title="Abrir chat bot"
          className="shadow-glass-effect bg-rose-o40 rounded-full p-2"
          onClick={() => setOpenChatbot(true)}
        >
          <AskIcon />
        </button>
      </div>
      <img
        className="w-12 object-cover object-center"
        src={justina}
        alt="Justina Helper"
        decoding="async"
        loading="lazy"
      />
    </div>
  );
};

export default SidebarAccessibility;
