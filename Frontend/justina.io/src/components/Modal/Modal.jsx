import { useState } from "react";
import FormInput from "../../components/FormInput/FormInput";
import Button from "../Button/Button";

const listaPacientes = [
  {
    dni: "123345",
    nombre: "Malcolm Lockyer",
  },
  {
    dni: "123345",
    nombre: "Malcolm Lockyer",
  },
  {
    dni: "123345",
    nombre: "Malcolm Lockyer",
  },
];

const Modal = ({ closeModal }) => {
  const [search, setSearch] = useState("");

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-5 rounded flex flex-col justify-center items-center">
        <div className="justify-between inline-flex items-center w-full">
          <p>Agregar Paciente</p>
          <Button text="Cerrar" onClick={closeModal} />
        </div>
        <div className="buscador w-80">
          <FormInput
            type="text"
            placeholder="Buscar paciente"
            id="campobuscador"
            value={search}
            onChange={searcher}
          />
        </div>

        <table className="w-auto py-4 table-fixed border text-center text-sm font-light dark:border-neutral-500 border-collapse border-slate-400">
          <thead className="bg-primary opacity-60 border-b font-medium dark:border-neutral-500 bg-[rgba(253,239,244,0.4)] shadow-custom">
            <tr>
              <th className="px-6 py-3">DNI</th>
              <th className="px-6 py-3">Nombre completo</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody className="bg-[rgba(253,239,244,0.4)] shadow-custom">
            {listaPacientes.map((data) => (
              <tr key={data.id} className="border-b dark:border-neutral-500">
                <td className="px-6 py-3">{data.dni}</td>
                <td>{data.nombre}</td>
                <td>
                  <Button text="Agregar" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Modal;
