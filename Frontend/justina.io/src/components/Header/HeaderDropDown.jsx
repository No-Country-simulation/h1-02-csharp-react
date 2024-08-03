import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useUserStore";

export default function HeaderDropDown() {
  const { setToken, setUser } = useUserStore();

  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="absolute right-0 top-10 mt-2 w-full  rounded-md shadow-lg bg-[rgba(253,239,244,1)] shadow-custom  focus:outline-none z-40">
      <div className="py-1">
        <Link
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[rgba(214,86,131,0.2)]"
          to="/perfil-medico"
        >
          Perfil
        </Link>
        <button
          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[rgba(214,86,131,0.2)] "
          role="menuitem"
          tabIndex="-1"
          onClick={handleLogout}
        >
          Salir
        </button>
      </div>
    </div>
  );
}
