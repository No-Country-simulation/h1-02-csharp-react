import { useState } from "react"
import RecordDetail from "../../components/RecordDetail/RecordDetail"
import AddRecordModal from "../../components/RecordDetail/AddRecordModal"
import RecordsList from "../../components/RecordsList/RecordsList"
import DrHomeSearchBar from "../../components/DrHomeSearchbar/DrHomeSearchBar"
import MedicalResults from "../../components/MedicalResults/MedicalResults"
import medicalStudies from '../../assets/imgs/medicalStudies.png'
import { HeartIcon } from "../../components/icons"

const Records = [
  {
    "id": "93e8484b-c01d-4c01-6dc6-08dcb3deb766",
    "title": "Seguimiento Esguince",
    "description": "El paciente demuestra un gran progreso luego de su quinta sesión de kinesiología. Le quedan 5 sesiones más. Hay altas probabilidades de agregar más sesiones al tratamiento.",
    "createdDate": "2024-08-01T17:05:23.152",
    "pathologyDescription": "Esguince de tobillo grado 2",
    "medicalCenterName": "OSDE",
    "healthCareProviderName": "Dr",
    "healthCareProviderLastName": "Prueba"
  },
  {
    "id": "0d09d6b7-0852-4eaa-6dc7-08dcb3deb766",
    "title": "Seguimiento Esguince 2",
    "description": "El paciente demuestra un gran progreso luego de su quinta sesión de kinesiología. Le quedan 5 sesiones más. Hay altas probabilidades de agregar más sesiones al tratamiento.",
    "createdDate": "2024-08-03T17:05:23.152",
    "pathologyDescription": "Esguince de tobillo grado 2",
    "medicalCenterName": "OSDE",
    "healthCareProviderName": "Dr",
    "healthCareProviderLastName": "Prueba"
  },
  {
    "id": "953a29ec-771b-4360-6dc8-08dcb3deb766",
    "title": "Seguimiento Asma",
    "description": "El paciente demuestra un gran progreso pero sigue con problemas respiratorios a la hora de hacer deporte.",
    "createdDate": "2024-08-03T17:05:23.152",
    "pathologyDescription": "Asma",
    "medicalCenterName": "OSDE",
    "healthCareProviderName": "Dr",
    "healthCareProviderLastName": "Prueba"
  }
]
const MedicalCenterRecords = () => {
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [isRecordModalOpen, setRecordModalOpen] = useState(false)

  const openModal = () => setRecordModalOpen(true)
  const closeModal = () => setRecordModalOpen(false)

  return (
    <>
      <section className="flex flex-col gap-4 p-8 items-center"> 
        <div className="flex w-full gap-8">     
          <div className="w-2/3 flex flex-col gap-4">
            <div className="flex w-full justify-between">
              <div className="w-3/4 pr-4">
                <h2 className="text-parrafo text-neutrals600 font-bold pl-4">Buscar Record *</h2> 
                <DrHomeSearchBar />   
              </div> 
              <button className="flex justify-center items-center gap-2 text-primary font-normal bg-rose-o20 rounded-[32px] px-6 shadow-glass-effect my-2" onClick={openModal}>
                <HeartIcon /> Agregar Record
              </button>  
            </div>                      
            <RecordsList 
              title="Últimas Consultas Médicas"
              items={Records}
              itemClicked={setSelectedRecord}
            />
          </div>
          <div className="w-1/4 py-7">      
            <MedicalResults                    
              title="Resultados Médicos"
              image={medicalStudies}                                                    
            />  
          </div>
        </div>
        <RecordDetail
          item={selectedRecord}
        />  
      </section>
      <AddRecordModal isOpen={isRecordModalOpen} onClose={closeModal} /> 
    </>
  )
}

export default MedicalCenterRecords