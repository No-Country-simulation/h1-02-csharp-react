import ButtonSoft from "../../components/ButtonSoft/ButtonSoft";
import DataBar from "../../components/DataBar/DataBar";

import ToDoList from "../../components/ToDoList/ToDoList";

const PatientHome = () => {
  return (
    <div className="w-full">
      <p>Inicio</p>
      <DataBar />
      <div className="flex flex-row w-auto mt-4 mx-6 gap-2">
        <div className="basis-1/4">
          <p>Aqui perfil paciente</p>
        </div>
        <div className="basis-3/4 h-10 flex-col gap-[38px] inline-flex">
          <div className="inline-flex justify-around mx-4">
            <ButtonSoft text="Medicamentos" />
            <ButtonSoft text="Estudios" />
            <ButtonSoft text="Historial Turnos" />
            <ButtonSoft text="Agregar Nota" />
          </div>
          <div className="flex justify-center">
            <ToDoList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHome;
