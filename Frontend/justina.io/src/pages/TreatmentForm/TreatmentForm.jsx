import ProfileResume from "../../components/ProfileResume/ProfileResume"
import TextAreaInput from "../../components/TextAreaInput/TextAreaInput"
import FormInput from "../../components/FormInput/FormInput"

import Doctor from '../../assets/imgs/doctor.png'
import calendar from "../../assets/icons/calendar.svg"


const TreatmentForm = () => {
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
        <>
        <section className="flex gap-6 pl-6 pb-6 w-full">
                <div className="w-1/3 pt-16">                
                    <ProfileResume patients={patients}/>
                </div>
                <div className="w-full">
                    <h2 className="text-neutrals800 font-bold text-titulo pl-6">Tratamiento Tipo 1</h2>
                    <form className="p-6 backdrop-blur bg-[rgba(253,239,244,0.2)] rounded-3xl flex flex-col gap-4 text-neutrals600">
                        <FormInput name='ID de Tratamiento *' type='text' placeholder='ID-Tratamiento' id='treatmentID'/>
                        <FormInput name='Tipo de Tratamiento *' type='text' placeholder='Completar tipo de tratamiento' id='treatmentType'/>
                        <FormInput name='Nombre de Tratamiento *' type='text' placeholder='Completar nombre de tratamiento' id='treatmentName'/>
                        <TextAreaInput name='Descripción del Tratamiento *' placeholder='Completar descripción' id='treatmentDescription'  height='h-[120px]'/>
                        <FormInput name='Fecha de Inicio del Tratamiento *' type='text' placeholder='Completar fecha de inicio' id='treatmentInitialDate' icon={calendar}/>
                        <FormInput name='Fecha de Fin del Tratamiento *' type='text' placeholder='Completar fecha de fin' id='treatmentFinalDate' icon={calendar}/>
                        <FormInput name='Nombre del Médico *' type='text' placeholder='Nombre Médico' id='doctorName'/>
                        <FormInput name='Especialidad *' type='text' placeholder='Especialidad del médico' id='doctorSpeciality'/>
                        <TextAreaInput name='Firma del Médico *' placeholder='Firma' id='doctorSignature'  height='h-[120px]'/>
                        <FormInput name='Receta *' type='text' placeholder='Receta' id='prescription'/>
                        <FormInput name='Frecuencia *' type='text' placeholder='Completar frecuencia' id='frequency' icon={calendar}/>
                        <button className="no-underline text-primary text-parrafo backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl shadow-custom w-40 py-2 self-end">Guardar</button>
                    </form>
                </div>
        </section>
        </>
    )
}

export default TreatmentForm