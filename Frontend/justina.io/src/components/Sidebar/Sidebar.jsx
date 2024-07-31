import { useNavigate } from "react-router-dom";

import { ImExit } from "react-icons/im";
import { FaGear } from "react-icons/fa6";
import justinachatbot from "../../assets/imgs/caraJustinabot.png";
import useUserStore from "../../hooks/useUserStore";
import SidebarNavigation from "./SidebarNavigation";

import Logo from "../Logo/Logo";

const Sidebar = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useUserStore();

  const handleLogout = () => {
    setToken("");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 text-center flex flex-col items-center p-4 bg-rose-50/opacity-10  shadow-inner backdrop-blur-[25.33px justify-start gap-[13px] inline-flex">
      <Logo />
      <SidebarNavigation />

      <div className="w-[207px] p-4 bg-rose-50/opacity-10 rounded-[32px] bg-[rgba(253,239,244,0.4)] shadow-custom flex-col justify-start items-center gap-[13px] inline-flex">
        <div className="px-2 py-1 w-full bg-rose-50/opacity-20 rounded-lg shadow-inner backdrop-blur-[25.33px] justify-start items-center gap-2 inline-flex hover:bg-[rgba(214,86,131,0.2)]">
          <FaGear />
          <span>Atajos</span>
        </div>

        <div
          className="px-2 py-1 w-full bg-rose-50/opacity-20 rounded-lg  shadow-inner backdrop-blur-[25.33px] justify-start items-start gap-2 inline-flex hover:bg-[rgba(214,86,131,0.2)]"
          onClick={handleLogout}
        >
          <ImExit />
          <span>Salir</span>
        </div>
      </div>

      <br />
      <div className="w-[207px] p-4 mb-3 bg-rose-50/opacity-10 rounded-[32px]  bg-[rgba(253,239,244,0.4)] shadow-custom flex-col justify-start items-center gap-[13px] inline-flex">
        <div className="w-[104px] text-base font-normal font-['Noto Sans'] leading-tight flex items-center">
          <span>¿Necesitas ayuda?</span>
        </div>
        <img className="w-12" src={justinachatbot} alt="" />
      </div>
    </div>
  );
};

export default Sidebar;
