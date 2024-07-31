import { useEffect, useState } from 'react'
import FormInput from "../FormInput/FormInput"
import TextAreaInput from '../TextAreaInput/TextAreaInput'
import malePatientPhoto from '../../assets/imgs/malePatientPhoto.png'

const ProfileResume = ({ bgColor }) => {
  const [selectedPatient, setSelectedPatient] = useState({id: 'patient1',
    name: 'Paciente 1',
    image: malePatientPhoto,
    diagnosis: 'Diagnóstico 1',
    age: '30'})
  
  useEffect(() => {
    setSelectedPatient(
      {id: 'patient1',
      name: 'Paciente 1',
      image: malePatientPhoto,
      diagnosis: 'Diagnóstico 1',
      age: '30'})
  }, [])

  return (
    <div className={`backdrop-blur ${bgColor ? bgColor : 'bg-[rgba(253,239,244,0.1)]'} rounded-3xl py-6 px-4 w-full mb-4 shadow-custom text-neutrals600 flex flex-col gap-4`}>
      <FormInput name='Paciente *' type='text' placeholder='Nombre no encontrado' id='name' value={selectedPatient.name}/>
      <img src={selectedPatient.image} alt={selectedPatient.name} className="w-[181px] h-[154px] rounded-2xl self-center"/>   
      <TextAreaInput name='Diagnóstico *' placeholder='Completar diagnóstico' id='patology' value={selectedPatient.diagnosis} height='h-[90px]'/>
      <FormInput name='Identificación *' type='text' placeholder='Completar identificación' id='document' value={selectedPatient.id}/>
      <FormInput name='Edad *' type='text' placeholder='Completar edad' id='age' value={selectedPatient.age}/>
      <button className="no-underline text-primary text-parrafo backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl shadow-custom w-40 py-2 self-center">Ver más</button>
    </div>
  );
};

export default ProfileResume;
