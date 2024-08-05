import { useEffect, useState } from "react"
import AddRecordModal from "../../components/RecordDetail/AddRecordModal"
import DrHomeSearchBar from "../../components/DrHomeSearchbar/DrHomeSearchBar"
import MedicalResultsModal from "../../components/MedicalResults/MedicalResultsModal"
import MedicalResults from "../../components/MedicalResults/MedicalResults"
import api from "../../api/axios"
import PatientsTable from "../../components/PatientsTable/PatientsTable"
import medicalStudies from '../../assets/imgs/medicalStudies.png'

const MedicalCenterRecords = () => {  
  const [isRecordModalOpen, setRecordModalOpen] = useState(false)
  const [isMedicalResultsModalOpen, setMedicalResultsModalOpen] = useState(false)
  const [medicalResults, setMedicalResults] = useState([])
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)

  const openRecordModal = () => setRecordModalOpen(true)
  const closeRecordModal = () => setRecordModalOpen(false)  
  const openMedicalResultsModal = () => setMedicalResultsModalOpen(true)
  const closeMedicalResultsModal = () => setMedicalResultsModalOpen(false)

  const handleAddRecordClick = (patient) => {
    setSelectedPatient(patient)
    openRecordModal()
  }

  const fetchAllPatients = async () => {      
    try { 
      const response = await api.get('/api/Patient/GetAllPatients')
      console.log(response.data)
      if (response.success) {          
        setPatients([
          ...response.data          
        ])
      } else {
        console.error('Error: ', response.message);
      }
    } catch (error) {
      console.error('Error fetching medical results:', error)
    }
  }
  const fetchAllMedicalResults = async () => {      
    try { 
      const response = await api.get('/api/MedicalTests/GetAllByMedicalCenter')
      if (response.success) {          
        setMedicalResults([
          ...response.data          
        ])
      } else {
        console.error('Error: ', response.message);
      }
    } catch (error) {
      console.error('Error fetching medical results:', error)
    }
  }

  useEffect(() => {
    fetchAllPatients ()
    fetchAllMedicalResults ()    
  }, [])  

  return (
    <>
      <section className="flex flex-col gap-4 p-8 w-full justify-center items-center">
        <div className="flex w-full items-center justify-center gap-8">       
          <div className="flex flex-col justify-center items-center gap-y-3 w-1/2 max-w-[768px]">
            <h2 className="text-neutrals600 font-bold">Busca un paciente *</h2>
            <DrHomeSearchBar />          
          </div>
          <div className="w-1/4">
            <MedicalResults                    
              title="Resultados Médicos"
              image={medicalStudies} 
              onClick={openMedicalResultsModal}                                                   
            />
          </div>
        </div>
        <PatientsTable patients={patients} onAddRecordClick={handleAddRecordClick}/>       
      </section>
      <AddRecordModal isOpen={isRecordModalOpen} onClose={closeRecordModal} patient={selectedPatient}/> 
      <MedicalResultsModal isOpen={isMedicalResultsModalOpen} onClose={closeMedicalResultsModal} medicalResults={medicalResults} patients={patients}/>
    </>
  )
}

export default MedicalCenterRecords