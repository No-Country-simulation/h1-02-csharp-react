import justinachatbot from "../../assets/imgs/caraJustinabot.png";
import SidebarNavigation from "./SidebarNavigation";
import SidebarSettings from "./SidebarSettings";

import Logo from "../Logo/Logo";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 text-center flex flex-col items-center p-4 bg-rose-50/opacity-10  shadow-inner backdrop-blur-[25.33px justify-start gap-[13px] inline-flex">
      <Logo />
      <SidebarNavigation />
      <SidebarSettings />

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
