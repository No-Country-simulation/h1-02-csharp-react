import ExpandableList from "../../components/ExpandableList/ExpandableList"
import Avatar2 from '../../assets/medico.png'
import Statistics from "../../components/Statistics/Statistics"
import ShortcutBtn from "../../components/ShortcutBtn/ShortcutBtn"
import bandAidIcon from "../../assets/icons/bandAidIcon.svg"
import pillIcon from "../../assets/icons/pillIcon.svg"
import prescriptionIcon from "../../assets/icons/prescriptionIcon.svg"
import chevronDown from "../../assets/icons/chevronDown.svg"

const DrDashboard = () => {
    const patients = [
        { id: 1, name: 'Paciente 1', photo: Avatar2 },
        { id: 2, name: 'Paciente 2', photo: Avatar2 },
        { id: 3, name: 'Paciente 3', photo: Avatar2 },
        { id: 4, name: 'Paciente 4', photo: Avatar2 },
        { id: 5, name: 'Paciente 5', photo: Avatar2 },
    ]
      
    const renderPatientCollapsed = (patient) => (
        <div>
          <img src={patient.photo} alt={patient.name} className="w-10 h-10 rounded-full" />
        </div>
    )
      
    const renderPatientExpanded = (patient) => (
        <div onClick={() => handleDetailClick(patient)} className="flex items-center group backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl p-2 cursor-pointer">
          <img src={patient.photo} alt={patient.name} className="w-10 h-10 rounded-full" />
          <div className="flex items-center flex-grow justify-end group-hover:justify-center pl-2">
            <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-[-20%]">{patient.name}</span>
            <button className="flex items-center justify-center w-6 h-6 rounded-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><img src={chevronDown} /></button>
          </div>
        </div>
    )
    
    const handleDetailClick = (patient) => {        
        console.log("Detalle del paciente:", patient)
    }

    return (
        <section className="flex justify-center ">
            <div className="py-16 px-3 w-1/3 flex flex-col items-center">
                <ExpandableList 
                    title="Últimos pacientes vistos"
                    items={patients}
                    maxVisible={4} 
                    renderItemCollapsed={renderPatientCollapsed} 
                    renderItemExpanded={renderPatientExpanded}  
                /> 
                <ExpandableList 
                    title="Próximas citas"
                    items={patients}
                    maxVisible={4} 
                    renderItemCollapsed={renderPatientCollapsed} 
                    renderItemExpanded={renderPatientExpanded}
                    bgColor='bg-[rgba(214,86,131,0.2)]'  
                />        
            </div>
            <div className="w-1/3">
                <Statistics/>
            </div>
            <div className="w-1/3 flex flex-col gap-4 items-center py-16 px-3">
                <ShortcutBtn                    
                    title="Registrar Recetas"
                    icon={prescriptionIcon}
                />
                <ShortcutBtn                    
                    title="Registrar Tratamientos"
                    icon={bandAidIcon}
                />
                <ShortcutBtn                    
                    title="Registrar Medicamentos"
                    icon={pillIcon}
                />
                <ExpandableList 
                    title="Doctores"
                    items={patients}
                    maxVisible={4} 
                    renderItemCollapsed={renderPatientCollapsed} 
                    renderItemExpanded={renderPatientExpanded}  
                    extended={true}
                />  
            </div>
        </section>
    )
}

export default DrDashboard