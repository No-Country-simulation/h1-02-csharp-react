import { useRef } from "react";
import useSWR from 'swr';
import api from "../api/axios";
import { useEffect } from "react";

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
    const storeStr = localStorage.getItem("doctorStore");
    const store = storeStr ? JSON.parse(storeStr) : null
    const swrKeYRef = useRef(["/api/HealthCareProviders"]);
    const { data, isLoading, mutate } = useSWR(
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

    useEffect(()=>{
        if(store?.state?.doctorDeleted){
            const id = store.state.doctorDeleted;
            console.log({id})
            const updatedItems = data.filter(item => item.id !== id);
            mutate(updatedItems);
            localStorage.setItem(
                "doctorStore",
                JSON.stringify({
                  version: 0,
                  state: { ...store.state, doctorDeleted: "" },
                })
              );
        }
    }, [store.state.doctorDeleted]);

    return { data, isLoading };
}

export default useGetAllDoctors;