import ProfileResume from "../../components/ProfileResume/ProfileResume"
import RecordDetail from "../../components/RecordDetail/RecordDetail"
import MedicalResults from "../../components/MedicalResults/MedicalResults"
import RecordsList from "../../components/RecordsList/RecordsList"
import MedicalResultsModal from "../../components/MedicalResults/MedicalResultsModal"
import DataBar from "../../components/DataBar/DataBar"

import medicalStudies from '../../assets/imgs/medicalStudies.png'

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../api/axios"

const PatientDetails = () => {
    const { patientId, patientIdentificationNumber } = useParams()
    const [selectedRecord, setSelectedRecord] = useState(null)
    const [isModalOpen, setModalOpen] = useState(false)
    const [records, setRecords] = useState([])
    const [medicalResults, setMedicalResults] = useState([])

    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

    const fetchPatientData = async () => {      
      try { 
        const response = await api.get(`/api/Record/GetAllRecords/${patientId}`)
        if (response.success) {
          setRecords([
            ...response.data          
          ])
        } else {
          console.error('Error: ', response.message);
        }
      } catch (error) {
        console.error('Error fetching records data:', error)
      }
    }
    const fetchPatientMedicalResults = async () => {      
      try { 
        const response = await api.get(`/api/MedicalTests/GetAllByHealthCareProvider/${patientId}`)        
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
        if (patientId) {
          fetchPatientData()
          fetchPatientMedicalResults()
        }
      }, [patientId])
    
    return (
        <>            
            <section className="flex flex-col gap-4 py-3 px-6 w-full">
                <DataBar patientIdentificationNumber={patientIdentificationNumber}/>
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-1/4">                
                        <ProfileResume patientIdentificationNumber={patientIdentificationNumber}/>
                    </div>
                    <div className="flex flex-col lg:w-2/3 gap-4">
                        <div className="w-full flex flex-col lg:flex-row gap-4">
                            <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3">                        
                              <MedicalResults                    
                                title="Resultados Médicos"
                                image={medicalStudies}
                                onClick={openModal}
                              />
                            </div>
                            <div className="w-full lg:w-1/2 xl:w-2/3">
                              <RecordsList 
                                title="Últimas Consultas Médicas"
                                items={records}
                                itemClicked={setSelectedRecord}
                              />
                            </div>               
                        </div>
                        <div className="flex flex-col items-start gap-4 w-full max-h-20">
                            <RecordDetail
                                item={selectedRecord}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <MedicalResultsModal isOpen={isModalOpen} onClose={closeModal} medicalResults={medicalResults}/> 
        </>
    )
}

export default PatientDetails
