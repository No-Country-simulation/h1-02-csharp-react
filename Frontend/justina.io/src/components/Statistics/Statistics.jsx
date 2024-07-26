import { useState } from 'react'
import CircularProgressBar from './CircularProgressBar'

const colors = {
  adherence: '#4A56AC',
  patientsQ: '#4e4949',
  drugs: '#AF9F53',
  quantity: '#A3CBBD',
  treatments: '#D58B48',
}

const data = {
  adherence: 35,
  patientsQ: 50,
  drugs: 35,
  quantity: 25,
  treatments: 40,
}

const Statistics = () => {
  const [selected, setSelected] = useState({
    adherence: true,
    patientsQ: true,
    drugs: true,
    quantity: true,
    treatments: true,
  })

  const handleCheckboxChange = (key) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const calculatePercentage = (part, total) => (total === 0 ? 0 : (part / total) * 100)

  return (
    <section className="p-4 flex flex-col justify-center items-center text-neutrals800 text-subtitulo">
      <h2 className="font-semibold mb-4">Estadísticas</h2>
      <div className="w-full mb-4 backdrop-blur bg-[rgba(253,239,244,0.2)] rounded-3xl p-4 flex flex-col">
        <div className="flex items-center">
          <div
            className={`w-5 h-5 border-2 border-gray-300 inline-block cursor-pointer ${selected.adherence ? 'bg-[#4A56AC]' : ''}`}
            onClick={() => handleCheckboxChange('adherence')}
          />
          <label htmlFor="adherence-checkbox" className="ms-2 text-balance leading-tight">
            Porcentaje de pacientes <span className="font-bold">que se adhieren</span> correctamente al tratamiento.
          </label>
        </div>
        <div className="mb-2 flex items-center">
          <div
            className={`w-5 h-5 border-2 border-gray-300 inline-block cursor-pointer ${selected.patientsQ ? 'bg-[#4e4949]' : ''}`}
            onClick={() => handleCheckboxChange('patientsQ')}
          />
          <label htmlFor="patientsQ-checkbox" className="ms-2">
            Total de <span className="font-bold">pacientes</span>.
          </label>
        </div>
        <div className="self-center pt-4">
          <CircularProgressBar
            datasets={[
              { percentage: 100, color: colors.patientsQ },
              { percentage: calculatePercentage(data.adherence, data.patientsQ), color: colors.adherence }
            ]}
          />
        </div>
      </div>
      <div className="w-full flex flex-col backdrop-blur bg-[rgba(253,239,244,0.2)] rounded-3xl p-4">
        <label className="inline-flex items-center cursor-pointer justify-center py-2">
          <input type="checkbox" value="" className="sr-only peer"/>
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>           
        </label> 
        <div className="flex items-center">
          <div
            className={`w-5 h-5 border-2 border-gray-300 inline-block cursor-pointer ${selected.drugs ? 'bg-[#AF9F53]' : ''}`}
            onClick={() => handleCheckboxChange('drugs')}
          />
          <label htmlFor="drugs-checkbox" className="ms-2">
            Medicamento <span className="font-bold">más usado</span>.
          </label>
        </div>
        <div className="flex items-center">
          <div
            className={`w-5 h-5 border-2 border-gray-300 inline-block cursor-pointer ${selected.quantity ? 'bg-[#A3CBBD]' : ''}`}
            onClick={() => handleCheckboxChange('quantity')}
          />
          <label htmlFor="quantity-checkbox" className="ms-2">
            <span className="font-bold">Cantidad</span> de medicamentos.
          </label>
        </div>
        <div className="mb-2 flex items-center">
          <div
            className={`w-5 h-5 border-2 border-gray-300 inline-block cursor-pointer ${selected.treatments ? 'bg-[#D58B48]' : ''}`}
            onClick={() => handleCheckboxChange('treatments')}
          />
          <label htmlFor="treatments-checkbox" className="ms-2">
            <span className="font-bold">Total</span> de tratamientos.
          </label>
        </div>
        <div className="self-center pt-4">
          <CircularProgressBar
            datasets={[
              { percentage: 100, color: colors.treatments },
              { percentage: calculatePercentage(data.quantity, data.treatments), color: colors.quantity },
              { percentage: calculatePercentage(data.drugs, data.treatments), color: colors.drugs }
            ]}
          />
        </div>
      </div>
    </section>
  )
}

export default Statistics
