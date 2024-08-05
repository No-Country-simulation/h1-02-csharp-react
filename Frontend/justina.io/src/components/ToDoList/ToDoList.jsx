import { useState, useEffect } from "react";

import medicine from "../../assets/icons/medication.png";
import calendar from "../../assets/icons/calendarheart.png";
import other from "../../assets/icons/other.png";
import sport from "../../assets/icons/sport.png";
import food from "../../assets/icons/food.png";

import Button from "../Button/Button"
import Task from "./Task";
import FormTask from "./FormTasks";
import api from "../../api/axios";
import { FaPlus } from "react-icons/fa6";

const ToDoList = () => {


    const [ modalTask, setModalTask ] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const closeModal = () => {
        setModalTask(false);
        setRefresh(!refresh);
    };

    const headerIcons = [
        { icon:food, texto:"Alimentación"},
        {
            icon:sport,
            texto:"Deporte",
        },
        {
            icon:medicine,
            texto:"Medicación",
        },
        {
            icon:calendar,
            texto:"Turnos",
        },
        {
            icon: other,
            texto: "Otros"
        }

    ]

    const [tasks, setTasks] = useState([]);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const now = new Date();
        const monthIndex = now.getMonth();
        const day = String(now.getDate()).padStart(2, '0');

        const monthNames = [
            'ene', 'feb', 'mar', 'abr', 'may', 'jun', 
            'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
        ];

        const formattedCurrentDate = `${day} de ${monthNames[monthIndex]}`;
        setCurrentDate(formattedCurrentDate);
    }, []);


    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const now = new Date();
                const formattedDate = now.toISOString().split('.')[0]; // Formato YYYY-MM-DDTHH:MM:SS
                const response = await api.get(`/api/TaskItem/GetTasksListByDate`, {
                    params: {
                        date: formattedDate
                    }
                });

                console.log('data', response.data);
                if (response.data) {
                    setTasks(response.data);
                    
                } else{
                    throw new Error('Error en la solicitud');
                }
                
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchTasks();
    }, [refresh]);

    const handleNewTask = (newTask) => {
        if(newTask.texto.trim()){
            const formattedTask = {
                taskDate: newTask.taskDate || new Date().toISOString(),
                taskDescription: newTask.texto,
                isCompleted: newTask.completada || false,
                category: newTask.category || 4
            };
            setTasks([formattedTask,...tasks]);
        }
    
    };

    const completarTarea = async id => {
        try {
            const updatedTask = {
                id: id,
                isCompleted: true
            };
            const response = await api.patch(`/api/TaskItem/CompleteTask/${id}`, updatedTask, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response) {
                const tareasActualizadas = tasks.map(tarea => {
                    if (tarea.id === id) {
                        tarea.isCompleted = !tarea.isCompleted;
                    }
                    return tarea;
                });
                setTasks(tareasActualizadas);
            } else {
                throw new Error('Error en la solicitud');
            }
        } catch (error) {
            console.error('Error al completar la tarea:', error);
        }
    }


    const eliminiarTarea = async id => {
        
        const confirmacion = window.confirm("¿Está seguro de que quiere eliminar esta tarea?");

        if (confirmacion){
            try{
                const response = await api.delete(`/api/TaskItem/DeleteTask/${id}`);
    
                if (response) {
                    
                    const tareasActualizadas = tasks.filter(tarea => tarea.id !== id);
                    setTasks(tareasActualizadas);
                } else {
                    throw new Error('Error en la solicitud');
                }
            } catch (error) {
                console.error('Error al eliminar la tarea:', error);
            }
        }
        
    }

  
   
    return ( 

        <div>
            <div className="w-full inline-flex justify-between items-center gap-8 mb-3">
                <p className="text-subtitulo text-primary">Tareas Diarias</p>

                <Button icon={<FaPlus />} text="Crear tarea" onClick={()=>setModalTask(true)}/>
            </div>
            <table className="table-auto ">
                <thead className="h-auto text-small text-neutrals800">
                    <tr className="flex items-center border rounded-[32px] bg-[rgba(253,239,244,0.4)] shadow-transparent ">
                        <th className="">
                            <p className="w-[60px] h-[60px] bg-[#dd93ad] rounded-full shadow-inner backdrop-blur-[25.33px] flex items-center">
                                {currentDate}
                            </p> 
                        </th>
                        {headerIcons.map((header, indexHeader) =>
                            <th key={indexHeader} className="px-3 inline-flex items-center justify-around gap-2">
                            <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center">
                                <img className="" src={header.icon} alt="" />
                            </div>
                            <p>{header.texto}</p> 
                            </th>

                        )}
                     
                    </tr>
                </thead>
                <tbody className="mt-2 items-center text-small ">
                    <div className="overflow-auto max-h-[240px]">

                    {
                        tasks.map((task) => 
                            <Task 
                                key={task.id}
                                id={task.id}
                                texto={task.taskDescription}
                                completada={task.isCompleted}
                                completarTarea={completarTarea}
                                eliminiarTarea={eliminiarTarea}
                                category={task.category}
                            />
                        )
                    }
                    </div>
                   
                </tbody>
               
            </table>

            { modalTask && (
                <FormTask onSubmit={handleNewTask} closeModal={closeModal}/>
            )}
        </div>

     );
}
 
export default ToDoList;