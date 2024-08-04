import { useState } from "react";

import medicine from "../../assets/icons/medication.png";
import calendar from "../../assets/icons/calendarheart.png";
import other from "../../assets/icons/other.png";
import sport from "../../assets/icons/sport.png";
import food from "../../assets/icons/food.png";

import Button from "../Button/Button"
import Task from "./Task";
import FormTask from "./FormTasks";



const ToDoList = () => {


    const [ modalTask, setModalTask ] = useState(false);

    const closeModal = () => {
        setModalTask(false);
    };

    const headerIcons = [
        {
            icon:food,
            texto:"Alimentación",
        },
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
    const [tareas, setTareas] = useState([]);

    const agregaTarea = tarea => {
        if(tarea.texto.trim()){
            tarea.texto = tarea.texto.trim();
            const tareasActualizadas = [tarea, ...tareas];
            setTareas(tareasActualizadas);
        }
    
    };

    const completarTarea = id => {
        const tareasActualizadas = tareas.map(tarea => {
            if(tarea.id === id){
                tarea.completada = !tarea.completada
            }
            return tarea;
        });
        setTareas(tareasActualizadas);
    }


    const eliminiarTarea = id => {
        const tareasActualizadas = tareas.filter(tarea => tarea.id !== id);
        setTareas(tareasActualizadas);
    }

    return ( 

        <div>

            <div className="w-full inline-flex justify-between items-center gap-8">
                <p className="text-subtitulo text-primary">Tareas Diarias</p>

                <Button text="Crear tarea" onClick={()=>setModalTask(true)}/>
            </div>

            <table className="table-auto ">
                <thead className="h-auto text-small text-neutrals800">
                    <tr className="flex items-center border rounded-[32px] bg-[rgba(253,239,244,0.4)] shadow-transparent ">
                        <th className="">
                            <p className="w-[60px] h-[60px] bg-[#dd93ad] rounded-full shadow-inner backdrop-blur-[25.33px] flex items-center">
                                1 de Agosto
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
                <tbody className="mt-2 items-center text-small">
                    {
                        tareas.map((tarea, index) => 
                            <Task 
                                key={index}
                                id={tarea.id}
                                texto={tarea.texto}
                                completada={tarea.completada}
                                completarTarea={completarTarea}
                                eliminiarTarea={eliminiarTarea}
                            
                            />
                        )
                    }
                  
                </tbody>

            </table>

            { modalTask && (
                <FormTask closeModal={closeModal}/>
            )}
        </div>

     );
}
 
export default ToDoList;