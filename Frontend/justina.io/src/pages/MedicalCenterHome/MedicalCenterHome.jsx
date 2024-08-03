import { useState } from "react"
import FormInput from "../../components/FormInput/FormInput"
import medicalCenterImg from '../../assets/imgs/medicalCenterImg.png'

const MedicalCenterHome = () => {
  const [medicalCenter, _setMedicalCenter] = useState(
    {id: 'medicalCenter1',
    name: 'Clínica',
    image: medicalCenterImg,
    email: 'mail@gmail.com',
    cuit: '30213847815',
    phone: '12345678'}
  )  
  return (
    <section className="p-4 flex justify-center"> 
      <div className='backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl py-4 px-6 w-11/12 shadow-custom flex flex-col gap-4'>
        <div className="flex gap-4">
          <img src={medicalCenter.image} alt={medicalCenter.name} className="w-[181px] h-[154px] rounded-2xl self-center"/>
          <div className="flex flex-col w-full"> 
            <FormInput name='Centro Médico *' type='text' placeholder='Nombre no encontrado' id='name' value={medicalCenter.name} readOnly={'true'}/>
            <FormInput name='CUIT *' type='text' placeholder='CUIT no encontrado' id='cuit' value={medicalCenter.cuit} readOnly={'true'}/>
          </div>         
        </div>        
        <FormInput name='Email *' type='text' placeholder='Email no encontrado' id='email' value={medicalCenter.email} readOnly={'true'}/>
        <FormInput name='Teléfono *' type='text' placeholder='Teléfono no encontrado' id='phone' value={medicalCenter.phone} readOnly={'true'}/>
      </div>
    </section>
  )
}

export default MedicalCenterHome;
