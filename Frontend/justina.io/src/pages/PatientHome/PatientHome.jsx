import { useState } from "react";
import ButtonSoft from "../../components/ButtonSoft/ButtonSoft";
import DataBar from "../../components/DataBar/DataBar";

import ToDoList from "../../components/ToDoList/ToDoList";

import ModalMedicacion from "../../components/ModalMedicacion/ModalMedicacion";

const PatientHome = () => {
  const [openMedicacion, setOpenMedicacion] = useState(false);
  const [_openResults, setOpenResults] = useState(false);

  const closeModal = () => {
    setOpenMedicacion(false);
  };

  return (
    <div className="w-full">
      <p>Inicio</p>
      <DataBar />
      <div className="flex flex-row w-auto mt-4 mx-4 gap-2">
        <div className="basis-3/4 flex-col gap-[38px] inline-flex justify-start">
          <div className="inline-flex justify-around mx-4">
            <ButtonSoft
              text="Medicamentos"
              onClick={() => setOpenMedicacion(true)}
            />
            <ButtonSoft text="Estudios" onClick={() => setOpenResults(true)} />
            <ButtonSoft text="Consultas Médicas" />
          </div>
          <div className="flex justify-center">
            <ToDoList />
          </div>
        </div>
        <div className="basis-1/4">
          <p>Aqui perfil paciente</p>
        </div>
      </div>

      {openMedicacion && <ModalMedicacion closeModal={closeModal} />}
    </div>
  );
};

export default PatientHome;
