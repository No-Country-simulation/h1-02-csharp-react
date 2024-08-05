import { useState } from "react"
import api from "../api/axios"
import { useEffect } from "react";
import { useCallback } from "react";

const useRegisterDoctor = (opened)=>{
    const [specialities, setSpecilistList] = useState([]);
    

    const searchSpecialities = useCallback(()=>{
        api.get("/api/Specialities").then((res)=>{
            setSpecilistList(res.data);
        })
    }, [setSpecilistList])

    const register = async (body)=>{
        try {
            const res = await api.post("/api/Account/register-health-care-provider", body).then((res)=>{
                return res;
            });
            return res;
        } catch(e){
            console.error(e);
            return undefined;
        }
            
    }

    useEffect(()=>{
        if(opened && specialities.length === 0){
            searchSpecialities();
        }
    }, [opened]);

    return {register,specialities}
}

export default useRegisterDoctor;