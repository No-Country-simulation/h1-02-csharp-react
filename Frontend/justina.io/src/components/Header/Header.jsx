import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { IoMdNotifications } from "react-icons/io";


function getUser(){
    let user = localStorage.getItem('user');
    if(user){
        user = JSON.parse(user);
    }
    else{
        user = null;
    }
    return user
}


const Header = ({nombre}) => {

    const [ user, setUser ] = useState(getUser());
    
    const navigate = useNavigate()

    const handleLogout = () =>{
        localStorage.removeItem('user')
        setUser(null)
        navigate('/login')
    }

    return ( 
        <>
     
        <div className="contenido w-[1344px] h-[126px] justify-between items-start inline-flex">

            <div className="w-[449.24px] pr-[36.24px] p-4 bg-neutral-50/opacity-10 rounded-2xl ">
                <div className="w-12 self-stretch justify-center items-center inline-flex">
                    <img className="w-8 h-8 rounded-full shadow-inner backdrop-blur-[25.33px]" src="https://via.placeholder.com/48x48" />
                
                </div>
                <p className="text-neutral-600 text-[40px] font-bold font-['Noto Sans'] leading-[48px]">Buen día doctor </p>
                <p className="text-neutral-600 text-base font-normal font-['Noto Sans'] leading-tight">Revisa el progreso de los pacientes y los tratamientos</p>
            
            </div>
            
            <div className="mt-6 flex justify-center items-center">
            <div className="w-11 h-11 p-2.5 bg-rose-50/opacity-10 rounded-[48px] shadow-inner backdrop-blur-[25.33px] justify-start items-center gap-2.5 inline-flex">
                <div className="w-6 h-6 relative" />
                    <IoMdNotifications className="w-full text-[40px]"/>
                </div> 

                <div className="w-[321px] h-14 px-4 py-2 bg-rose-50/opacity-10 rounded-[32px] shadow-inner backdrop-blur-[25.33px] justify-between items-center inline-flex">
                    <div className="w-10 h-10 justify-center items-center flex">
                        <img className="w-10 h-10 rounded-full shadow-inner backdrop-blur-[25.33px]" src="https://via.placeholder.com/40x40" />
                    </div>
                    <div className="justify-center items-center gap-2.5 flex">
                        <div className="text-neutral-600 text-base font-normal font-['Noto Sans'] leading-tight">
                            Dra. Ana Maria Reyes
                        </div>
                    </div>
                </div> 
             {/*user.email}
            <button className="bg-indigo-800 py-1 px-4 rounded-lg text-white w-fit" onClick={handleLogout}>Salir</button>*/}
            </div>
        </div>

        </>
     );
}
 
export default Header;