import { Link } from "react-router-dom";

const SidebarNavigationItem = ({
  isActive,
  text,
  link,
  icon,
  setActive,
  top,
  left,
}) => {
  return (
    <Link
      to={link}
      className={`absolute flex justify-start items-center gap-x-4 p-1 min-w-36 max-w-36 transition-all opacity-85 hover:opacity-100  ${
        isActive ? "active" : ""
      }`}
      style={{ top, left }}
      onClick={() => setActive(text)}
    >
      <div className={`p-3 shadow-glass-effect bg-rose-o40 rounded-[48px]`}>
        {icon}
      </div>
      <span className="text-primary font-semibold">{text}</span>
    </Link>
  );
};

export default SidebarNavigationItem;
