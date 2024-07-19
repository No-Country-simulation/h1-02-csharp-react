import { useState } from "react"
import FormInput from "../../components/FormInput/FormInput"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { loginUser } from "../../store/UserSlice"
import { useDispatch } from 'react-redux'

const Login = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate()
  
    const handleSubmit = async (event) => {
      event.preventDefault()
      try {
        let userCredentials ={
            email, password
        }
        dispatch(loginUser(userCredentials)).then((result)=>{
            if(result.payload){
                setEmail('');
                setPassword('');
                navigate('/Home')
            }
        })
          //await axios.post('')
          //navigate('/Home')
      } catch (error) {
          console.error('Error al Iniciar sesion:', error)        
      }
    }  

    return (
        <div className="w-2/3 h-screen p-8 justify-center items-center">

        <h2 className="text-neutrals800 text-titulo font font-bold mb-4">Login</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <FormInput 
                    name='Email' 
                    type='email' 
                    placeholder='Ingrese su email' 
                    id='email' 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}/>
                <FormInput 
                    name='Password' 
                    type='password' 
                    placeholder='Ingrese su contraseña' 
                    id='password' 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}/>
                <button 
                    type='submit' 
                   
                    className="bg-primary text-parrafo py-1 px-4 rounded-lg text-white w-fit">
                        Ingresar
                    </button>
            </form>

        </div>
    )
}

export default Login;