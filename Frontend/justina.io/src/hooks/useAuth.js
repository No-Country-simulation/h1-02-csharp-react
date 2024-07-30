import axios from "axios"
import useUserStore from "./useUserStore";
import { useNavigate } from 'react-router-dom'

const useLogin = ()=> {
    const authStore = useUserStore();
    const navigate = useNavigate()
    const login = async (credential)=>{
        const response = await axios.post('https://justina.somee.com/api/Account/authenticate', credential);

        console.log({response});
        authStore.setUser(null);
        authStore.setToken("");
    }

    const  register = async (credentials)=>{
        const response = await axios.post('https://justina.somee.com/api/Account/register-health-care-provider', credentials);
        console.log({response});
        navigate("/login");
    }

    return {login, register};
}

export default useLogin;