import chevronDown from "../../assets/icons/chevronDown.svg"

const RecordsList = ({title, items, itemClicked}) => {
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
        <div className='backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl py-2 px-4 w-full mb-4 shadow-custom text-neutrals800'>
            <div className="flex justify-between items-center">
                <h2 className="py-2 font-semibold text-subtitulo">{title}</h2>                              
            </div>
            <ul className='flex flex-col gap-2 mb-2 text-parrafo overflow-y-auto max-h-48 scrollbar-style'>
                {items.map((item, index) => (
                <li key={index} onClick={() => itemClicked(item)}>
                    <div className="flex items-center group backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl p-2 cursor-pointer">                    
                    <div className="flex items-center flex-grow justify-center group-hover:justify-evenly pl-2">
                        <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-[-20%]">{formatDate(item.createdDate)} - {item.title}</span>
                        <button className="flex items-center justify-center w-6 h-6 rounded-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><img src={chevronDown} /></button>
                    </div>
                    </div>
                </li>
                ))}                            
            </ul>
                   
        </div>
  )
}

export default RecordsList