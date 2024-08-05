import { useEffect, useState } from 'react'
import FormInput from "../../components/FormInput/FormInput";
import TextAreaInput from "../../components/TextAreaInput/TextAreaInput";
import malePatientPhoto from '../../assets/imgs/malePatientPhoto.png'
import api from '../../api/axios'
import ProfileResume from '../../components/ProfileResume/ProfileResume'
import { PatientsIcon } from '../../components/icons'


const PatientProfile = () => {

   
    return ( 

        <div className='m-4'>
            <div className='inline-flex items-center justify-center mb-4 pl-1 border-l-2 border-orange-500 border-opacity-55'>
                <PatientsIcon/>
                <p className='text-neutrals800 font-semibold ml-2'>Perfil</p>
            </div>
            
            <ProfileResume isPatient/>
        {/*<div className='backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl py-6 px-4 w-full mb-4 shadow-custom text-neutrals600 flex flex-col gap-4'>
            <FormInput name='Paciente *' type='text' placeholder='Nombre no encontrado' id='name' value={selectedPatient.firstName + ' ' + selectedPatient.lastName} readOnly/>
            <img src={selectedPatient.image} alt={selectedPatient.firstName + ' ' + selectedPatient.lastName} className="w-[181px] h-[154px] rounded-2xl self-center"/>   
            <FormInput name='Identificación *' type='text' placeholder='Completar identificación' id='document' value={selectedPatient.identificationNumber} readOnly/>
                <FormInput name='Email *' type='text' placeholder='Completar email' id='email' value={selectedPatient.email} readOnly />
                <FormInput name='Teléfono *' type='text' placeholder='Completar teléfono' id='phoneNumber' value={selectedPatient.phoneNumber} readOnly />
                <FormInput name='Fecha de nacimiento *' type='text' placeholder='Completar fecha de nacimiento' id='birthDate' value={selectedPatient.birthDate} readOnly />
                <FormInput name='Tipo de sangre *' type='text' placeholder='Completar tipo de sangre' id='bloodTypeDescription' value={selectedPatient.bloodTypeDescription} readOnly />          
                <FormInput name='Peso *' type='text' placeholder='Completar peso' id='weight' value={selectedPatient.weight || ''} readOnly />
                <TextAreaInput name='Alergias *' placeholder='Completar alergias' id='allergies' value={selectedPatient.allergies.map(a => a.name).join(', ')} height='h-[90px]' readOnly />
                <TextAreaInput name='Enfermedades *' placeholder='Completar enfermedades' id='diseases' value={selectedPatient.diseases.map(d => d.name).join(', ')} height='h-[90px]' readOnly />
                <TextAreaInput name='Medicamentos *' placeholder='Completar medicamentos' id='drugs' value={selectedPatient.drugs.map(d => d.name).join(', ')} height='h-[90px]' readOnly />
             
            <button className="no-underline text-primary text-parrafo backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl shadow-custom w-40 py-2 self-center">
                Guardar
            </button>
            </div>
        */}
        </div>
     );
}
 
export default PatientProfile;