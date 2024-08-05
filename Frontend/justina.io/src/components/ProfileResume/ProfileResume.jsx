import { useEffect, useState } from 'react'
import FormInput from "../FormInput/FormInput"
import TextAreaInput from '../TextAreaInput/TextAreaInput'
import malePatientPhoto from '../../assets/imgs/malePatientPhoto.png'
import api from '../../api/axios'

const ProfileResume = ({ bgColor, patientIdentificationNumber, isPatient }) => {
  const [expanded, setExpanded] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(
    {applicationUserId: '',
    firstName: '',
    lastName: '',
    bloodTypeDescription:'',
    phoneNumber:'',
    email:'',
    birthDate:'',
    identificationNumber:'',
    weight:'',
    allergies:[],
    diseases:[],
    drugs:[],
    image: malePatientPhoto})    
  
  useEffect(() => {
    const fetchPatientData = async () => {      
      try { 
        const path = isPatient ? '/api/Patient/GetPatient' : `/api/Patient/GetPatientByCuil/${patientIdentificationNumber}`
        const response = await api.get(path)
        if (response.success) {
          setSelectedPatient({
            ...response.data,
            image: malePatientPhoto            
          })
        } else {
          console.error('Error: ', response.message);
        }
      } catch (error) {
        console.error('Error fetching patient data:', error)
      }
    }

    if (patientIdentificationNumber || isPatient) {
      fetchPatientData()
    }
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
}
 
  return (
    <div className={`backdrop-blur ${bgColor ? bgColor : 'bg-[rgba(253,239,244,0.1)]'} rounded-3xl py-6 px-4 w-full mb-4 shadow-custom text-neutrals600 flex flex-col gap-4`}>
      <FormInput name='Paciente *' type='text' placeholder='Nombre no encontrado' id='name' value={selectedPatient.firstName + ' ' + selectedPatient.lastName} readOnly/>
      <img src={selectedPatient.image} alt={selectedPatient.firstName + ' ' + selectedPatient.lastName} className="w-[181px] h-[154px] rounded-2xl self-center"/>   
      <FormInput name='Identificación *' type='text' placeholder='Completar identificación' id='document' value={selectedPatient.identificationNumber} readOnly/>
      {expanded && (
        <>
          <FormInput name='Email *' type='text' placeholder='Completar email' id='email' value={selectedPatient.email} readOnly />
          <FormInput name='Teléfono *' type='text' placeholder='Completar teléfono' id='phoneNumber' value={selectedPatient.phoneNumber} readOnly />
          <FormInput name='Fecha de nacimiento *' type='text' placeholder='Completar fecha de nacimiento' id='birthDate' value={formatDate(selectedPatient.birthDate)} readOnly />
          <FormInput name='Tipo de sangre *' type='text' placeholder='Completar tipo de sangre' id='bloodTypeDescription' value={selectedPatient.bloodTypeDescription} readOnly />          
          <FormInput name='Peso *' type='text' placeholder='Completar peso' id='weight' value={selectedPatient.weight || ''} readOnly />
          <TextAreaInput name='Alergias *' placeholder='Completar alergias' id='allergies' value={selectedPatient.allergies.map(a => a.name).join(', ')} height='h-[90px]' readOnly />
          <TextAreaInput name='Enfermedades *' placeholder='Completar enfermedades' id='diseases' value={selectedPatient.diseases.map(d => d.name).join(', ')} height='h-[90px]' readOnly />
          <TextAreaInput name='Medicamentos *' placeholder='Completar medicamentos' id='drugs' value={selectedPatient.drugs.map(d => d.description).join(', ')} height='h-[90px]' readOnly />
        </>
      )}
      <button className="no-underline text-primary text-parrafo backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl shadow-custom w-40 py-2 self-center" onClick={() => {setExpanded(!expanded)}}>{expanded? 'Ver menos' : 'Ver más'}</button>
    </div>
  )
}

export default ProfileResume;
