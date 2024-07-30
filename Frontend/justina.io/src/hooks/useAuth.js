import useUserStore from "./useUserStore";
import { useNavigate } from 'react-router-dom'
import api from "../api/axios"

const useAuth = ()=> {
    const authStore = useUserStore();
    const navigate = useNavigate();

    //El BACK da error de CORS
    const setUserFullName =async ()=>{
        //TODO: Gestionar caso de fallo
        const response = await api.get('/api/Account/me');
        authStore.setUserFullname(`${response.firstName} ${response.lastName}`);
    }

    const login = async (credential)=>{
        //TODO: Gestionar caso de fallo
        const response = await api.post('/api/account/authenticate', credential);
        //TODO: Borrar luego de probar la respuesta
        console.log({response})
        authStore.setToken(response.token);
        setUserFullName();
    }

    const  register = async (credentials)=>{
        //TODO: Gestionar caso de fallo
        const response = await api.post('/api/account/register', credentials);
        //TODO: Borrar luego de probar la respuesta
        console.log({response});
        navigate("/login");
    }

    return {login, register};
}

export default useAuth;