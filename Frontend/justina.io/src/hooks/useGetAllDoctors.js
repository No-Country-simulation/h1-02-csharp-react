import { useState,useEffect } from "react";
import api from "../api/axios";
import useDoctorStore from "../store/useDoctorStore";

const mapResponse = (values)=>{
    return values.map((value)=>({
        id: value.id,
        email: value.email,
        fullName: `${value.firstName} ${value.lastName}`,
        identification: value.identificationNumber
    }))
}



const useGetAllDoctors = () => {
    const {doctors,setDoctors} = useDoctorStore();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        const fetcher = async () => {
            try {
              const response = await api("/api/HealthCareProviders");
              const data = response.data || [];
              const mappedDoctors = mapResponse(data);
              setDoctors(mappedDoctors);
            } catch (error) {
              console.error("Error fetching doctors:", error);
            } finally {
              setIsLoading(false);
            }
          };
        setIsLoading(true);
        fetcher();
    }, []);
    return { doctors, isLoading };
}

export default useGetAllDoctors;