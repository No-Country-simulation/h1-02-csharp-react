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
    top: "10px",
    left: "5px",
  },
  {
    icon: <PatientsIcon />,
    text: "Pacientes",
    link: "/drhome",
    top: "68px",
    left: "5px",
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
    <div className="relative w-14 h-auto min-h-[126px] mt-3 p-3 text-left rounded-[32px] shadow-custom bg-[rgba(253,239,244,0.1)] backdrop-blur-[12px] flex-col justify-start items-center gap-[13px] inline-flex me-auto">
      {menu.map((item, index) => (
        <SidebarNavigationItem
          key={index}
          text={item.text}
          icon={item.icon}
          link={item.link}
          top={item.top}
          left={item.left}
          isActive={activeLink === item.text}
          setActive={handleActiveLink}
        />
      ))}
    </div>
  );
};

export default SidebarNavigation;
