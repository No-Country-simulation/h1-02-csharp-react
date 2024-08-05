import { useState } from "react"
import api from "../api/axios";
import { formatDate } from "./formatDate";

const mapData = (value)=> value.map((data, i)=>({
    id: data.id,
    num: i+1,
    date: formatDate(data.testDate),
    name: data.testName,
    download: data.fileUrl
}));

const useGetPatientStudies = ()=>{
    const [patientStudies, setPatientStudies] = useState();
    const handleGetPatientStudies = ()=>{
        api.get("/api/MedicalTests/GetAllByPatient").then((res)=>{
            const mappedData = mapData(res.data);
            setPatientStudies(mappedData);
        })
    }

    return {patientStudies,handleGetPatientStudies}
}

export default useGetPatientStudies;