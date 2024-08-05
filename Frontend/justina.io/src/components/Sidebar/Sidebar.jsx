import SidebarNavigation from "./SidebarNavigation";
import SidebarSettings from "./SidebarSettings";
import SidebarAccessibility from "./SidebarAccessibility";
import Logo from "../Logo/Logo";

const Sidebar = () => (
  <div className="h-full w-60 text-center flex flex-col items-center p-4 bg-rose-o10 shadow-inner backdrop-blur-[25.33px justify-start gap-[13px] inline-flex">
    <Logo />
    <SidebarNavigation />
    <SidebarSettings />
    <SidebarAccessibility />
  </div>
);

export default Sidebar;
