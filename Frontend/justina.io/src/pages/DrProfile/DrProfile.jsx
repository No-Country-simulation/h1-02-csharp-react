import { useEffect, useRef, useState } from "react"
import TextAreaInput from "../../components/TextAreaInput/TextAreaInput"
import FormInput from "../../components/FormInput/FormInput"
import api from "../../api/axios"
import editIcon from "../../assets/icons/editIcon.svg"

const DrProfile = () => {
    const [drProfileInfo, setDrProfileInfo] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    identificationTypeDescription: "",
    identificationNumber: "",
    email: "",
    phoneNumber: "",
    localRegistrationNumber: "",
    nationalRegistrationNumber: "",
    specialities: []
    })  
    const [profileChanges,setProfileChanges] = useState({    
        phoneNumber: "",
        currentPassword: "",
        newPassword: ""        
    })
    const [isEditable, setIsEditable] = useState({
        phoneNumber: false,
        currentPassword: false
    })
    const phoneNumberRef = useRef(null)
    const currentPasswordRef = useRef(null)
    
    const handleEditClick = (field) => {
        setIsEditable((prev) => ({
            ...prev,
            [field]: !prev[field]
        }))
        if (field === "phoneNumber" && phoneNumberRef.current) {
            phoneNumberRef.current.focus()
        } else if (field === "currentPassword" && currentPasswordRef.current) {
            currentPasswordRef.current.focus()
        }
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProfileChanges((prev) => ({
            ...prev,
            [id]: value
        }))
    }

    const fetchDrProfileData = async () => {      
        try {          
            const response = await api.get('/api/HealthCareProviders/profile')            
            console.log(response.data)
            if (response.success) {
                setDrProfileInfo(response.data)
            } else {
            console.error('Error: ', response.message);
            }
        } catch (error) {
            console.error('Error fetching medical center data:', error)
        }
    }

    const handleChangesSubmit = async () => {
        const changesToSubmit = {
            phoneNumber: profileChanges.phoneNumber || drProfileInfo.phoneNumber,
            currentPassword: profileChanges.currentPassword,
            newPassword: profileChanges.newPassword
        }
        console.log('changestosubmit',changesToSubmit)
        console.log('profilechanges',profileChanges)
        try {
            const response = await api.patch('/api/HealthCareProviders/profile/contact-info', changesToSubmit)
            alert('Cambios realizados con éxito!',response)  
            setIsEditable({
                phoneNumber: false,
                currentPassword: false
            })   
            setProfileChanges({    
                phoneNumber: "",
                currentPassword: "",
                newPassword: ""        
            })
            fetchDrProfileData()
        } catch (error) {
            console.error('Error updating profile:', error)
        }
    }

    useEffect(() => { 
        fetchDrProfileData()        
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
    
        return `${day}/${month}/${year}`
    }
    return ( 
        <div className="p-4">
            <p className="text-primary text-titulopag text-start font-semibold p-3">Perfil</p>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 bg-[rgba(253,239,244,0.1)] rounded-3xl py-2 px-4 mb-4 shadow-custom flex flex-col gap-2">
                    <p className="text-neutrals800 text-subtitulo text-start font-semibold py-2">Datos Personales</p>
                    <FormInput name='Nombre Completo' type='text' id='name' value={drProfileInfo.firstName+ ' ' + drProfileInfo.lastName} placeholder='Nombre incompleto' readOnly/>
                    <FormInput name='Fecha de Nacimiento' type='text' id='birthDate' value={formatDate(drProfileInfo.birthDate)} placeholder='Fecha incompleta' readOnly/> 
                    <FormInput name='Email' type='text' id='email' value={drProfileInfo.email} placeholder='Email incompleto' readOnly/> 
                    <div className="flex items-center gap-4">
                        <FormInput name='Teléfono' type='tel' id='phoneNumber' value={isEditable.phoneNumber ? profileChanges.phoneNumber : drProfileInfo.phoneNumber}placeholder='Teléfono incompleto' readOnly={!isEditable.phoneNumber} onChange={handleChange} inputRef={phoneNumberRef} inputStyle={isEditable.phoneNumber && "border-2 border-secondary"}/>
                        <button className="w-10 h-10 p-2 shadow-custom rounded-full mt-6 hover:shadow-none" onClick={() => handleEditClick('phoneNumber')}><img src={editIcon} alt='icono edición'/></button>                            
                    </div>
                    <div className="flex items-center gap-4">
                        <FormInput name='Contraseña Actual' type='text' id='currentPassword' value={profileChanges.currentPassword || ''} placeholder='********' readOnly={!isEditable.currentPassword} onChange={handleChange} inputRef={currentPasswordRef} inputStyle={isEditable.currentPassword && "border-2 border-secondary"}/> 
                        <button className="w-10 h-10 p-2 shadow-custom rounded-full mt-6 hover:shadow-none" onClick={() => handleEditClick('currentPassword')}><img src={editIcon} alt='icono edición'/></button>                           
                    </div>
                    {isEditable.currentPassword && <FormInput name='Nueva Contraseña' type='text' id='newPassword' value={profileChanges.newPassword || ''} placeholder='Nueva contraseña' readOnly={!isEditable.currentPassword} onChange={handleChange} inputRef={currentPasswordRef} inputStyle={isEditable.currentPassword && "border-2 border-secondary"}/>}
                    {(isEditable.currentPassword || isEditable.phoneNumber) &&
                    <button onClick={handleChangesSubmit} className='h-10 flex justify-between items-center border gap-2 rounded-[32px] bg-[rgba(253,239,244,0.4)] shadow-custom text-parrafo py-1 px-4 text-primary w-fit'>Guardar Cambios</button>}             
                </div>
                <div className="w-full md:w-1/2 bg-[rgba(253,239,244,0.1)] rounded-3xl py-2 px-4 mb-4 shadow-custom flex flex-col gap-2"> 
                    <p className="text-neutrals800 text-subtitulo text-start font-semibold">Perfil Profesional</p>
                    <FormInput name='CUIL' type='text' id='cuil' value={drProfileInfo.identificationNumber} placeholder='Cuil incompleto' readOnly/>
                    <TextAreaInput name='Especialidades' placeholder='Especialidades' id='specialities' value={drProfileInfo.specialities.join(', ')} height='h-[90px]' readOnly />                        
                    <FormInput name='Matrícula Provincial' type='text' id='localRegistrationNumber' value={drProfileInfo.localRegistrationNumber} placeholder='Matrícula incompleta' readOnly/>
                    <FormInput name='Matrícula Nacional' type='text' id='nationalRegistrationNumber' value={drProfileInfo.nationalRegistrationNumber} placeholder='Matrícula incompleta' readOnly/>
                </div>
            </div>
            
        </div>        
    )
}
 
export default DrProfile