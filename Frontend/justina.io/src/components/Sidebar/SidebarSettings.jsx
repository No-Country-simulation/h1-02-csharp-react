import { useNavigate } from "react-router-dom";
import useUserStore from "../../hooks/useUserStore";
import { ImExit } from "react-icons/im";
import { FaGear } from "react-icons/fa6";

export default function SidebarSettings() {
  const navigate = useNavigate();
  const { setToken, setUser } = useUserStore();

  const handleLogout = () => {
    setToken("");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="w-[207px] p-4 bg-rose-50/opacity-10 rounded-[32px] bg-[rgba(253,239,244,0.4)] shadow-custom flex-col justify-start items-center gap-[13px] inline-flex">
      <div
        className="px-2 py-1 w-full bg-rose-50/opacity-20 rounded-lg shadow-inner backdrop-blur-[25.33px] justify-start items-center gap-2 inline-flex hover:bg-[rgba(214,86,131,0.2)]"
        onClick={() => alert("Not implemented")}
      >
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
  );
}
