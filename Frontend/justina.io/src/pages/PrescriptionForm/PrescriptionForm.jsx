import { useState } from "react"
import ProfileResume from "../../components/ProfileResume/ProfileResume"
import TextAreaInput from "../../components/TextAreaInput/TextAreaInput"
import FormInput from "../../components/FormInput/FormInput"

import Doctor from '../../assets/imgs/doctor.png'
import hearthIcon from "../../assets/icons/hearthIcon.svg"
import calendar from "../../assets/icons/calendar.svg"
import Layout from "../../layouts/Layout"


const PrescriptionForm = () => {
    const patients = [
        {
            id: 'patient1',
            name: 'Paciente 1',
            image: Doctor,
            diagnosis: 'Diagnóstico 1',
            age: '30',
        },
        {
            id: 'patient2',
            name: 'Paciente 2',
            image: Doctor,
            diagnosis: 'Diagnóstico 2',
            age: '40',
        },
        {
            id: 'patient3',
            name: 'Paciente 3',
            image: Doctor,
            diagnosis: 'Diagnóstico 3',
            age: '35',
          },
    ]
    const medicines = [
        {
            id: 'medicine1',
            name: 'Medicine 1', 
            quantity: '20',
            presentations: [
                { id: '500', name: '500mg' },
                { id: '1000', name: '1000mg' }
            ]
        },
        {
            id: 'medicine2',
            name: 'Medicine 2', 
            quantity: '10',
            presentations: [
                { id: '400', name: '400mg' },
                { id: '600', name: '600mg' }
            ]
        },
        {
            id: 'medicine3',
            name: 'Medicine 3', 
            quantity: '15',
            presentations: [
                { id: '400', name: '400mg' },
                { id: '600', name: '600mg' },
                { id: '1000', name: '1000mg' }
            ]
        },
    ]

    const [selectedMedicine, setSelectedMedicine] = useState(medicines[0])

    const handleMedicineChange = (e) => {
        const selected = medicines.find(medicine => medicine.id === e.target.value)
        setSelectedMedicine(selected)
    }

    return (

        <Layout>

        <section className="flex gap-6 pl-6 w-full">
            <div className="w-1/3 pt-16">                
                <ProfileResume patients={patients}/>
            </div>
            <div className="w-full">
                <h2 className="text-neutrals800 font-bold text-titulo pl-6">Receta Penincilina 1</h2>
                <form className="p-6 backdrop-blur bg-[rgba(253,239,244,0.2)] rounded-3xl flex flex-col gap-4 text-neutrals600">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="medicines" className="block mb-2 text-parrafo font-bold text-neutrals600">Medicamento *</label>
                        <select id="medicines" onChange={handleMedicineChange} className="backdrop-blur bg-[rgba(253,239,244,0.1)] inner-shadow-custom text-neutrals600 text-parrafo rounded-full block w-full p-2.5 outline-none">
                        {medicines.map(medicine => (
                            <option key={medicine.id} value={medicine.id} className='bg-[rgba(165,165,165,.2)] text-neutrals600 text-parrafo'>{medicine.name}</option>
                        ))}
                        </select>                        
                        <select id="presentations" className="backdrop-blur bg-[rgba(253,239,244,0.1)] inner-shadow-custom text-neutrals600 text-parrafo rounded-full block w-full p-2.5 outline-none">
                        {selectedMedicine.presentations.map(presentation => (
                            <option key={presentation.id} value={presentation.id} className='bg-[rgba(165,165,165,.2)] text-neutrals600 text-parrafo'>{presentation.name}</option>
                        ))}
                        </select> 
                        <img src={hearthIcon} className="w-6 h-6 self-end mt-2"/>                       
                    </div>
                    <TextAreaInput name='Indicaciones *' placeholder='Completar indicaciones' id='indications'  height='h-[120px]'/>
                    <FormInput name='Unidades *' type='text' placeholder='Completar cantidades' id='medicineQuantity' value={selectedMedicine.quantity}/>
                    <FormInput name='Fecha de Prescripción *' type='text' placeholder='Completar fecha' id='prescriptionDate' icon={calendar}/>
                    <button className="no-underline text-primary text-parrafo backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl shadow-custom w-40 py-2 self-end">Guardar</button>
                </form>
            </div>
        </section>

                    
        </Layout>
    )
}

export default PrescriptionForm