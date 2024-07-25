import ExpandableList from "../../components/ExpandableList/ExpandableList"
import ProfileResume from "../../components/ProfileResume/ProfileResume"
import ShortcutBtn from "../../components/ShortcutBtn/ShortcutBtn"

import Avatar2 from '../../assets/imgs/medico.png'
import Doctor from '../../assets/imgs/doctor.png'
import BloodTest from '../../assets/imgs/bloodtest.png'
import VitalSigns from '../../assets/imgs/vitalsigns.png'
import graf1 from '../../assets/imgs/graf1.png'
import graf2 from '../../assets/imgs/graf2.png'
import graf3 from '../../assets/imgs/graf3.png'
import graf4 from '../../assets/imgs/graf4.png'

import chevronDown from "../../assets/icons/chevronDown.svg"
import bandAidIcon from "../../assets/icons/bandAidIcon.svg"
import pillIcon from "../../assets/icons/pillIcon.svg"
import prescriptionIcon from "../../assets/icons/prescriptionIcon.svg"
import priorityIcon from "../../assets/icons/priorityicon.svg"

import Layout from "../../layouts/Layout";

const PatientDetails = () => {
    const doctors = [
        { id: 1, name: 'Doctor 1', photo: Avatar2 },
        { id: 2, name: 'Doctor 2', photo: Avatar2 },
        { id: 3, name: 'Doctor 3', photo: Avatar2 },
        { id: 4, name: 'Doctor 4', photo: Avatar2 },
        { id: 5, name: 'Doctor 5', photo: Avatar2 },
    ]
    const renderDoctorCollapsed = (doctor) => (
        <div>
          <img src={doctor.photo} alt={doctor.name} className="w-10 h-10 rounded-full hover:shadow-custom" />
        </div>
    ) 
    const renderDoctorExpanded = (doctor) => (
        <div onClick={() => handleDetailClick(doctor)} className="flex items-center group backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl p-2 cursor-pointer">
          <img src={doctor.photo} alt={doctor.name} className="w-10 h-10 rounded-full" />
          <div className="flex items-center flex-grow justify-end group-hover:justify-center pl-2">
            <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-[-20%]">{doctor.name}</span>
            <button className="flex items-center justify-center w-6 h-6 rounded-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><img src={chevronDown} /></button>
          </div>
        </div>
    )
    const handleDetailClick = (doctor) => {        
        console.log("Detalle del paciente:", doctor)
    }

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
            <section className="px-6 flex gap-6 w-full">
                <button className="flex flex-col items-center bg-[rgba(214,86,131,0.2)] backdrop-blur rounded-3xl py-1 px-10 mb-4 shadow-custom text-neutrals800 text-titulopag font-bold">Prioridad <img src={priorityIcon} className="bg-[rgba(253,239,244,.4)] py-1 px-2 rounded-full w-11 h-8"/><span className="text-subtitulo">Alta</span></button>
                <div className="flex bg-[rgba(253,239,244,0.1)] backdrop-blur rounded-3xl shadow-custom px-8 py-3 justify-center gap-4 h-fit">
                    <img src={graf1} className="w-52 h-20 pt-4"/>
                    <img src={graf2} className="w-52 h-20 pt-4"/>
                    <img src={graf3} className="w-52 h-20"/>
                    <img src={graf4} className="w-52 h-20"/>
                </div>
            </section>
            <section className="flex gap-4 p-3 pl-6 w-full">
                <div className="w-1/4">                
                    <ProfileResume patients={patients}/>
                </div>
                <div className="flex flex-col items-start gap-4 w-2/5">
                    <h3 className="text-primary text-parrafo">Gráfico de Signos Vitales</h3>
                    <img src={VitalSigns} className="w-full"/>
                    <h3 className="text-primary text-parrafo pt-2">Gráfico de Resultados de Laboratorio</h3>
                    <img src={BloodTest} className="w-full"/>
                </div>   
                <div className="w-1/3 flex flex-col gap-4">
                    <ShortcutBtn                    
                            title="Patologías"
                            icon={prescriptionIcon}
                            to="/patologyform"
                        />
                        <ShortcutBtn                    
                            title="Historia Clínica"
                            icon={bandAidIcon}
                            to="/medicalrecord"
                        />
                        <ShortcutBtn                    
                            title="Exámenes Médicos"
                            icon={pillIcon}
                        />
                        <ShortcutBtn                    
                            title="Tratamientos"
                            icon={pillIcon}
                            to="/treatmentform"
                        />
                        <ShortcutBtn                    
                            title="Prepagas"
                            icon={pillIcon}
                        />
                    <ExpandableList 
                        items={doctors}
                        title="Doctores Asignados"            
                        maxVisible={4} 
                        renderItemCollapsed={renderDoctorCollapsed} 
                        renderItemExpanded={renderDoctorExpanded} 
                    />
                </div>
            </section>
        </Layout>
    )
}

export default PatientDetails