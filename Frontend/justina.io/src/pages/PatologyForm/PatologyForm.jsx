import FormInput from "../../components/FormInput/FormInput"
import ProfileResume from "../../components/ProfileResume/ProfileResume"
import TextAreaInput from "../../components/TextAreaInput/TextAreaInput"

import Doctor from '../../assets/imgs/doctor.png'
import calendar from "../../assets/icons/calendar.svg"
import hearthIcon from "../../assets/icons/hearthIcon.svg"

import Layout from "../../layouts/Layout";

const PatologyForm = () => {
    const patients = [
        {
            id: 'patient1',
            name: 'Paciente 1',
            image: Doctor,
            diagnosis: 'Diagnóstico 1',
            age: '30',
        },
        {
            id: 'patient2',
            name: 'Paciente 2',
            image: Doctor,
            diagnosis: 'Diagnóstico 2',
            age: '40',
        },
        {
            id: 'patient3',
            name: 'Paciente 3',
            image: Doctor,
            diagnosis: 'Diagnóstico 3',
            age: '35',
          },
    ]
    return (
        <Layout>


        <section className="flex gap-6 pl-6 pb-6 w-full">
                <div className="w-1/3 pt-16">                
                    <ProfileResume patients={patients}/>
                </div>
                <div className="w-full">
                    <h2 className="text-neutrals800 font-bold text-titulo pl-6">Patología</h2>
                    <form className="p-6 backdrop-blur bg-[rgba(253,239,244,0.2)] rounded-3xl flex flex-col gap-4 text-neutrals600">
                        <FormInput name='Fecha actual del diagnóstico *' type='text' placeholder='Completar fecha' id='date' icon={calendar}/>
                        <FormInput name='Severidad *' type='text' placeholder='Completar severidad' id='severity'/>
                        <FormInput name='Etapa *' type='text' placeholder='Completar etapa' id='stage'/>
                        <FormInput name='Precauciones *' type='text' placeholder='Completar precauciones' id='precautions'/>
                        <img src={hearthIcon} className="w-6 h-6 self-end"/>
                        <TextAreaInput name='Comorbilidades *' placeholder='Completar listado de comorbilidades' id='comorbidities'  height='h-[120px]'/>
                        <img src={hearthIcon} className="w-6 h-6 self-end"/>
                        <button className="no-underline text-primary text-parrafo backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl shadow-custom w-40 py-2 self-end">Guardar</button>
                    </form>
                </div>
        </section>

                    
        </Layout>
    )
}

export default PatologyForm