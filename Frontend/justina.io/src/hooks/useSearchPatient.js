import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { SearchState } from "../constants/SearchState";
import api from "../api/axios";
import profile from "../assets/imgs/malePatientPhoto.png"

function calculateAge(fechaNacimiento) {
  const hoy = new Date();
  const fechaNac = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const mes = hoy.getMonth() - fechaNac.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
  }

  return edad;
}

const fetchPatient = (search) => {
  return api.get(`/api/Patient/GetPatientByCuil/${search}`).then((res)=>{
    const data = res.data;
    return {
      ID: data.id,
      name: `${data.firstName} ${data.lastName}`,
      profile: profile,
      identification: data.identificationNumber,
      age: calculateAge(data.birthDate),
      bloodType: data.bloodTypeDescription,
    };
  }).catch(()=> {
    return undefined;})
};
const useSearchPatient = () => {
  const [params, _] = useSearchParams();
  const [loading, setLoading] = useState(SearchState.WAITING);
  const [patient, setPatient] = useState();

  useEffect(() => {
    setLoading(SearchState.WAITING);
    setPatient(undefined);
    const search = params.get("search");
    if (search) {
      setLoading(SearchState.LOADING);
      fetchPatient(search).then((value) => {
        setPatient(value);
        setLoading(SearchState.FINISH);
      });
    } 
  }, [params.get("search")]);

  return {
    isLoading: loading,
    patient,
  };
};

export default useSearchPatient;
