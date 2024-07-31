import { useNavigate } from "react-router-dom";
import useUserStore from "../../hooks/useUserStore";
import { LogoutIcon, SettingIcon } from "../icons";

export default function SidebarSettings() {
  const navigate = useNavigate();
  const { setToken, setUser } = useUserStore();

  const handleLogout = () => {
    setToken("");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="w-[207px] mt-7 p-4 rounded-[32px] shadow-glass-effect flex-col justify-start items-center gap-[1.3rem] inline-flex ">
      <div
        className="px-3 py-2 w-full shadow-custom backdrop-blur-[12.6667px] bg-[rgba(253,239,244,0.1)] rounded-[32px] justify-start items-center gap-x-2 inline-flex select-none cursor-pointer"
        onClick={() => alert("Not implemented")}
      >
        <SettingIcon />
        <span className="text-primary font-medium">Configuracion</span>
      </div>

      <div
        className="px-3 py-2 w-full shadow-custom backdrop-blur-[12.6667px] bg-[rgba(253,239,244,0.1)] rounded-[32px] justify-start items-center gap-x-2 inline-flex select-none cursor-pointer"
        onClick={handleLogout}
      >
        <LogoutIcon />
        <span className="text-primary font-medium">Salir</span>
      </div>
    </div>
  );
}
