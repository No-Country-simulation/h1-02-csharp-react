import useUserStore from "../../hooks/useUserStore";
//import HeaderOptions from "./HeaderOptions";

const Header = () => {
  const { user } = useUserStore();

  return (
    <div className="justify-between h-36 items-center flex">
      <div className="pr-[36.24px] p-4 bg-neutral-50/opacity-10 rounded-2xl ">
        <p className="text-neutral-600 text-[40px] font-bold font-['Noto Sans'] leading-[48px]">
          Buen día {user.fullname}
        </p>
        <p className="text-neutral-600 text-subtitulo font-normal font-['Noto Sans'] leading-tight">
          Revisa el progreso de los pacientes y los tratamientos
        </p>
      </div>

      {/*<HeaderOptions /> */}
    </div>
  );
};

export default Header;
