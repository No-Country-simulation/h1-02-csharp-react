import { useState } from "react"
import api from "../api/axios"
import { useEffect } from "react";

const useRegisterDoctor = ()=>{
    const [specialities, setSpecilistList] = useState([]);
    

    const searchSpecialities = ()=>{
        api.get("/api/Specialities").then((res)=>{
            /* 
            [
              data: {
               id: string,
               description: string
              }
            ]
            */
            setSpecilistList(res.data);
        })
    }

    const register = (body)=>{
        return api.post("/api/Account/register-health-care-provider", body).then((res)=>{
            return res;
        })
    }

    useEffect(()=>{
        searchSpecialities();
    }, []);

    return {register,specialities}
}

export default useRegisterDoctor;