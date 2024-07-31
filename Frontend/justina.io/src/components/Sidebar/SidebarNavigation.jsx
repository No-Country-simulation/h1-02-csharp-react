import { useState } from "react";

import { HomeIcon } from "../icons";
import SidebarNavigationItem from "./SidebarNavigationItem";
import { useCallback } from "react";

const ITEM_SIZE = 48;
const ITEM_GAP = 20;
const SIDEBAR_MARGIN = 12;
const SIDEBAR_SIZE = (ITEM_COUNT) =>
  SIDEBAR_MARGIN * 2 + ITEM_SIZE * ITEM_COUNT + ITEM_GAP * (ITEM_COUNT - 1);

const calculateItemPosition = (index) => {
  if (index === 0) {
    return SIDEBAR_MARGIN;
  }
  return SIDEBAR_MARGIN + index * (ITEM_SIZE + ITEM_GAP);
};

const menu = [
  {
    icon: <HomeIcon />,
    text: "Inicio",
    link: "/",
  },
  /*{
    icon: <PatientsIcon />,
    text: "Pacientes",
    link: "/drhome",
  },
  {
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
  const minHeight = SIDEBAR_SIZE(menu.length);
  return (
    <div
      className="relative w-14 h-auto mt-3 p-3 text-left rounded-[32px] shadow-custom bg-[rgba(253,239,244,0.1)] backdrop-blur-[12px] flex-col justify-start items-center gap-[13px] inline-flex me-auto"
      style={{ minHeight }}
    >
      {menu.map((item, index) => (
        <SidebarNavigationItem
          key={index}
          text={item.text}
          icon={item.icon}
          link={item.link}
          top={`${calculateItemPosition(index)}px`}
          left={"5px"}
          isActive={activeLink === item.text}
          setActive={handleActiveLink}
        />
      ))}
    </div>
  );
};

export default SidebarNavigation;
