import { useState } from "react";
import FormInput from "../../components/FormInput/FormInput"
import Layout from "../../layouts/Layout";
import Button from "../../components/Button/Button"
import { GiHeartPlus } from "react-icons/gi";
import Modal from "../../components/Modal/Modal";
import { Link } from "react-router-dom";

const ListadoPacientes = () => {

    const datostabla = [{
        nombre: 'Malcolm Lockyer',
        patologia: 'Lorem',
        tratamiento: 'Lorem',
        contacto: '123345'
    }, {
        nombre: 'Malcolm Lockyer',
        patologia: 'Lorem',
        tratamiento: 'Lorem',
        contacto: '123345'
    },{
        nombre: 'Malcolm Lockyer',
        patologia: 'Lorem',
        tratamiento: 'Lorem',
        contacto: '123345'
    },{
        nombre: 'Malcolm Lockyer',
        patologia: 'Lorem',
        tratamiento: 'Lorem',
        contacto: '123345'
    },{
        nombre: 'Malcolm Lockyer',
        patologia: 'Lorem',
        tratamiento: 'Lorem',
        contacto: '123345'
    },{
        nombre: 'Malcolm Lockyer',
        patologia: 'Lorem',
        tratamiento: 'Lorem',
        contacto: '123345'
    },{
        nombre: 'Malcolm Lockyer',
        patologia: 'Lorem',
        tratamiento: 'Lorem',
        contacto: '123345'
    },{
        nombre: 'Malcolm Lockyer',
        patologia: 'Lorem',
        tratamiento: 'Lorem',
        contacto: '123345'
    },
    {
        nombre: 'Malcolm Lockyer',
        patologia: 'Lorem',
        tratamiento: 'Lorem',
        contacto: '123345'
    },
    {
        nombre: 'Malcolm Lockyer',
        patologia: 'Lorem',
        tratamiento: 'Lorem',
        contacto: '123345'
    },

    ];

    const [ search, setSearch ] = useState("")
    
    const searcher = (e) => {
        setSearch(e.target.value)
    }

    const [isOpen, setIsOpen ] = useState(false)
    
    const closeModal = () => {
        setIsOpen(false);
    };

    return (  
        <Layout>

        <div className="mt-4 p-4 ">
            <p className="text-primary text-titulopag text-start font-semibold">Pacientes</p>
            <div className="flex justify-between h-16">
                <div className="buscador w-80">
                    <FormInput type='text' placeholder='Buscar paciente' id='campobuscador' value={search} onChange={searcher}/>
                </div>
                <div>
                    <Button icon={<GiHeartPlus />} text="Agregar Paciente" 
                    onClick={()=>setIsOpen(true)}/>
                </div>
            </div>
           
            <div className="flex shadow border-b border-gray-200 sm:rounded-lg">
                <table className="w-full py-4 table-fixed border text-center text-sm font-light dark:border-neutral-500 border-collapse border-slate-400">
                <thead className="bg-primary opacity-60 border-b font-medium dark:border-neutral-500 bg-[rgba(253,239,244,0.4)] shadow-custom">
                    <tr>
                        <th className="px-6 py-3">Nombre Completo</th>
                        <th>Patología</th>
                        <th>Tratamiento</th>
                        <th>Contacto</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody className="bg-[rgba(253,239,244,0.4)] shadow-custom">
                    {datostabla.map((data) => (
                        <tr key={data.id} 
                            className="border-b dark:border-neutral-500">
                            <td className="px-6 py-3">{data.nombre}</td>
                            <td>{data.patologia}</td>
                            <td>{data.tratamiento}</td>
                            <td>{data.contacto}</td>
                            <td><Link to="/patientdetails">Ver Paciente</Link></td>
                        </tr>
                    ))}
                    
                </tbody>
                </table>
            </div>

            <nav aria-label="Page navigation example">
                <ul className="list-style-none flex justify-center mt-4">
                    <li>
                        <a className="pointer-events-none relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400">Atrás</a>
                    </li>
                    <li aria-current="page" >
                        <a className="relative block rounded-[48px] bg-[rgba(253,239,244,0.4)] shadow-custom px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  text-primary dark:hover:bg-neutral-700 dark:hover:text-white"
                            href="#!">1</a>
                    </li>
                    <li >
                        <a className="relative block rounded-[48px] bg-[rgba(253,239,244,0.4)] shadow-custom px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300"
                            href="#!">2
                        </a>
                    </li>
                    <li>
                        <a className="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                            href="#!">Siguiente</a>
                    </li>
                </ul>
            </nav>
            
        
        </div>
        { isOpen && (
            <Modal closeModal={closeModal}/>
        )}

        </Layout>
       
     );
}
 
export default ListadoPacientes;