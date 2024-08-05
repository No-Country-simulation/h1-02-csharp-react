import { useEffect, useState } from 'react'
import closeIcon from '../../assets/icons/closeIcon.svg'
import RecordDetail from './RecordDetail'
import api from '../../api/axios'

const AddRecordModal = ({ isOpen, onClose, patient }) => { 
    const [medicalCenterInfo, setMedicalCenterInfo] = useState({        
        healthCareProviders: []
    })
    const [pathologiesList, setPathologiesList] = useState([])   

    const handleClose = () => onClose()
    let userStore = localStorage.getItem("userStore") ? JSON.parse(localStorage.getItem("userStore")) : undefined
    const medicalCenterId= userStore ? userStore.state.user.id: null

    const fetchMedicalCenterData = async () => {      
      try { 
        const response = await api.get(`/api/MedicalCenters/${medicalCenterId}`)
        if (response.success) {
            console.log(response.data)
            setMedicalCenterInfo(response.data)
        } else {
          console.error('Error: ', response.message);
        }
      } catch (error) {
        console.error('Error fetching medical center info:', error)
      }
    }
    const fetchPathologyList = async () => {      
      try { 
        const response = await api.get('/api/Pathologies')
        if (response.success) {
            console.log(response.data)
            setPathologiesList(response.data)
        } else {
          console.error('Error: ', response.message);
        }
      } catch (error) {
        console.error('Error fetching pathologies list:', error)
      }
    }

    useEffect(() => {
        fetchPathologyList()          
        if (medicalCenterId) {
            fetchMedicalCenterData()
        }
      }, [])

    return (
        <div className={`${isOpen ? "fixed" : "hidden"} inset-0 z-50 flex items-center justify-center`}>
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleClose}></div>
            <div className="relative shadow-lg no-underline text-neutrals800 backdrop-blur bg-[rgba(253,239,244,0.5)] rounded-3xl w-1/2">                
              <button onClick={handleClose} className="absolute top-3 right-3 text-neutrals600 z-50"><img src={closeIcon}/></button>
              <div>                            
                <RecordDetail isEditMode medicalCenterInfo={medicalCenterInfo} pathologiesList={pathologiesList} patient={patient}/>
              </div>
            </div>
        </div>
    )
}

export default AddRecordModal