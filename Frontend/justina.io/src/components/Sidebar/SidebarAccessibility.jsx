import justina from "../../assets/imgs/JustinaHelper.png";

const SidebarAccessibility = () => (
  <div className="w-[207px] p-4 mb-3 flex-col justify-start items-center gap-[13px] inline-flex">
    <div className="w-[104px] text-base font-normal font-['Noto Sans'] leading-tight flex items-center">
      <span className="text-neutrals800 font-semibold text-shadow">
        ¿Necesitas ayuda?
      </span>
    </div>
    <img
      className="w-12 object-cover object-center"
      src={justina}
      alt="Justina Helper"
      decoding="async"
      loading="lazy"
    />
  </div>
);

export default SidebarAccessibility;
