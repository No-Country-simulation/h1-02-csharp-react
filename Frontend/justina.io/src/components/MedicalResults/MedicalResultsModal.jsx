import { useState } from "react"
import MedicalResults from "./MedicalResults"

import imgStudies from '../../assets/imgs/imgStudies.png'
import labStudies from '../../assets/imgs/labStudies.png'
import funcionalStudies from '../../assets/imgs/funcionalStudies.png'
import medicalStudiesIcon from '../../assets/icons/medicalStudiesIcon.svg'
import closeIcon from '../../assets/icons/closeIcon.svg'

const MedicalResultsModal = ({ isOpen, onClose }) => {
    const [view, setView] = useState("initial")
    const [links, setLinks] = useState([])

    const handleBackClick = () => {
        setView("initial")
        setLinks([])
    }

    const handleResultClick = (type) => {        
        const studiesLinks = [
            { id: 1, name: `Link 1 de ${type}`, url: "#" },
            { id: 2, name: `Link 2 de ${type}`, url: "#" },
            { id: 3, name: `Link 3 de ${type}`, url: "#" },
        ]
        setLinks(studiesLinks)
        setView("links")
    }

    const handleClose = () => {
        onClose()
        setView("initial")
        setLinks([])
    }   

    return (
        <div className={`${isOpen ? "fixed" : "hidden"} inset-0 z-50 flex items-center justify-center`}>
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleClose}></div>
            <div className="relative shadow-lg no-underline text-neutrals800 backdrop-blur bg-[rgba(253,239,244,0.5)] rounded-3xl w-1/2">
                <div className="p-4">
                    <button onClick={handleClose} className="absolute top-3 right-4 text-neutrals600"><img src={closeIcon}/></button>
                    {view === "initial" && (
                        <div>
                            <h2 className="text-xl text-center font-semibold mb-4">Resultados Médicos</h2>
                            <div className="flex gap-4">
                                <MedicalResults
                                    title="Estudios de Laboratorio"
                                    icon={medicalStudiesIcon}
                                    image={labStudies}
                                    onClick={() => handleResultClick("Laboratorio")}
                                    imgStyle='flex-col'
                                />
                                <MedicalResults
                                    title="Estudios Funcionales"
                                    icon={medicalStudiesIcon}
                                    image={funcionalStudies}
                                    onClick={() => handleResultClick("Funcionales")}
                                    imgStyle='flex-col'
                                />
                                <MedicalResults
                                    title="Estudios de Imágenes"
                                    icon={medicalStudiesIcon}
                                    image={imgStudies}
                                    onClick={() => handleResultClick("Imágenes")}
                                    imgStyle='flex-col'
                                />
                            </div>
                        </div>
                    )}
                    {view === "links" && (
                        <div>
                            <button onClick={handleBackClick} className="text-neutrls600 font-semibold mb-4">Volver</button>
                            <h2 className="text-xl text-center font-semibold mb-4">Resultados Detallados</h2>
                            <ul className="backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl p-2">
                                {links.map(link => (
                                    <li key={link.id} className="mb-2">
                                        <a href={link.url} className="text-blue-500 underline">{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MedicalResultsModal