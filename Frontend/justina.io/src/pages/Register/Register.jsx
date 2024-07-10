import { useState } from "react"
import FormInput from "../../components/FormInput/FormInput"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [values, setValues] = useState({ 
        firstName: '', 
        lastName: '', 
        phoneNumber: '', 
        specialitiesIds: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'], 
        localRegistrationNumber: '', 
        nationalRegistrationNumber: '', 
        email: '', 
        emailConfirmed:'', 
        password: ''})  
    const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'phoneNumber' && !/^[0-9]*$/.test(value)) {
        return
    }
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
        console.log(values)
        await axios.post('https://justina.somee.com/api/Account/register-health-care-provider', values)
        navigate('/Login')
    } catch (error) {
        console.error('Error al registrar usuario:', error)        
    }
  }  
    return (
        <section className="w-2/3 h-screen p-8">
            <h2 className="text-3xl font-bold mb-4">Registro</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <FormInput name='Nombre' type='text' placeholder='Ingrese su nombre' id='firstName' value={values.firstName} onChange={handleChange}/>
                <FormInput name='Apellido' type='text' placeholder='Ingrese su apellido' id='lastName' value={values.lastName} onChange={handleChange}/>
                <FormInput name='Teléfono' type='tel' placeholder='Ingrese su número telefónico' id='phoneNumber' value={values.phoneNumber} onChange={handleChange}/>
                <FormInput name='Matrícula Provincial' type='text' placeholder='Ingrese su número de matrícula' id='localRegistrationNumber' value={values.localRegistrationNumber} onChange={handleChange}/>
                <FormInput name='Matrícula Nacional' type='text' placeholder='Ingrese su número de matrícula' id='nationalRegistrationNumber' value={values.nationalRegistrationNumber} onChange={handleChange}/>
                <FormInput name='Email' type='text' placeholder='Ingrese su email' id='email' value={values.email} onChange={handleChange}/>
                <FormInput name='Confirmar Email' type='text' placeholder='Ingrese su email' id='emailConfirmed' value={values.emailConfirmed} onChange={handleChange}/>
                <FormInput name='Constraseña' type='text' placeholder='Ingrese su contraseña' id='password' value={values.password} onChange={handleChange}/>
                <button type='submit' className="bg-indigo-800 py-1 px-4 rounded-lg text-white w-fit">Registrarme</button>
            </form>
        </section>
    )
}

export default Register