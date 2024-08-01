import { useState } from "react";
import FormInput from "../../components/FormInput/FormInput";
import useAuth from "../../hooks/useAuth";

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
    try {
      const req = {
        ...values,
        accountType: 2,
        bloodType: 0,
        identificationType: 0,
      };
      register(req).then(() => {
        setValues(DEFAULT);
      });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  return (
    <section className="w-2/3 h-screen p-8">
      <h2 className="text-3xl font-bold mb-4">Registro</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <FormInput
          name="Nombre"
          type="text"
          autoComplete="given-name"
          placeholder="Ingrese su nombre"
          id="firstName"
          value={values.firstName}
          onChange={handleChange}
        />
        <FormInput
          name="Apellido"
          type="text"
          autoComplete="family-name"
          placeholder="Ingrese su apellido"
          id="lastName"
          value={values.lastName}
          onChange={handleChange}
        />
        <FormInput
          name="Teléfono"
          type="tel"
          autoComplete="tel-national"
          placeholder="Ingrese su número telefónico"
          id="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
        />
        <FormInput
          name="CUIL"
          type="text"
          placeholder="Ingrese su CUIL"
          id="identificationNumber"
          value={values.identificationNumber}
          onChange={handleChange}
        />
        <FormInput
          name="Email"
          type="email"
          autoComplete="email"
          placeholder="Ingrese su email"
          id="email"
          value={values.email}
          onChange={handleChange}
        />
        <FormInput
          name="Confirmar Email"
          type="email"
          autoComplete="email"
          placeholder="Ingrese su email"
          id="emailConfirmed"
          value={values.emailConfirmed}
          onChange={handleChange}
        />
        {/* //TODO: Contrasea debe de ser input tipo contrasea */}
        <FormInput
          name="Constraseña"
          type="password"
          placeholder="Ingrese su contraseña"
          id="password"
          value={values.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-indigo-800 py-1 px-4 rounded-lg text-white w-fit"
        >
          Registrarme
        </button>
      </form>
    </section>
  );
};

export default Register;
