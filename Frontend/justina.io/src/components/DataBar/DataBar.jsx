import { useEffect, useState } from "react"
import api from "../../api/axios"

const DataBar = ({ patientIdentificationNumber, isPatient }) => {
    const [selectedPatient, setSelectedPatient] = useState(
        {bloodTypeDescription:'',
        diseases:[],
        drugs:[]
    }) 
    const fetchPatientData = async () => {      
        try { 
          const path = isPatient ? '/api/Patient/GetPatient' : `/api/Patient/GetPatientByCuil/${patientIdentificationNumber}`
          const response = await api.get(path)
          if (response.success) {
            setSelectedPatient({
              ...response.data,
            })
          } else {
            console.error('Error: ', response.message);
          }
        } catch (error) {
          console.error('Error fetching patient data:', error)
        }
    }  
    useEffect(() => {        
        if (patientIdentificationNumber || isPatient) {
          fetchPatientData()
        }        
    }, [])

    return ( 
    
        <>
        <div className="w-[95%] text-center items-center p-4 mx-2 inline-flex rounded-[32px] shadow-custom bg-[rgba(253,239,244,0.1)] backdrop-blur-[12px] justify-around">
            <div >
                <p className="text-neutrals800 text-subtitulo font-semibold">Enfermedad crónica</p>
                <p className="text-neutrals800 text-parrafo">{selectedPatient.diseases.map(a=>a.name).join(', ')}</p>
            </div>
            <div >
                <p className="text-neutrals800 text-subtitulo font-semibold">Medicación crónica</p>
                <p className="text-neutrals800 text-parrafo">{selectedPatient.drugs > 0 ? 'Si':'No'}</p>
            </div>
            <div>
                <p className="text-neutrals800 text-subtitulo font-semibold">Tipo Sanguineo</p>
                <p className="text-neutrals800 text-parrafo">{selectedPatient.bloodTypeDescription}</p>
            </div>
           
        </div>
        </> 
    
    );
}
 
export default DataBar;