import { useState } from "react";
import FormInput from "../../components/FormInput/FormInput";

import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import logo from "../../assets/imgs/imagotype.webp";
import { EyeIcon } from "../../components/icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      login({
        email,
        password,
      }).then(() => {
        setEmail("");
        setPassword("");
      });
    } catch (error) {
      console.error("Error al Iniciar sesion:", error);
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
        <div className="rounded-3xl w-1/2 flex flex-col justify-center items-center h-full px-14">
          <img
            className="rounded-3xl absolute w-1/2 h-full inset-0 object-cover"
            src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Portada login"
            decoding="async"
          />
          <div className="rounded-3xl absolute w-1/2 inset-0 bg-pink-700 bg-opacity-70"></div>
          <div className="relative flex flex-col justify-center items-center h-full">
            <img className="w-56 mb-3" src={logo} alt="" />
            <p className="text-white text-small mb-8">
              Ayudemos a Todos los que Podamos
            </p>
            <p className="text-white text-center">
              Toda la información del paciente en un único lugar, para que pueda
              ser consultada de manera rápida y segura.
            </p>
          </div>

          <img src="" alt="" />
        </div>
        <div className="w-1/2 px-14">
          <h2 className="text-neutrals800 text-titulopag font font-bold mb-4">
            Inicia Sesión
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <FormInput
              name="Email"
              type="email"
              placeholder="Ingrese su email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="w-full h-auto relative ">
              <FormInput
                name="Password"
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Ingrese su contraseña"
                inputStyle="pr-9 min-[780px]:pr-[19%]"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              className="bg-primary text-parrafo py-2 px-4 rounded-[32px] text-white w-full"
            >
              Ingresar
            </button>
          </form>
          <div className="w-full px-4 text-neutrals800 inline-flex justify-center mt-6">
            <p className="text-small">¿No tienes una cuenta?</p>
            <Link
              className="text-primary text-parrafo font-semibold pl-2 transition ease duration-100 hover:text-secondary hover:underline"
              to="/register"
            >
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
