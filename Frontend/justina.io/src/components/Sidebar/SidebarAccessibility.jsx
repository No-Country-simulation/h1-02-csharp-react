import justinachatbot from "../../assets/imgs/caraJustinabot.png";

const SidebarAccessibility = () => (
  <div className="w-[207px] p-4 mb-3 bg-rose-50/opacity-10 rounded-[32px]  bg-[rgba(253,239,244,0.4)] shadow-custom flex-col justify-start items-center gap-[13px] inline-flex">
    <div className="w-[104px] text-base font-normal font-['Noto Sans'] leading-tight flex items-center">
      <span>¿Necesitas ayuda?</span>
    </div>
    <img className="w-12" src={justinachatbot} alt="" />
  </div>
);

export default SidebarAccessibility;
