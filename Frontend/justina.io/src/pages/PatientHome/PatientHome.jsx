
import DataBar from "../../components/DataBar/DataBar";
import ToDoList from "../../components/ToDoList/ToDoList";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import ProfileResume from "../../components/ProfileResume/ProfileResume";
import { HomeIcon } from '../../components/icons'

import NoteSection from "../../components/NoteSection/NoteSection";

const PatientHome = () => {

    return ( 
        <div className=" m-4">
            <div className='inline-flex items-center justify-center mb-4 pl-1 '>
                <HomeIcon/>
                <p className='text-neutrals800 font-semibold ml-2'>Inicio</p>
            </div>
            <div>

              <DataBar isPatient/>
              <div className="flex w-[95%] flex-row mt-4 mx-4 gap-8 justify-between">
                  <div className=" flex-col gap-[38px] inline-flex justify-start">
                      {/*<div className="inline-flex justify-around mx-4">
                          <ButtonSoft text="Medicamentos"  onClick={()=>setOpenMedicacion(true)}/>
                          <ButtonSoft text="Estudios" onClick={()=>setOpenResults(true)}/>
                          <ButtonSoft text="Consultas Médicas"/>
                      </div>*/}
                      <div className="flex justify-center">
                          <ToDoList/>
                      </div>
                     
                    <NoteSection /> 
                  </div>
                  <div className="">
                      <ProfileResume isPatient/>
                  </div>
              </div>

            </div>
            
              <ConfirmModal 
                message="¿Esta seguro que desea eliminar esta nota?"
                currentType="ModalRemoveNote"
              />
            
    </div>
  );
};

export default PatientHome;
