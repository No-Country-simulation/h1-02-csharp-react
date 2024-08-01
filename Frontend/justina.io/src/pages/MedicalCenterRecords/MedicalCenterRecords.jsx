import { useState } from "react"
import RecordDetail from "../../components/RecordDetail/RecordDetail"
import RecordsList from "../../components/RecordsList/RecordsList"
import DrHomeSearchBar from "../../components/DrHomeSearchbar/DrHomeSearchBar"


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

const MedicalCenterRecords = () => {
  const [selectedRecord, setSelectedRecord] = useState(null)

  return (
    <section className="flex flex-col gap-4 p-8 items-center">      
      <div className="w-2/3 flex flex-col gap-4">
        <div>
          <h2 className="text-parrafo text-neutrals600 font-bold text-center">Buscar Record *</h2> 
          <DrHomeSearchBar />   
        </div>                        
        <RecordsList 
          title="Últimas Consultas Médicas"
          items={Records}
          itemClicked={setSelectedRecord}
        />
      </div>
      <RecordDetail
        item={selectedRecord}
      />  
    </section>
  )
}

export default MedicalCenterRecords