import { useState, useRef } from "react";
import FormInput from "../../components/FormInput/FormInput";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/imgs/imagotype.webp";
import { toast } from "react-toastify";
import { EyeIcon } from "../../components/icons";
import { Link } from "react-router-dom";

// Valor por default del estado del registro
const DEFAULT = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  identificationNumber: "",
  email: "",
  emailConfirmed: "",
  password: "",
};

const Register = () => {
  const [values, setValues] = useState(DEFAULT);
  const { register } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const toastId = useRef(undefined);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    toastId.current = toast.loading("Iniciando Sesion...");
    try {
      const req = {
        ...values,
        accountType: 2,
        bloodType: 0,
        identificationType: 0,
        emailConfirmed: values.email,
      };
      register(req).then((res) => {
        toast.done(toastId.current);
        if (res) {
          setValues(DEFAULT);
          toast.success("Te has registrado exitosamente");
        } else {
          toast.error("Ha ocurrido un error al registrarse");
        }
      });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };
  const handleShowPass = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPass((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[1100px] m-14 h-screen pr-8 flex justify-center items-center rounded-3xl bg-rose-o10 shadow-glass-effect">
        <div className="rounded-3xl w-1/2 flex flex-col justify-center items-center bg-primary h-full px-14">
          <img className="w-56 mb-3" src={logo} alt="" />
          <p className="text-white text-small mb-8">
            Ayudemos a Todos los que Podamos
          </p>
          <p className="text-white text-center">
            Toda la información del paciente en un único lugar, para que pueda
            ser consultada de manera rápida y segura.
          </p>
        </div>
        <div className="w-1/2 px-12">
          <section className="w-full h-screen py-8 px-1">
            <h2 className="text-3xl font-bold mb-4">Registro</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <FormInput
                name="Nombre *"
                type="text"
                autoComplete="given-name"
                placeholder="Ingrese su nombre"
                id="firstName"
                value={values.firstName}
                onChange={handleChange}
              />
              <FormInput
                name="Apellido *"
                type="text"
                autoComplete="family-name"
                placeholder="Ingrese su apellido"
                id="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
              <FormInput
                name="Teléfono *"
                type="tel"
                autoComplete="tel-national"
                placeholder="Ingrese su número telefónico"
                id="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
              />
              <FormInput
                name="CUIL *"
                type="text"
                placeholder="Ingrese su CUIL"
                id="identificationNumber"
                value={values.identificationNumber}
                onChange={handleChange}
              />
              <FormInput
                name="Email *"
                type="email"
                autoComplete="email"
                placeholder="Ingrese su email"
                id="email"
                value={values.email}
                onChange={handleChange}
              />

              <div className="w-full h-auto relative ">
                <FormInput
                  name="Constraseña *"
                  type={showPass ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  inputStyle="pr-9 min-[780px]:pr-[19%]"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <button
                  onClick={handleShowPass}
                  className={`show-pass-style ${
                    showPass
                      ? "opacity-100 bg-rose-o60"
                      : "bg-transparent opacity-85"
                  }`}
                >
                  <EyeIcon />
                </button>
              </div>
              <button
                type="submit"
                className="bg-indigo-800 py-1 px-4 rounded-lg text-white w-fit"
              >
                Registrarme
              </button>
            </form>
            <div className="w-full px-4 text-neutrals800 inline-flex justify-center mt-6">
              <p className="text-small">¿Ya tienes una cuenta?</p>
              <Link
                className="text-primary text-parrafo font-semibold pl-2 transition ease duration-100 hover:text-secondary hover:underline"
                to="/login"
              >
                Login
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Register;
