import FormInput from "../FormInput/FormInput"
import TextAreaInput from "../TextAreaInput/TextAreaInput"
import SelectList from "../SelectList/SelectList"

import { useEffect, useState } from "react"

import calendar from "../../assets/icons/calendar.svg"
import profile from "../../assets/icons/profileIcon.svg"
import api from "../../api/axios"

const RecordDetail = ({ item, isEditMode, medicalCenterInfo, pathologiesList }) => {
  const [selectedDrOption, setSelectedDrOption] = useState('')  
  const [selectedPathologyOption, setSelectedPathologyOption] = useState('')
  const [newRecord, setNewRecord] = useState({
    title:"",
    description: "",
    createdDate: "",
    medicalCenterCuit: "",
    patientIdentificationNumber: "",
    pathologyDescription: "",
    healthCareProviderIdentificationNumber: ""
  })

  useEffect(() => {
    if (isEditMode && medicalCenterInfo) {
      setNewRecord(prevState => ({
        ...prevState,
        medicalCenterCuit: medicalCenterInfo.cuit || '',
        createdDate: nowDate || ''
      }))
    }
  }, [])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setNewRecord((prevState) => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleSelectChange = (id, value) => {
    setNewRecord((prevState) => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleRecordSubmit = async () => {    
    try {
      const response = await api.post('/api/Record/AddRecords', [newRecord])
      if (response.success) {
          console.log(response.data)
          alert('Registro guardado')
          setNewRecord(prevState => ({
            ...prevState,
            title: "",
            description: "",
            createdDate: "",
            patientIdentificationNumber: "",
            pathologyDescription: "",
            healthCareProviderIdentificationNumber: ""
          }))
          setSelectedDrOption('')  
          setSelectedPathologyOption('')   
      } else {
        console.error('Error: ', response.message);
        alert('Error de respuesta')
      }
    } catch (error) {
      console.error('Error uploading new record:', error)
      alert('Error')
    }
  }
  
  const doctorOptions = [
    { id: '', value: '', label: 'Selecciona un médico' },
    ...(medicalCenterInfo?.healthCareProviders?.length > 0 ? 
      medicalCenterInfo.healthCareProviders.map(provider => ({
        id: provider.id,
        value: provider.identificationNumber,
        label: `${provider.firstName} ${provider.lastName} (${provider.identificationNumber})`
      })) : [])
  ]
  const pathologiesOptions = [
    { id: '', value: '', label: 'Selecciona una patología' },
    ...(pathologiesList?.length > 0 ? 
      pathologiesList.map(item => ({
        id: item.id,
        value: item.description,
        label: item.description
      })) : [])
  ]
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${day}/${month}/${year} - ${hours}:${minutes}hs`
  }
  const now = new Date()
  const nowDate = now.toISOString()  

  if (!item && !isEditMode) {
    return <div className='backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl py-2 px-6 w-full mb-4 shadow-custom text-neutrals800 flex flex-col items-center gap-2'>
      <h2 className="py-2 font-semibold text-subtitulo">Selecciona un registro para ver los detalles</h2>
    </div>
  }  

  return (
    <div className='backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl py-4 px-6 pb-8 w-full shadow-custom text-neutrals800 flex flex-col items-center gap-2'>
        <h2 className="py-2 font-semibold text-subtitulo">Resumen Consulta Médica</h2>
        <div className="w-1/2 self-end">
            <FormInput 
              name='Fecha *' 
              type='text' 
              placeholder='Fecha Incompleta' 
              id='createdDate' 
              icon={calendar} 
              labelStyle='text-end' 
              value={item ? formatDate(item.createdDate) : formatDate(nowDate)} 
              readOnly={!isEditMode}
            />
            { isEditMode ?
            <SelectList
              id="drselect"
              name="Seleccionar Médico"
              options={doctorOptions}
              value={selectedDrOption}
              onChange={(e) => {
                setSelectedDrOption(e.target.value)
                handleSelectChange('healthCareProviderIdentificationNumber', e.target.value)
              }}
            />
            :
            <FormInput 
              name='Nombre del Médico *' 
              type='text' 
              placeholder='Nombre Incompleto' 
              id='healthCareProviderName' 
              icon={profile} 
              labelStyle='text-end' 
              value={item ? item.healthCareProviderName + ' ' + item.healthCareProviderLastName : ''} 
              readOnly={!isEditMode}
            />
            }
        </div>
        { isEditMode ?
            <SelectList
              id="pathologyselect"
              name="Seleccionar Patología"
              options={pathologiesOptions}
              value={selectedPathologyOption}
              onChange={(e) => {
                setSelectedPathologyOption(e.target.value)
                handleSelectChange('pathologyDescription', e.target.value)
              }}
            />
            :
            <FormInput 
              name='Patología *' 
              type='text' 
              placeholder='Patología Incompleta' 
              id='pathologyDescription' 
              value={item ? item.pathologyDescription : ''} 
              readOnly={!isEditMode}
            />
        } 
        <FormInput 
          name='Título *' 
          type='text' 
          placeholder='Título Incompleto' 
          id='title' 
          value={item ? item.title : newRecord.title} 
          readOnly={!isEditMode}
          onChange={handleInputChange}
        /> 
        <TextAreaInput 
          name='Descripción *' 
          placeholder='Descripción Incompleta' 
          id='description' height='h-[120px]' 
          value={item ? item.description : newRecord.description}  
          readOnly={!isEditMode}
          onChange={handleInputChange}
        />  
        { isEditMode ?
          <>
            <FormInput 
              name='Cuil del Paciente *' 
              type='text' 
              placeholder='Cuil Incompleto' 
              id='patientIdentificationNumber' 
              value={item ? item.patientIdentificationNumber : newRecord.patientIdentificationNumber}               
              onChange={handleInputChange}
            /> 
            <button className="no-underline text-primary text-parrafo backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl shadow-custom w-40 py-2 self-center" onClick={handleRecordSubmit}>Guardar</button>
          </>
        :   
        <FormInput 
          name='Centro Médico *' 
          type='text' 
          placeholder='Centro Médico Incompleto' 
          id='medicalCenterName' 
          value={item ? item.medicalCenterName : (medicalCenterInfo? medicalCenterInfo.name : '')} 
          readOnly={!isEditMode}
        /> 
        }
    </div>
  )
}

export default RecordDetail