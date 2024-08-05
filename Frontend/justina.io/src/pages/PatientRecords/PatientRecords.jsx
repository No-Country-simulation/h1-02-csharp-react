import { useState } from "react"
import RecordDetail from "../../components/RecordDetail/RecordDetail"
import RecordsList from "../../components/RecordsList/RecordsList"
import { MedicalIcon } from '../../components/icons'

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

const PatientRecords = () => {
    const [selectedRecord, setSelectedRecord] = useState(null);
    
    return ( 
      
      <div className='m-4'>
        <div className='inline-flex items-center justify-center mb-4 pl-1 border-l-2 border-lime-700 border-opacity-55'>
            <MedicalIcon/>
            <p className='text-neutrals800 font-semibold ml-2'>Consultas Médicas</p>
        </div>
        <section className="flex flex-col gap-4 p-8 items-center">      
          <div className="w-2/3 flex flex-col gap-4">                      
            <RecordsList 
              title="Últimas Citas Médicas"
              items={Records}
              itemClicked={setSelectedRecord}
            />
          </div>
          <RecordDetail
            item={selectedRecord}
        />  
        </section>
      </div>
      
    );
}
 
export default PatientRecords;