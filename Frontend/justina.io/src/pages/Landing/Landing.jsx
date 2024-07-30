import { Link } from "react-router-dom";

//TODO: No tiene sentido ahora mismo
const Landing = () => {
  return (
    <section className="">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Justina.io</h1>
        <div className="flex gap-6">
          <button
            type="submit"
            className="bg-indigo-800 py-1 px-4 rounded-lg text-white w-fit"
          >
            <Link to="/register">Registrarme</Link>
          </button>
          <button
            type="submit"
            className="bg-indigo-800 py-1 px-4 rounded-lg text-white w-fit"
          >
            <Link to="/login">Iniciar Sesión</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Landing;
