import medicine from "../../assets/icons/medication.png";
import calendar from "../../assets/icons/calendarheart.png";
import other from "../../assets/icons/other.png";

import sport from "../../assets/icons/sport.png";
import food from "../../assets/icons/food.png";

import success from "../../assets/icons/success.png";
import trash from "../../assets/icons/trash.png";



const ToDoList = () => {
    return ( 

        <>
        <div>

            <table className="table-auto ">
                <thead className="h-auto text-small text-neutrals800">
                    <tr className="flex items-center border rounded-[32px] bg-[rgba(253,239,244,0.4)] shadow-transparent ">
                        <th className="">
                            <p className="w-[60px] h-[60px] bg-[#dd93ad] rounded-full shadow-inner backdrop-blur-[25.33px] flex items-center">
                                1 de Agosto</p> 
                        </th>
                        <th className="px-3 inline-flex items-center justify-around gap-2">
                            <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center">
                                <img className="" src={food} alt="" />
                            </div>
                            <p>Alimentación</p> 
                        </th>
                        <th className="px-3 inline-flex items-center justify-around gap-2">
                            <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center">
                                <img className="" src={sport} alt="" />
                            </div>
                            <p>Deporte</p> 
                            
                        </th>
                        <th className="px-3 inline-flex items-center justify-around gap-2">
                            <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center
                            ">
                                <img className="" src={medicine} alt="" />
                            </div>
                            <p>Medicación</p> 
                        </th>
                        <th className="px-3 inline-flex items-center justify-around gap-2">
                            <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center">
                                <img className="" src={calendar} alt="" />
                        </div>
                            <p>Turnos</p> 
                            
                        </th>
                        <th className="px-3 inline-flex items-center justify-around gap-2">
                            <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center">
                                <img className="" src={other} alt="" />
                            </div>
                            <p>Otros</p> 
                            
                        </th>
                    </tr>
                </thead>
                <tbody className="mt-2 items-center text-small">
                    <tr className="flex items-center border rounded-[32px] bg-[rgba(253,239,244,0.4)] shadow-transparent text-small my-2 text-neutrals800">
                        <td className="">
                            <div className="w-[40px] h-[40px] shadow-glass-effect rounded-full flex items-center justify-center">
                                <img src={food} alt="" />
                            </div>
                        </td>
                        <td className="px-6 w-full">
                            Comer Pepino
                        </td>
                        <td className="inline-flex pr-2">
                            <div className="bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center">
                                <img className="" src={success} alt="" />
                            </div>
                            <div className="bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center">
                                <img className="" src={trash} alt="" />
                            </div>
                        </td>
                        
                    </tr>
                    <tr className="h-auto flex items-center border rounded-[32px] bg-[rgba(253,239,244,0.4)] shadow-transparent text-small my-2 text-neutrals800">
                        <td>
                            <div className="w-[40px] h-[40px] shadow-glass-effect rounded-full flex items-center justify-center">
                                <img  src={sport} alt="" />
                            </div>
                        </td>
                        <td className="px-6 w-full" >
                            Saltar la cuerda 10 minutos
                        </td>
                        <td className="inline-flex pr-2">
                            <div className="bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center">
                                <img className="" src={success} alt="" />
                            </div>
                            <div className="bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center">
                                <img className="" src={trash} alt="" />
                            </div>
                        </td>
                    </tr>
                  
                </tbody>

            </table>

        </div>
        
        </>
     );
}
 
export default ToDoList;