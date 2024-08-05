import { useRef, useState } from "react";
import PatientStudiesTable from "../PatientStudiesTable/PatientStudiesTable";
import { FormIcon, PlusIcon } from "../icons";
import FormInput from "../FormInput/FormInput";

import api from "../../api/axios";
import { toast } from "react-toastify";


export default function PatientStudiesSection() {
  const ref = useRef();

  const [ file, setFile ] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      toast.info("Estudio seleccionado")
    }
  }

  const handleFileSubmit = async () => {
    if (!file) {
      toast.error("Por favor ingresa un archivo")
      return
    }

    const formData = new FormData()
    formData.append('file', file, "medicalStudies.png")

    try {
      const response = await api.post('/api/MedicalTests',  formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
      },
      })
      if (response) {
          console.log(response)
          toast.success("Estudio cargado con exito")
          setFile(null)
      } else {
        console.error('Error: ', response.message);
        alert('Error de respuesta')
      }
    } catch (error) {
      console.error('Error uploading new file:', error)
      alert('Error')
    }
  }

  return (
    <section className="w-full flex flex-col gap-y-4 justify-start mt-3 max-w-[790px]">
      <div className="flex justify-between text-primary font-bold">
        <h2 className="text-titulopag flex items-center gap-x-4 w-full">
          <FormIcon />
          Mis estudios
        </h2>
        <div className="flex items-center gap-4">

        <FormInput 
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          height="h-[52px]"
          inputStyle="cursor-pointer max-w-[300px]"
        />
        
        <button
          ref={ref}
          className="h-[52px] max-w-[200px] w-full rounded-[32px] bg-rose-o20 shadow-glass-effect px-2 flex justify-center items-center gap-x-2"
          onClick={handleFileSubmit}
        >
          Cargar estudio{" "}
          <span className="scale-[1] bg-rose-o40 rounded-md p-1">
            <PlusIcon />
          </span>
        </button>
                  
        </div>
      </div>
      <PatientStudiesTable />
    </section>
  );
}
