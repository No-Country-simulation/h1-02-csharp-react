import useUserStore from "../store/useUserStore";
import { useNavigate } from 'react-router-dom'
import api from "../api/axios"
import {decodePayload,getValidUser} from "../api/decodeToken"

const useAuth = ()=> {
    const authStore = useUserStore();
    const navigate = useNavigate();

    const login = async (credential)=>{
        //TODO: Gestionar caso de fallo
        try {
            const response = await api.post('/api/account/authenticate', credential);
            const payload = decodePayload(response.token);
            authStore.setToken(response.token);
            authStore.setUser(getValidUser(payload));
            navigate("/patientdetails");
            return true;
        } catch(e){
            console.error("Error: ",e);
            return false;
        }
    }

    const  register = async (credentials)=>{
        //TODO: Gestionar caso de fallo
       try {
        await api.post('/api/account/register', credentials);
        navigate("/login");
        return true;
       } catch(e){
        console.error("Error: ", e);
        return false;
       }
    }

    return {login, register};
}

export default useAuth;