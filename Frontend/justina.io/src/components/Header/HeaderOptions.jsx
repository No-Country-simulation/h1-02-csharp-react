import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import useUserStore from "../../hooks/useUserStore";
import HeaderNotificationButton from "./HeaderNotificationButton";
import HeaderDropDown from "./HeaderDropDown";
import Show from "../Show/Show";

export default function HeaderOptions() {
  const [open, setOpen] = useState(false);
  const { user } = useUserStore();
  return (
    <div className="mt-6 flex justify-center items-center">
      <HeaderNotificationButton />

      <div className="h-11 px-4 py-2 bg-rose-50/opacity-10 rounded-[32px] bg-[rgba(253,239,244,0.4)] shadow-custom justify-between items-center relative inline-flex">
        <div
          className="items-center gap-2.5 flex text-neutral-600 min-w-36 w-full justify-between"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="w-full whitespace-nowrap">{user.fullname}</span>
          <Show when={!open} fallback={<IoIosArrowUp />}>
            <IoIosArrowDown className="" />
          </Show>
        </div>
        <Show when={open}>
          <HeaderDropDown />
        </Show>
      </div>
    </div>
  );
}
