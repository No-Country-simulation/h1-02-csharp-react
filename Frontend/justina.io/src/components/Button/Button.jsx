
export default function Button({text}){
    return(
        <button className='flex justify-between items-center border gap-2 rounded-xl overflow-hidden xl:border-black xl:bg-neutral-900'>
            <p className='pl-3'>{text}</p>
           
    </button>
    )

}