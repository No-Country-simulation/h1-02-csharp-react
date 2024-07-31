import useUserStore from "../../hooks/useUserStore";
import doctorProfile from "../../assets/imgs/medico.png";
import userProfile from "../../assets/imgs/avatar.png";

export default function HeaderTitles() {
  const { user } = useUserStore();
  const isPatient = user.roles === "Patient";
  const profile = isPatient ? userProfile : doctorProfile;

  return (
    <div className="pr-[36.24px] p-4 bg-neutral-50/opacity-10 rounded-2xl ">
      <p className="text-neutral-600 text-[40px] font-bold font-['Noto Sans'] leading-[48px] flex gap-x-4 justify-start items-center">
        <img
          src={profile}
          className="rounded-full object-cover object-center size-9"
          alt="User profile"
          loading="lazy"
          decoding="async"
        />{" "}
        Buen día {user.fullname}
      </p>
      <p className="text-neutral-600 text-subtitulo font-normal font-['Noto Sans'] leading-tight">
        {isPatient === "Patient"
          ? "Aqui puedes registrar todos tus tratamientos"
          : "Revisa el progreso de los pacientes y los tratamientos"}
      </p>
    </div>
  );
}
