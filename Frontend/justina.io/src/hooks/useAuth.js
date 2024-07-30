import useUserStore from "./useUserStore";
import { useNavigate } from 'react-router-dom'
import api from "../api/axios"

const useLogin = ()=> {
    const authStore = useUserStore();
    const navigate = useNavigate();

    const setUserFullName =async ()=>{
        const response = await api.get('/api/Account/me');
        authStore.setUserFullname(`${response.firstName} ${response.lastName}`);
    }

    const login = async (credential)=>{
        const response = await api.post('/api/account/authenticate', credential);
        console.log({response})
        authStore.setToken(response.token);
        setUserFullName();
    }

    const  register = async (credentials)=>{
        const response = await api.post('/api/account/register', credentials);
        console.log({response});
        navigate("/login");
    }

    return {login, register};
}

export default useLogin;