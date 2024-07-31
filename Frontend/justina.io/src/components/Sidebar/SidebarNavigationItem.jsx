import { Link } from "react-router-dom";

const SidebarNavigationItem = ({ isActive, text, link, icon, setActive }) => {
  return (
    <div
      className={`px-2 py-1 w-full bg-rose-50/opacity-20 rounded-lg shadow-inner backdrop-blur-[25.33px] justify-start items-center gap-2 inline-flex hover:bg-[rgba(214,86,131,0.2)] ${
        isActive ? "active" : ""
      }`}
      onClick={() => setActive(text)}
    >
      {icon}
      <Link to={link}>{text}</Link>
    </div>
  );
};

export default SidebarNavigationItem;
