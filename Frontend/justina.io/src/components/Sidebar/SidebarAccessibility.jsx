import justina from "../../assets/imgs/JustinaHelper.png";
import { PersonIcon, AskIcon } from "../icons";

const SidebarAccessibility = () => (
  <div className="w-[207px] p-4 mt-4 flex-col justify-start items-center gap-[13px] inline-flex">
    <div className="w-[104px] text-base font-normal font-['Noto Sans'] leading-tight flex items-center">
      <span className="text-neutrals800 font-semibold text-shadow">
        ¿Necesitas ayuda?
      </span>
    </div>
    <div className="flex flex-col gap-y-4">
      <button
        title="Abrir accesibilidad"
        className="shadow-glass-effect bg-rose-o40 rounded-full p-2"
        onClick={() => alert("Not implemented")}
      >
        <PersonIcon />
      </button>
      <button
        title="Abrir chat bot"
        className="shadow-glass-effect bg-rose-o40 rounded-full p-2"
        onClick={() => alert("Not implemented")}
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

export default SidebarAccessibility;
