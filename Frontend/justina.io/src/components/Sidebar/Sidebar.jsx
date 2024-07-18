import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/imgs/imagotype.webp'
import { MdHome, MdPerson, MdCalendarMonth } from "react-icons/md";
import { RiHandHeartFill } from "react-icons/ri";
import { ImExit } from "react-icons/im";
import { FaGear } from "react-icons/fa6";
//import { GiHeartPlus } from "react-icons/gi";
import justinachatbot from '../../assets/imgs/caraJustinabot.png' 


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

const Sidebar = () => {

    const [ user, setUser ] = useState(getUser());
    
    const navigate = useNavigate()

    const handleLogout = () =>{
        localStorage.removeItem('user')
        setUser(null)
        navigate('/login')
    }

    return ( 
        <div className="h-screen w-64 text-center flex flex-col items-center p-4 bg-rose-50/opacity-10  shadow-inner backdrop-blur-[25.33px justify-start gap-[13px] inline-flex">
            <div className="logo-div w-[207px] p-4 bg-rose-50/opacity-10 rounded-[32px] shadow-inner backdrop-blur-[25.33px] justify-center items-center gap-2.5">
                <img src={logo} alt="logo-corazon-justina" />
            </div>
            <div className="menu-div w-[207px] mt-3 p-4 text-left bg-rose-50/opacity-10 rounded-[32px] shadow-inner backdrop-blur-[25.33px] flex-col justify-start items-center gap-[13px] inline-flex">
                <ul>
                    <div className="px-2 py-1 mb-3 w-full bg-rose-50/opacity-20 rounded-lg  shadow-inner backdrop-blur-[25.33px] justify-start items-start gap-2 inline-flex">
                    <li className="listItem flex items-center" >
                        <MdHome className='text-pink-500 w-5'/>
                        <span className="text-base font-normal text-pink-500 font-['Noto Sans'] leading-tight">Inicio</span> 
                    </li>
                    </div>
                    <div className="px-2 py-1 mb-3 w-full bg-rose-50/opacity-20 rounded-lg  shadow-inner backdrop-blur-[25.33px] justify-start items-start gap-2 inline-flex">
                        <li className="listItem flex items-center">
                        <MdCalendarMonth />
                        <span className="text-base font-normal  font-['Noto Sans'] leading-tight">
                            Agenda
                        </span>
                        </li>
                    </div>
                    <div className="px-2 py-1 mb-3 w-full bg-rose-50/opacity-20 rounded-lg  shadow-inner backdrop-blur-[25.33px] justify-start items-start gap-2 inline-flex">
                        <li className="listItem flex items-center">
                        <MdPerson />
                        Pacientes</li>
                    
                    </div>
                    <div className="px-2 py-1 mb-3 w-full bg-rose-50/opacity-20 rounded-lg  shadow-inner backdrop-blur-[25.33px] justify-start items-start gap-2 inline-flex">
                    <li className="listItem flex items-center">
                        <RiHandHeartFill />
                        <span>Trasplante cruzado</span>
                    </li>
                    </div>
                </ul>
            </div>

            <div className="w-[207px] p-4 bg-rose-50/opacity-10 rounded-[32px]  shadow-inner backdrop-blur-[25.33px] flex-col justify-start items-center gap-[13px] inline-flex">
                <div className="px-2 py-1 w-full bg-rose-50/opacity-20 rounded-lg  shadow-inner backdrop-blur-[25.33px] justify-start items-start gap-2 inline-flex">
                    <div className="w-[104px] text-base font-normal font-['Noto Sans'] leading-tight flex items-center">
                        <FaGear />
                        <span>Atajos</span> 
                    </div>
                </div>
                <div className="px-2 py-1 w-full bg-rose-50/opacity-20 rounded-lg  shadow-inner backdrop-blur-[25.33px] justify-start items-start gap-2 inline-flex">
                    <div className="w-[104px] text-base font-normal font-['Noto Sans'] leading-tight flex items-center"  onClick={handleLogout}>
                        <ImExit />
                        <span>Salir</span>
                    </div>
                </div>
            </div> 
            <br />
            <div className="w-[207px] p-4 mb-3 bg-rose-50/opacity-10 rounded-[32px]  shadow-inner backdrop-blur-[25.33px] flex-col justify-start items-center gap-[13px] inline-flex">
                <div className="w-[104px] text-base font-normal font-['Noto Sans'] leading-tight flex items-center">
                    <span>¿Necesitas ayuda?</span>
                </div>
                <img className='w-12' src={justinachatbot} alt="" />
            </div>

            {/*
            <div className="settings-div m-3 w-full">
                <ul>
                    <li>Atajos</li>
                    <li>Salir</li>
                </ul>
            </div>*/}
        </div>
     );
}
 
export default Sidebar;