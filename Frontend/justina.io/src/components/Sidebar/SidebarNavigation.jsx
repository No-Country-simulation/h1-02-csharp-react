import { useState } from "react";

import { HomeIcon, PatientsIcon } from "../icons";
//import { MdCalendarMonth } from "react-icons/md";
//import { RiHandHeartFill } from "react-icons/ri";
import SidebarNavigationItem from "./SidebarNavigationItem";
import { useCallback } from "react";

const menu = [
  {
    icon: <HomeIcon />,
    text: "Inicio",
    link: "/home",
  },
  {
    icon: <PatientsIcon />,
    text: "Pacientes",
    link: "/drhome",
  },
  /*{
    icon: <MdCalendarMonth />,
    text: "Agenda",
    link: "",
  },
  {
    icon: <RiHandHeartFill />,
    text: "Trasplante cruzado",
    link: "",
  },*/
];

const SidebarNavigation = () => {
  const [activeLink, setActiveLink] = useState("Inicio");

  const handleActiveLink = useCallback((updatedLink) => {
    setActiveLink(updatedLink);
  }, []);
  return (
    <div className="menu-div w-52 mt-3 p-4 text-left bg-rose-50/opacity-10 rounded-[32px] bg-[rgba(253,239,244,0.4)] shadow-custom flex-col justify-start items-center gap-[13px] inline-flex">
      {menu.map((item, index) => (
        <SidebarNavigationItem
          key={index}
          text={item.text}
          icon={item.icon}
          link={item.link}
          isActive={activeLink === item.text}
          setActive={handleActiveLink}
        />
      ))}
    </div>
  );
};

export default SidebarNavigation;
