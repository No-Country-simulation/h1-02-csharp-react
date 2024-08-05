import justina from "../../assets/imgs/JustinaHelper.png";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex justify-center items-center w-full h-full gap-x-4 min-h-dvh">
      <div>
        <img
          className="object-cover object-center"
          src={justina}
          alt="Dibujo Justina"
          decoding="async"
        />
      </div>
      <div className="flex flex-col justify-center items-start">
        <h2 className="font-bold text-primary text-5xl">Lo sentimos!</h2>
        <p className="text-neutrals900 font-medium mt-1 text-lg">
          No hemos encontrado la pagina que estas buscando.
        </p>
        <Link
          to="/"
          className="outline-none border-none no-underline rounded-[16px] shadow-glass-effect  py-2 px-5 mt-5 bg-[#fafafa]/50"
        >
          Regresar
        </Link>
      </div>
    </section>
  );
}
