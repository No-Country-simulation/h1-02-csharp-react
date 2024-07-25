import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
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

    const menu = [{
        icono: <MdHome/>,
        texto: 'Inicio',
        link: '/home'
    }, {
        icono:<MdPerson />,
        texto: 'Pacientes',
        link:'/listado-pacientes'
    },{
        icono: <MdCalendarMonth />,
        texto: 'Agenda',
        link:''
    },{
        icono:<RiHandHeartFill />,
        texto: 'Trasplante cruzado',
        link:''
    },

    ];

 
    const [enlaceActivo, setEnlaceActivo] = useState('Inicio');
    const manejarCambioEnlace = (nombreEnlace) => {
        setEnlaceActivo(nombreEnlace);
      };


    const handleLogout = () =>{
        localStorage.removeItem('user')
        setUser(null)
        navigate('/login')
    }

    return ( 
        <div className="h-screen w-64 text-center flex flex-col items-center p-4 bg-rose-50/opacity-10  shadow-inner backdrop-blur-[25.33px justify-start gap-[13px] inline-flex">

            <div className="logo-div w-52 p-4 flex items-center justify-center rounded-[32px] bg-[rgba(253,239,244,0.4)] shadow-custom ">
                <img src={logo} alt="logo-corazon-justina" />
            
            </div>
            
            <div className="menu-div w-52 mt-3 p-4 text-left bg-rose-50/opacity-10 rounded-[32px] bg-[rgba(253,239,244,0.4)] shadow-custom flex-col justify-start items-center gap-[13px] inline-flex">
            {menu.map((item, index) => (
                 <div 
                    className={`px-2 py-1 w-full bg-rose-50/opacity-20 rounded-lg shadow-inner backdrop-blur-[25.33px] justify-start items-center gap-2 inline-flex hover:bg-[rgba(214,86,131,0.2)] ${enlaceActivo === item.texto ? 'active' : ''}`}
                    onClick={() => manejarCambioEnlace(item.texto)}
                    key={index}>
                    {item.icono}
                    <Link to={item.link}>{item.texto}</Link>
                  
                </div>
            ))}

            </div>

            <div className="w-[207px] p-4 bg-rose-50/opacity-10 rounded-[32px] bg-[rgba(253,239,244,0.4)] shadow-custom flex-col justify-start items-center gap-[13px] inline-flex">
                <div className="px-2 py-1 w-full bg-rose-50/opacity-20 rounded-lg shadow-inner backdrop-blur-[25.33px] justify-start items-center gap-2 inline-flex hover:bg-[rgba(214,86,131,0.2)]">
                        <FaGear />
                        <span>Atajos</span> 
                </div>
                
                <div className="px-2 py-1 w-full bg-rose-50/opacity-20 rounded-lg  shadow-inner backdrop-blur-[25.33px] justify-start items-start gap-2 inline-flex hover:bg-[rgba(214,86,131,0.2)]" onClick={handleLogout}>
                    <ImExit />
                    <span>Salir</span>
                </div>
            </div> 

            <br />
            <div className="w-[207px] p-4 mb-3 bg-rose-50/opacity-10 rounded-[32px]  bg-[rgba(253,239,244,0.4)] shadow-custom flex-col justify-start items-center gap-[13px] inline-flex">
                <div className="w-[104px] text-base font-normal font-['Noto Sans'] leading-tight flex items-center">
                    <span>¿Necesitas ayuda?</span>
                </div>
                <img className='w-12' src={justinachatbot} alt="" />
            </div>
        </div>
     );
}
 
export default Sidebar;