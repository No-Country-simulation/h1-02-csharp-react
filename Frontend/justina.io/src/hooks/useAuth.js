import useUserStore from "./useUserStore";
import { useNavigate } from 'react-router-dom'
import api from "../api/axios"
import {decodePayload,getValidUser} from "../api/decodeToken"

const useAuth = ()=> {
    const authStore = useUserStore();
    const navigate = useNavigate();

    /*const setUserFullName =async ()=>{
        //TODO: Gestionar caso de fallo
        const response = await api.get('/api/Account/me');
        authStore.setUserFullname(`${response.firstName} ${response.lastName}`);
    }*/

    const login = async (credential)=>{
        //TODO: Gestionar caso de fallo
        try {
            const response = await api.post('/api/account/authenticate', credential);
            const payload = decodePayload(response.token);
            console.log({payload})
            authStore.setToken(response.token);
            authStore.setUser(getValidUser(payload));
            navigate("/patientdetails");
        } catch(e){
            console.log("Error: ",e);
        }
    }

    const  register = async (credentials)=>{
        //TODO: Gestionar caso de fallo
       try {
        await api.post('/api/account/register', credentials);
        navigate("/login");
       } catch(e){
        console.log("Error: ", e);
       }
    }

    return {login, register};
}

export default useAuth;