import { useState } from 'react'
import FormInput from "../FormInput/FormInput"
import TextAreaInput from '../TextAreaInput/TextAreaInput';

const ProfileResume = ({ bgColor, patients }) => {
  const [selectedPatient, setSelectedPatient] = useState(patients[0])

  const handlePatientChange = (e) => {
    const selected = patients.find(patient => patient.id === e.target.value)
    setSelectedPatient(selected);
  }

  return (
    <div className={`backdrop-blur ${bgColor ? bgColor : 'bg-[rgba(253,239,244,0.1)]'} rounded-3xl py-6 px-4 w-full mb-4 shadow-custom text-neutrals600 flex flex-col gap-4`}>
      <div>
        <label htmlFor="patients" className="block mb-2 text-parrafo font-bold text-neutrals600">Paciente *</label>
        <select id="patients" onChange={handlePatientChange} className="backdrop-blur bg-[rgba(253,239,244,0.1)] inner-shadow-custom text-neutrals600 text-parrafo rounded-full block w-full p-2.5 outline-none">
          {patients.map(patient => (
            <option key={patient.id} value={patient.id} className='bg-[rgba(165,165,165,.2)] text-neutrals600 text-parrafo'>{patient.name}</option>
          ))}
        </select>
      </div>
      <img src={selectedPatient.image} alt={selectedPatient.name} className="w-[181px] h-[154px] rounded-2xl self-center"/>   
      <TextAreaInput name='Diagnóstico *' placeholder='Completar diagnóstico' id='patology' value={selectedPatient.diagnosis} height='h-[90px]'/>
      <FormInput name='Identificación *' type='text' placeholder='Completar identificación' id='document' value={selectedPatient.id}/>
      <FormInput name='Edad *' type='text' placeholder='Completar edad' id='age' value={selectedPatient.age}/>
      <button className="no-underline text-primary text-parrafo backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl shadow-custom w-40 py-2 self-center">Ver más</button>
    </div>
  );
};

export default ProfileResume;
