import { IoMdNotifications } from "react-icons/io";

export default function HeaderNotificationButton() {
  return (
    <div className="w-11 h-11 p-2.5 bg-rose-50/opacity-10 rounded-[48px] bg-[rgba(253,239,244,0.4)] shadow-custom  justify-start items-center gap-2.5 inline-flex">
      <IoMdNotifications className="w-full text-[40px]" />
    </div>
  );
}
