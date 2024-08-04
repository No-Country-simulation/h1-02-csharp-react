import { useState } from "react";
import Button from "../Button/Button"

import FormInput from "../FormInput/FormInput";
import TextAreaInput from "../TextAreaInput/TextAreaInput";
import iconplus from "../../assets/icons/ph_plus-bold.svg"

const FormTask = (props) => {


    const [input, setInput] = useState("");
    
    const change = e => {
        setInput(e.target.value);
    } 

    const send = e => {
        e.preventDefault();
        const nuevatarea = {
            id:'234',
            texto: input,
            completado: false
        }
        props.onSubmit(nuevatarea);
      
    }

    return ( 

        <div className="p-6 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-5 rounded flex flex-col justify-center items-center">
       
                <p className="text-primary text-titulopag mb-2">Agrega una tarea</p>
                <p className="text-neutrals800 text-small mb-4">Elige una categoría y escribe la tarea que quieres agregar</p>
                <select className="backdrop-blur bg-[rgba(253,239,244,0.1)] inner-shadow-custom appearance-none rounded-3xl text-neutrals600 w-full p-3 leading-tight text-[0.8rem] lg:text-[1rem] outline-none">
                    <option value="">Elige una categoria</option>
                    <option value="someOption">Medicación</option>
                    <option value="">Turnos</option>
                    <option value="otherOption">Deporte</option>
                    <option value="">Alimentación</option>
                    <option value="">Otros</option>
                </select>
                <TextAreaInput 
                    
                    placeholder="Ingresa una tarea"
                    value={input}
                    onChange={change}
                />

                <Button icon="iconplus" text="Agregar" onClick={send}/>
         
            </div>
        </div>
     );
}
 
export default FormTask;