import closeIcon from '../../assets/icons/closeIcon.svg'
import downloadIcon from '../../assets/icons/downloadIcon.svg'

const MedicalResultsModal = ({ isOpen, onClose, medicalResults }) => {  
    const handleClose = () => onClose()

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')

        return `${day}/${month}/${year} - ${hours}:${minutes}hs`
    } 

    return (
        <div className={`${isOpen ? "fixed" : "hidden"} inset-0 z-50 flex items-center justify-center`}>
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleClose}></div>
            <div className="relative shadow-lg no-underline text-neutrals800 backdrop-blur bg-[rgba(253,239,244,0.5)] rounded-3xl w-1/2">
                <div className="p-4">
                    <button onClick={handleClose} className="absolute top-3 right-4 text-neutrals600"><img src={closeIcon}/></button>
                    <div>                            
                        <h2 className="text-xl text-center font-semibold mb-4">Lista de Archivos</h2>
                        <div className="backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl shadow-custom overflow-x-auto">
                            <table className="w-full text-left rounded-2xl overflow-hidden">
                                <thead className='bg-[rgba(214,86,131,.3)]'>
                                    <tr>
                                        <th className="px-4 py-2 text-center">Nº</th>
                                        <th className="px-4 py-2 text-center">Nombre</th>
                                        <th className="px-4 py-2 text-center">Fecha</th>
                                        <th className="px-4 py-2 text-center">Descarga</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-[rgba(255,255,255,.3)]'>
                                    {medicalResults?.map((link, index) => (
                                        <tr key={link.id} className="border-b border-neutrals300">
                                            <td className="px-4 py-2 text-center">{index + 1}</td>
                                            <td className="px-4 py-2 text-center">{link.testName}</td>
                                            <td className="px-4 py-2 text-center">{formatDate(link.testDate)}</td>
                                            <td className="px-4 py-2 flex justify-center">
                                                <a href={link.fileUrl} target="_blank" rel="noopener noreferrer" ><img src={downloadIcon} alt="Descargar" className="h-9 w-9 shadow-custom rounded-full p-2"/></a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>                       
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default MedicalResultsModal