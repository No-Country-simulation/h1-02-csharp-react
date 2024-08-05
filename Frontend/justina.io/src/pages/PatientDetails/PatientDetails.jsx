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
    const { patientId } = useParams()
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
                <DataBar/>
                <div className="flex gap-4">
                    <div className="w-1/4">                
                        <ProfileResume />
                    </div>
                    <div className="flex flex-col w-3/4 gap-4">
                        <div className="flex gap-4">
                            <div className="flex flex-col items-start gap-4 w-2/3 max-h-20">                           
                                <RecordsList 
                                    title="Últimas Consultas Médicas"
                                    items={records}
                                    itemClicked={setSelectedRecord}
                                />
                            </div>   
                            <div className="w-1/3 flex flex-col gap-4">                        
                                    <MedicalResults                    
                                        title="Resultados Médicos"
                                        image={medicalStudies}
                                        onClick={openModal}
                                    />                 
                            </div>
                        </div>
                        <div>
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
