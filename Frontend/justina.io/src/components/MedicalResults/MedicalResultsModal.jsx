import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"
import TableBodyWrapper from "../../components/TableBody/TableBodyWrapper"
import TableHeader from "../../components/TableHeader/TableHeader"
import PaginationControls from "../../components/PaginationControls/PaginationControls"
import TableContainer from "../../components/TableContainer/TableContainer"
import ModalWrapper from "../ModalWrapper/ModalWrapper"
import DrHomeSearchBar from "../DrHomeSearchbar/DrHomeSearchBar"
import FormInput from "../FormInput/FormInput"
import SelectList from "../SelectList/SelectList"
import api from "../../api/axios"

import downloadIcon from '../../assets/icons/downloadIcon.svg'
import { HeartIcon, LogoutIcon } from "../icons"

const columnHelper = createColumnHelper()

const MedicalResultsModal = ({ isOpen, onClose, medicalResults, patients }) => {
  const [selectedPatientOption, setSelectedPatientOption] = useState('')
  const [file, setFile] = useState(null)
  const [fileInputOpen, setFileInputOpen] = useState(false)   

  const patientOptions = [
    { id: '', value: '', label: 'Selecciona un paciente' },
    ...(patients ? patients.map(patient => ({
        id: patient.id,
        value: patient.id,
        label: `${patient.firstName} ${patient.lastName} (${patient.identificationNumber})`
      })) : [] )
  ]    

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)      
    }
  }

  const handleFileSubmit = async () => {
    if (!selectedPatientOption) {
      alert('Por favor selecciona un paciente.')
      return
    }
  
    if (!file) {
      alert('Por favor selecciona un archivo.')
      return
    }
    
    const formData = new FormData()
    formData.append('file', file, "medicalStudies.png")

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    
    try {      
      const response = await api.post(`/api/MedicalTests/${selectedPatientOption}`,  formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
      },
      })
      if (response) {
          console.log(response)
          alert('Registro guardado')
          setFile(null)          
          setSelectedPatientOption('')   
      } else {
        console.error('Error: ', response.message);
        alert('Error de respuesta')
      }
    } catch (error) {
      console.error('Error uploading new file:', error)
      alert('Error')
    }
  }
  
  const [params] = useSearchParams()
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })

  // Filtrar los datos según la búsqueda
  const filteredData = useMemo(() => {
    const search = params.get("search")?.toLowerCase() || ""
    return medicalResults.filter((result) =>
      Object.values(result).some((value) =>
        String(value).toLowerCase().includes(search)
      )
    )
  }, [params.get("search"), medicalResults]);

  // Definir las columnas de la tabla
  const columns = useMemo(
    () => [
      columnHelper.accessor((row, index) => index + 1, {
        id: "index",
        header: () => <span className="text-neutrals800 leading-[120%] w-full h-full flex justify-center items-center whitespace-pre-wrap truncate">Nº</span>,
        cell: ({ getValue }) => <span className="text-center w-full text-neutrals800">{getValue()}</span>,        
      }),
      columnHelper.accessor("testName", {
        id: "testName",
        header: () => <span className="text-neutrals800 leading-[120%] w-full h-full flex justify-center items-center whitespace-pre-wrap truncate">Nombre</span>,
        cell: ({ getValue }) => <span className="text-center w-full text-neutrals800">{getValue()}</span>,
      }),
      columnHelper.accessor("testDate", {
        id: "testDate",
        header: () => <span className="text-neutrals800 leading-[120%] w-full h-full flex justify-center items-center whitespace-pre-wrap truncate">Fecha</span>,
        cell: ({ getValue }) => <span className="text-center w-full text-neutrals800">{formatDate(getValue())}</span>,
      }),
      columnHelper.accessor("fileUrl", {
        id: "fileUrl",
        header: () => <span className="text-neutrals800 leading-[120%] w-full h-full flex justify-center items-center whitespace-pre-wrap truncate">Descarga</span>,
        cell: ({ getValue }) => (
          <a href={getValue()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full">
            <img src={downloadIcon} alt="Descargar" className="h-8 w-8 rounded-full shadow-custom" />
          </a>
        ),
      }),
    ],[])

  // Configuración de la tabla
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
    defaultColumn: {
      minSize: 20,
      size: 216,
      maxSize: 300,
    },
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    autoResetPageIndex: true,
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}hs`;
  }

  return (
    <ModalWrapper open={isOpen} onClose={onClose}>    
      <div className="relative shadow-lg no-underline text-neutrals800 backdrop-blur bg-[rgba(253,239,244,0.5)] rounded-3xl w-full">  
          <div className="flex flex-col items-center p-4">                            
            <h2 className="text-xl text-center font-semibold mb-4">Lista de Archivos</h2>            
            {fileInputOpen ? 
            <>
                <div className="flex items-center justify-center w-3/4">             
                    <button className="flex justify-center items-center gap-2 text-primary font-normal bg-rose-o20 rounded-[32px] px-6 py-2 shadow-glass-effect my-2" onClick={() => setFileInputOpen(!fileInputOpen)}>
                        <LogoutIcon /> Volver
                    </button> 
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                  <SelectList
                    id="patientselect"
                    name="Seleccionar Paciente"
                    options={patientOptions}
                    value={selectedPatientOption}
                    onChange={(e) => {
                      setSelectedPatientOption(e.target.value)                      
                    }}
                  /> 
                  <FormInput                     
                    id="fileInput"
                    type="file"
                    onChange={handleFileChange}
                    height="h-[52px]"
                    inputStyle="cursor-pointer"                                       
                  />
                  <button className="no-underline text-primary text-parrafo backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl shadow-custom w-40 py-2 self-center" onClick={handleFileSubmit}>Guardar</button>
                </div>
            </>
            :
            <>
                <div className="flex items-center justify-center gap-8 w-11/12 pb-2"> 
                    <DrHomeSearchBar />
                    {patients &&
                    <button className="flex justify-center items-center gap-2 text-primary font-normal bg-rose-o20 rounded-[32px] px-6 shadow-glass-effect my-2" onClick={() => setFileInputOpen(!fileInputOpen)}>
                        <HeartIcon /> Agregar archivo
                    </button> 
                    }
                </div>
                <div className="backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl shadow-custom overflow-x-auto pb-2 p-1">
                <TableContainer table={table}>
                    <TableHeader table={table} />
                    <TableBodyWrapper table={table} />
                </TableContainer>
                <PaginationControls table={table} pagination={pagination} />
                </div>
            </>
            }                       
          </div>                    
        </div>        
    </ModalWrapper>
  )
}

export default MedicalResultsModal
