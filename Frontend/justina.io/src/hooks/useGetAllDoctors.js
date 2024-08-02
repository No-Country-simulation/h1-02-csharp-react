import { useRef } from "react";
import useSWR from 'swr';
import api from "../api/axios";

const mapResponse = (values)=>{
    return values.map((value)=>({
        id: value.id,
        email: value.email,
        fullName: `${value.firstName} ${value.lastName}`,
        identification: value.identificationNumber
    }))
}

const fetcher = ([pathKey, _]) =>{
    return api(pathKey).then((values)=>{
        const data = values.data || [];
        return mapResponse(data);
    }).catch((error)=> []);
}

const useGetAllDoctors = () => {
    const swrKeYRef = useRef(["/api/HealthCareProviders"]);
    const { data, isLoading } = useSWR(
		swrKeYRef.current,
		fetcher,
		{
			keepPreviousData: true,
			revalidateOnReconnect: true,
            revalidateOnFocus: true,	
			revalidateOnMount: true,
			fallbackData: [],
		}
	);

    return { data, isLoading };
}

export default useGetAllDoctors;