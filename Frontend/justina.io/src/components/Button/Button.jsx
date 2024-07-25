
export default function Button({icon, text, onClick}){
    return(
        <button className='h-10 flex justify-between items-center border gap-2 rounded-[32px] bg-[rgba(253,239,244,0.4)] shadow-custom text-parrafo py-1 px-4  text-primary w-fit '
        onClick={onClick}>
            <span>{icon}</span>
            <p className='pl-3'>{text}</p>
           
        </button>
    )

}