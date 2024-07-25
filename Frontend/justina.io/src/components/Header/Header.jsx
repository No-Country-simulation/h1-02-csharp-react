import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { IoMdNotifications, IoIosArrowDown, IoIosArrowUp  } from "react-icons/io";
import { Link } from 'react-router-dom'


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


const Header = () => {

    const [ user, setUser ] = useState(getUser());
    
    const navigate = useNavigate()

    const handleLogout = () =>{
        localStorage.removeItem('user')
        setUser(null)
        navigate('/login')
    }

    const [ open, setOpen ] = useState(false);

    return ( 
         
        <div className="justify-between h-36 items-center flex">

            <div className="pr-[36.24px] p-4 bg-neutral-50/opacity-10 rounded-2xl ">
                {/*<div className="w-12 self-stretch justify-center items-center inline-flex">
                    <img className="w-8 h-8 rounded-full shadow-inner backdrop-blur-[25.33px]" src="https://via.placeholder.com/48x48" />
                
                </div>*/}
                <p className="text-neutral-600 text-[40px] font-bold font-['Noto Sans'] leading-[48px]">Buen día doctor </p>
                <p className="text-neutral-600 text-subtitulo font-normal font-['Noto Sans'] leading-tight">Revisa el progreso de los pacientes y los tratamientos</p>
            </div>
            
            <div className="mt-6 flex justify-center items-center">
                <div className="w-11 h-11 p-2.5 bg-rose-50/opacity-10 rounded-[48px] bg-[rgba(253,239,244,0.4)] shadow-custom  justify-start items-center gap-2.5 inline-flex">
                        <IoMdNotifications className="w-full text-[40px]"/>
                </div> 

                <div className="h-11 px-4 py-2 bg-rose-50/opacity-10 rounded-[32px] bg-[rgba(253,239,244,0.4)] shadow-custom justify-between items-center relative inline-flex">
                    <div className="justify-center items-center gap-2.5 flex text-neutral-600" onClick={() => setOpen((prev) => !prev)}>
                        Dra. Ana Maria Reyes
                        {!open ? (
                            <IoIosArrowDown className=""/>
                        ) : (
                            <IoIosArrowUp />
                        )}
                         
                    </div>
                    {open && (
                    <div className="absolute right-0 top-10 mt-2 w-full  rounded-md shadow-lg bg-[rgba(253,239,244,0.4)] shadow-custom  focus:outline-none">
                    <div className="py-1">
                        <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-[rgba(214,86,131,0.2)]" to="/perfil-medico">
                            Perfil
                        </Link>
                        <form method="POST" action="#" role="none">
                            <button type="submit" className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[rgba(214,86,131,0.2)] " role="menuitem" tabIndex="-1" onClick={handleLogout}>
                                Salir
                            </button>
                        </form>
                    </div>
                    </div>
                )}

                </div> 

                

             
             {/*user.email}*/}
            </div>
        </div>
     );
}
 
export default Header;