import { useState } from "react";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper";
import FormInput from "../FormInput/FormInput";
import { ProfileIcon } from "../icons";
import useRegisterDoctor from "../../hooks/useRegisterDoctor";
import SpecialistDropDown from "./SpecialistDropDown";
import useDoctorStore from "../../store/useDoctorStore";

const DEFAULT_VALUES = {
  firstName: "",
  lastName: "",
  identificationNumber: "",
  phoneNumber: "",
  email: "",
  specialitiesIds: null,
  localRegistrationNumber: "",
  nationalRegistrationNumber: "",
  password: "",
  confirmedPassword: "",
};

export default function RegisterDoctorModal() {
  const { openRegisterDoctor, setOpenRegisterDoctor, addDoctor } =
    useDoctorStore();
  const { register, specialities } = useRegisterDoctor();
  const [values, setValues] = useState(DEFAULT_VALUES);
  const handleChange = (event) => {
    const { id, value } = event.target;
    if (id === "phoneNumber" && !/^[0-9]*$/.test(value)) {
      return;
    }
    setValues({
      ...values,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const sendToRegister = {
      ...values,
      confirmedPassword: undefined,
      identificationType: 0,
      emailConfirmed: values.email,
      specialitiesIds: [values.specialitiesIds?.id],
    };

    register([sendToRegister]).then(() => {
      addDoctor(values);
      setValues(DEFAULT_VALUES);
      setOpenRegisterDoctor(false);
    });
  };
  return (
    <ModalWrapper
      className="h-[90dvh] max-h-[625px]"
      open={openRegisterDoctor}
      onClose={() => setOpenRegisterDoctor(false)}
    >
      <div className="shadow-glass-effect flex justify-center items-center rounded-[32px] bg-[#FDEFF4]/40 mx-auto mb-4">
        <h3 className="flex gap-x-4 text-primary font-bold px-4 py-2 ">
          <ProfileIcon /> Registra un medico
        </h3>
      </div>
      <div className="flex flex-col overflow-auto h-[95%] scrollbar-style rose pe-2">
        <form
          className="grid grid-cols-2 gap-x-6 gap-y-3"
          onSubmit={handleSubmit}
        >
          <FormInput
            name="Nombre *"
            id="firstName"
            inputStyle="min-w-[220px]"
            onChange={handleChange}
            value={values.firstName}
          />
          <FormInput
            name="Apellido *"
            id="lastName"
            inputStyle="min-w-[220px]"
            onChange={handleChange}
            value={values.lastName}
          />
          <FormInput
            name="CUIL *"
            id="identificationNumber"
            onChange={handleChange}
            value={values.identificationNumber}
          />

          <FormInput
            name="Telefono *"
            type="tel"
            id="phoneNumber"
            inputStyle="min-w-[220px]"
            onChange={handleChange}
            value={values.phoneNumber}
          />
          <FormInput
            name="Correo Electronico *"
            type="email"
            id="email"
            inputStyle="min-w-[220px]"
            onChange={handleChange}
            value={values.email}
          />
          <SpecialistDropDown
            selected={values.specialitiesIds}
            specialities={specialities}
            setValue={(value) =>
              setValues({
                ...values,
                specialitiesIds: value,
              })
            }
          />
          <FormInput
            name="Matricula Nacional *"
            id="nationalRegistrationNumber"
            inputStyle="min-w-[220px]"
            onChange={handleChange}
            value={values.nationalRegistrationNumber}
          />
          <FormInput
            name="Matricula Local"
            id="localRegistrationNumber"
            inputStyle="min-w-[220px]"
            onChange={handleChange}
            value={values.localRegistrationNumber}
          />

          <FormInput
            name="Contraseña *"
            id="password"
            type="password"
            inputStyle="min-w-[220px]"
            onChange={handleChange}
            value={values.password}
          />
          <FormInput
            name="Confirme la contraseña *"
            id="confirmedPassword"
            type="password"
            inputStyle="min-w-[220px]"
            onChange={handleChange}
            value={values.confirmedPassword}
          />

          <div className="col-span-2 flex justify-center items-center">
            <button className="shadow-custom w-40 bg-rose-o40 text-primary leading-[120%] text-center p-2 rounded-[32px] mb-2">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}
