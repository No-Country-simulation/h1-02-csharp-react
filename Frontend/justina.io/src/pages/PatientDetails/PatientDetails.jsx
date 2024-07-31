import ProfileResume from "../../components/ProfileResume/ProfileResume"
import RecordDetail from "../../components/RecordDetail/RecordDetail"
import MedicalResults from "../../components/MedicalResults/MedicalResults"
import RecordsList from "../../components/RecordsList/RecordsList"

import medicalStudies from '../../assets/imgs/medicalStudies.png'
import medicalStudiesIcon from "../../assets/icons/medicalStudiesIcon.svg"

import { useState } from "react"

const PatientDetails = () => {       
    const Records = [
        {
            title:'Seguimiento Esguince Tobillo',
            description:'El paciente demuestra un gran progreso luego de su quinta sesión de kinesiología. Le quedan 5 sesiones más. Hay altas probabilidades de agregar más sesiones al tratamiento.',
            patology:'Esguince de tobillo grado 2',
            date:'27/07/2024',
            medicalCenter:'Clínica Olivos',
            doctor:'Juan Perez'
        },{
            title:'Seguimiento Esguince Rodilla',
            description:'El paciente demuestra un gran progreso luego de su quinta sesión de kinesiología. Le quedan 5 sesiones más. Hay altas probabilidades de agregar más sesiones al tratamiento.',
            patology:'Esguince de rodilla grado 1',
            date:'25/07/2024',
            medicalCenter:'Sanatorio Trinidad',
            doctor:'Esteban García'
        },{
            title:'Seguimiento Esguince Tobillo',
            description:'El paciente demuestra un gran progreso luego de su quinta sesión de kinesiología. Le quedan 5 sesiones más. Hay altas probabilidades de agregar más sesiones al tratamiento.',
            patology:'Esguince de tobillo grado 2',
            date:'27/07/2024',
            medicalCenter:'Clínica Olivos',
            doctor:'Juan Perez'
        },{
            title:'Seguimiento Esguince Tobillo',
            description:'El paciente demuestra un gran progreso luego de su quinta sesión de kinesiología. Le quedan 5 sesiones más. Hay altas probabilidades de agregar más sesiones al tratamiento.',
            patology:'Esguince de tobillo grado 2',
            date:'27/07/2024',
            medicalCenter:'Clínica Olivos',
            doctor:'Juan Perez'
        },{
            title:'Seguimiento Esguince Tobillo',
            description:'El paciente demuestra un gran progreso luego de su quinta sesión de kinesiología. Le quedan 5 sesiones más. Hay altas probabilidades de agregar más sesiones al tratamiento.',
            patology:'Esguince de tobillo grado 2',
            date:'27/07/2024',
            medicalCenter:'Clínica Olivos',
            doctor:'Juan Perez'
        },{
            title:'Seguimiento Esguince Tobillo',
            description:'El paciente demuestra un gran progreso luego de su quinta sesión de kinesiología. Le quedan 5 sesiones más. Hay altas probabilidades de agregar más sesiones al tratamiento.',
            patology:'Esguince de tobillo grado 2',
            date:'27/07/2024',
            medicalCenter:'Clínica Olivos',
            doctor:'Juan Perez'
        }
    ]
    const [selectedRecord, setSelectedRecord] = useState(null);
    return (
        <>            
            <section className="flex gap-4 p-3 pl-6 w-full">
                <div className="w-1/4">                
                    <ProfileResume />
                </div>
                <div className="flex flex-col w-3/4 gap-4">
                    <div className="flex gap-4">
                        <div className="flex flex-col items-start gap-4 w-2/3 max-h-20">                           
                            <RecordsList 
                                title="Últimas Consultas Médicas"
                                items={Records}
                                itemClicked={setSelectedRecord}
                            />
                        </div>   
                        <div className="w-1/3 flex flex-col gap-4">                        
                                <MedicalResults                    
                                    title="Resultados Médicos"
                                    icon={medicalStudiesIcon}
                                    image={medicalStudies}
                                />                 
                        </div>
                    </div>
                    <div>
                        <RecordDetail
                            item={selectedRecord}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default PatientDetails