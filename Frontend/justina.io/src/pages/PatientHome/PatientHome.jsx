import { useState } from "react";

import DataBar from "../../components/DataBar/DataBar";
import ToDoList from "../../components/ToDoList/ToDoList";
import ModalMedicacion from "../../components/ModalMedicacion/ModalMedicacion";
import ProfileResume from "../../components/ProfileResume/ProfileResume";
import { HomeIcon } from '../../components/icons'


const PatientHome = () => {

    const [ openMedicacion, setOpenMedicacion ] = useState(false)
    

    const closeModal = () => {
        setOpenMedicacion(false);
    };

    return ( 
        <div className=" m-4">
            <div className='inline-flex items-center justify-center mb-4 pl-1 border-l-2 border-blue-900 border-opacity-55'>
                <HomeIcon/>
                <p className='text-neutrals800 font-semibold ml-2'>Inicio</p>
            </div>
            <div>


            <DataBar/>
            <div className="flex flex-row w-auto mt-4 mx-4 gap-8 justify-start">
                <div className=" flex-col gap-[38px] inline-flex justify-start">
                    {/*<div className="inline-flex justify-around mx-4">
                        <ButtonSoft text="Medicamentos"  onClick={()=>setOpenMedicacion(true)}/>
                        <ButtonSoft text="Estudios" onClick={()=>setOpenResults(true)}/>
                        <ButtonSoft text="Consultas Médicas"/>
                    </div>*/}
                    <div className="flex justify-center">
                        <ToDoList/>
                    </div>
                    
                </div>
                <div className="">
                    <ProfileResume isPatient/>
                </div>
            
          
            </div>

            { openMedicacion && (
                <ModalMedicacion closeModal={closeModal}/>
            )}
            </div>
        </div>
     );
}
 
export default PatientHome;