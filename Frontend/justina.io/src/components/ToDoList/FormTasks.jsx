import { useState, useEffect } from "react";
import Button from "../Button/Button"

import TextAreaInput from "../TextAreaInput/TextAreaInput";

import api from "../../api/axios";
import { FaPlus } from "react-icons/fa6";
import closeIcon from '../../assets/icons/closeIcon.svg'


const FormTask = (props) => {


    const [ input, setInput ] = useState("");
    const [ category, setCategory ] = useState("");
    const [ taskDate, setTaskDate ] = useState("");

    const change = e => {
        setInput(e.target.value);
    } 

    const changeCategory = e =>{
        setCategory(e.target.value);
    }

    useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        // Formatear la fecha para el input datetime-local
        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
        setTaskDate(formattedDate);
    }, []);

    const changeTaskDate = e => {
        setTaskDate(e.target.value);
    }

    const send = async (e) => {
        e.preventDefault();
        const nuevatarea = {
            taskDate: taskDate,
            category: parseInt(category),
        }
        try {
            const response = await api.post(`/api/TaskItem/AddTasks?taskDescription=${input}`,[nuevatarea]);
            if (response.data) {
                console.log('Tarea agregada:', response);
                props.closeModal(); 

                const updatedTasksResponse = await api.get(`/api/TaskItem/GetTasks`);
                if (updatedTasksResponse.data && Array.isArray(updatedTasksResponse.data)) {
                    props.onSubmit(updatedTasksResponse.data); 
                } else {
                    console.error('Error al obtener la lista actualizada de tareas.');
                }
            }else{
                throw new Error('Error en la solicitud');
            }

        } catch (error) {
            console.error('Error en la solicitud:', error.response ? error.response.data : error.message);
            //alert(`Error al agregar la tarea: ${error.response ? error.response.data.message : error.message}`);
        }
    }

    const handleClose = () => {
        props.closeModal();
    }  

    return ( 

        <div className="p-6 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-5 rounded flex flex-col justify-center items-center">
            <button onClick={handleClose} className="top-3 text-neutrals600 flex justify-start">
                <img src={closeIcon}/>
            </button>
                <p className="text-primary text-titulopag mb-2">Agrega una tarea</p>

                <form onSubmit={send}>
                    <input 
                        type="datetime-local" 
                        className="mb-4"
                        value={taskDate}
                        onChange={changeTaskDate}
                        hidden
                    />

                    <p className="text-neutrals800 text-small mb-4">Elige una categoría y escribe la tarea que quieres agregar</p>
                    <div className="backdrop-blur bg-[rgba(253,239,244,0.1)] inner-shadow-custom appearance-none rounded-3xl text-neutrals600 w-full p-3 leading-tight text-[0.8rem] lg:text-[1rem] outline-none">
                        <select 
                            className="backdrop-blur bg-[rgba(253,239,244,0.1)] text-neutrals600 w-full p-2"
                            value={category}
                            onChange={changeCategory}
                        >
                            <option value="">Elige una categoria</option>
                            <option value="0">Medicación</option>
                            <option value="1">Turnos</option>
                            <option value="2">Deporte</option>
                            <option value="3">Alimentación</option>
                            <option value="4">Otros</option>
                        </select>
                    
                    </div>
                    
                    <TextAreaInput 
                        placeholder="Ingresa una tarea"
                        value={input}
                        onChange={change}
                    />

                    <Button type="submit" icon={<FaPlus />} text="Agregar Tarea"/>

                </form>
               
         
            </div>
        </div>
     );
}
 
export default FormTask;