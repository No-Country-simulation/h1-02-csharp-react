import FormInput from "../FormInput/FormInput"
import TextAreaInput from "../TextAreaInput/TextAreaInput"

import calendar from "../../assets/icons/calendar.svg"
import profile from "../../assets/icons/profileIcon.svg"

const RecordDetail = ({ item }) => {
  if (!item) {
    return <div className='backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl py-2 px-6 w-full mb-4 shadow-custom text-neutrals800 flex flex-col items-center gap-2'>
      <h2 className="py-2 font-semibold text-subtitulo">Selecciona un registro para ver los detalles</h2>
    </div>
  }
  return (
    <div className='backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl py-2 px-6 w-full mb-4 shadow-custom text-neutrals800 flex flex-col items-center gap-2'>
        <h2 className="py-2 font-semibold text-subtitulo">Resumen Consulta Médica</h2>
        <div className="w-1/2 self-end">
            <FormInput name='Fecha *' type='text' placeholder='Fecha Incompleta' id='recordDate' icon={calendar} labelStyle='text-end' value={item.date}/>
            <FormInput name='Nombre del Médico *' type='text' placeholder='Nombre Incompleto' id='drName' icon={profile} labelStyle='text-end' value={item.doctor}/>
        </div>        
        <FormInput name='Patología *' type='text' placeholder='Patología Incompleta' id='patology' value={item.patology}/>
        <TextAreaInput name='Descripción *' placeholder='Descripción Incompleta' id='recordDescription' height='h-[120px]' value={item.description}/>        
        <FormInput name='Centro Médico *' type='text' placeholder='Centro Médico Incompleto' id='medicalCenter' value={item.medicalCenter}/>  
                
                           
    </div>
  )
}

export default RecordDetail