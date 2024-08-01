import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { SearchState } from "../constants/SearchState";

const DEFAULT_PATIENT = {
  ID: "XXX",
  name: "XXX",
  profile: "XX",
  identification: "XXX",
  age: "XXXX",
  bloodType: "XXXX",
};
const fakeFetchPatient = (search) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DEFAULT_PATIENT);
    }, 800);
  });
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
      fakeFetchPatient(search).then((value) => {
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
