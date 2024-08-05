import { useEffect, useState } from "react"
import FormInput from "../../components/FormInput/FormInput"
import medicalCenterImg from "../../assets/imgs/medicalCenterImg.png"
import api from "../../api/axios"

const MedicalCenterHome = () => {
  const [medicalCenter, setMedicalCenter] = useState({    
    name: "",
    image: medicalCenterImg,
    email: "",
    cuit: "",
    phoneNumber: "",
  })
  let userStore = localStorage.getItem("userStore") ? JSON.parse(localStorage.getItem("userStore")) : undefined
  const medicalCenterId = userStore ? userStore.state.user.id : null  

  useEffect(() => {
    const fetchPatientData = async () => {      
      try {          
        const response = await api.get(`/api/MedicalCenters/${medicalCenterId}`)
        if (response.success) {
          setMedicalCenter({
            ...response.data,
            image: medicalCenterImg            
          })
        } else {
          console.error('Error: ', response.message);
        }
      } catch (error) {
        console.error('Error fetching medical center data:', error)
      }
    }

    if (medicalCenterId) {
      fetchPatientData()
    }
  }, [medicalCenterId])
  
  return (
    <section className="p-4 flex justify-center"> 
      <div className='backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl py-4 px-6 w-11/12 shadow-custom flex flex-col gap-4'>
        <div className="flex gap-4">
          <img src={medicalCenter.image} alt={medicalCenter.name} className="w-[181px] h-[154px] rounded-2xl self-center"/>
          <div className="flex flex-col w-full"> 
            <FormInput name='Centro Médico *' type='text' placeholder='Nombre no encontrado' id='name' value={medicalCenter.name} readOnly/>
            <FormInput name='CUIT *' type='text' placeholder='CUIT no encontrado' id='cuit' value={medicalCenter.cuit} readOnly/>
          </div>         
        </div>        
        <FormInput name='Email *' type='text' placeholder='Email no encontrado' id='email' value={medicalCenter.email} readOnly/>
        <FormInput name='Teléfono *' type='text' placeholder='Teléfono no encontrado' id='phone' value={medicalCenter.phoneNumber} readOnly/>
      </div>
    </section>
  )
}

export default MedicalCenterHome
