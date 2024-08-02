import FormInput from "../FormInput/FormInput";
import profile from "../../assets/imgs/doctor.png";
import { Link } from "react-router-dom";
import useSearchPatient from "../../hooks/useSearchPatient";
import Show from "../Show/Show";
import CardPreviewPacientLoader from "../Loader/CardPreviewPacientLoader";
import { SearchState } from "../../constants/SearchState";

const CardPreviewPacient = () => {
  const { isLoading, patient } = useSearchPatient();
  return (
    <div
      className={` max-w-[90%] h-96 rounded-[32px] shadow-glass-effect transition-all duration-300 ${
        !patient && isLoading === SearchState.WAITING
          ? "opacity-0 w-0"
          : "w-[1074px] opacity-100 bg-rose-o60"
      } ${isLoading === 2 ? "px-4 py-6" : ""}`}
    >
      <Show when={isLoading === SearchState.LOADING}>
        <CardPreviewPacientLoader />
      </Show>
      <Show when={isLoading === SearchState.FINISH && !!patient}>
        <div className="w-full h-full flex items-center justify-start gap-x-4">
          <div className="w-[25%] h-full max-w-[300px] flex flex-col justify-start items-center">
            <FormInput
              name="Paciente"
              type="text"
              value={patient?.name}
              inputStyle="inner-smooth-shadow mb-4"
              readOnly
            />
            <img
              src={profile}
              alt="Imagen de perdil del paciente"
              className="object-cover object-center h-[10.5rem]"
            />
            <Link
              className="flex justify-center items-center shadow-custom rounded-[32px] h-10 w-full mt-auto"
              to={`/patientdetails/${patient?.ID}`}
            >
              Ver todo
            </Link>
          </div>
          <div className="w-[75%] h-full flex flex-col justify-start items-center">
            <FormInput
              name="Identificacion"
              type="text"
              value={patient?.identification}
              inputStyle="inner-smooth-shadow"
              readOnly
            />
            <FormInput
              name="Edad"
              type="text"
              value={patient?.age}
              inputStyle="inner-smooth-shadow"
              readOnly
            />
            <FormInput
              name="Tipo de sangre"
              type="text"
              value={patient?.bloodType}
              inputStyle="inner-smooth-shadow"
              readOnly
            />
          </div>
        </div>
      </Show>
    </div>
  );
};

export default CardPreviewPacient;
