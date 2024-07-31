import useUserStore from "../../hooks/useUserStore";

export default function HeaderTitles() {
  const { user } = useUserStore();

  return (
    <div className="pr-[36.24px] p-4 bg-neutral-50/opacity-10 rounded-2xl ">
      <p className="text-neutral-600 text-[40px] font-bold font-['Noto Sans'] leading-[48px]">
        Buen día {user.fullname}
      </p>
      <p className="text-neutral-600 text-subtitulo font-normal font-['Noto Sans'] leading-tight">
        {user.roles === "Patient"
          ? "Aqui puedes registrar todos tus tratamientos"
          : "Revisa el progreso de los pacientes y los tratamientos"}
      </p>
    </div>
  );
}
