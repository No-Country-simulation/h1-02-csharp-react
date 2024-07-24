import ProfileResume from "../../components/ProfileResume/ProfileResume"
import ShortcutBtn from "../../components/ShortcutBtn/ShortcutBtn"

import Doctor from '../../assets/imgs/doctor.png'
import prescriptionIcon from "../../assets/icons/prescriptionIcon.svg"


const MedicalRecord = () => {
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
        <section className="flex gap-6 pl-6 pb-6 w-full">
                <div className="w-1/3 pt-16">                
                    <ProfileResume patients={patients}/>
                </div>
                <div className="w-full">
                    <h2 className="text-neutrals800 font-bold text-titulo pl-6">Historia Clínica</h2>
                    <div className="flex flex-col gap-8 p-1">
                        <ShortcutBtn                    
                        title="Historial Médico"
                        icon={prescriptionIcon}
                        />
                        <ShortcutBtn                    
                        title="Resultados de prueba de laboratorio"
                        icon={prescriptionIcon}
                        />
                        <ShortcutBtn                    
                        title="Información sobre la atención médica"
                        icon={prescriptionIcon}
                        />
                        <ShortcutBtn                    
                        title="Más información"
                        icon={prescriptionIcon}
                        />
                    </div>
                </div>
        </section>
  )
}

export default MedicalRecord