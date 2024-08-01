
const MedicalResults = ({ icon, image, title, onClick }) => {    
    return (
        <button onClick={onClick} className="no-underline text-neutrals800 w-full backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl shadow-custom">
            <div className="flex flex-col items-center justify-center gap-4 px-4 py-8 text-small rounded-3xl hover:bg-[rgba(214,86,131,0.2)] font-semibold text-neutrals800"> 
            <span>{title}</span>
            <div className="flex gap-4">
                <img src={image} alt={title}/>         
                <img src={icon} alt={title}/>
            </div>
            <button className="no-underline text-primary text-small backdrop-blur bg-[rgba(253,239,244,0.1)] rounded-3xl w-full py-2 self-center font-normal">Ver más</button>         
        </div>
        </button>
    )
}

export default MedicalResults