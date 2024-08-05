import medicine from "../../assets/icons/medication.png";
import calendar from "../../assets/icons/calendarheart.png";
import other from "../../assets/icons/other.png";
import sport from "../../assets/icons/sport.png";
import food from "../../assets/icons/food.png";
import success from "../../assets/icons/success.png";
import trash from "../../assets/icons/trash.png";


const Task = ({id, texto, completada, completarTarea, eliminiarTarea, category}) => {
    
    const getCategoryIcon = (category) => {
        switch (category) {
            case 0:
                return medicine;
            case 1:
                return calendar;
            case 2:
                return sport;
            case 3:
                return food;
            case 4:
                return other;
            default:
                return other;
        }
    };


    return ( 
         <tr className={`flex items-center border rounded-[32px] shadow-transparent text-small my-2 text-neutrals800 ${completada ? 'bg-slate-500 bg-opacity-50 line-through' : 'bg-[rgba(253,239,244,0.4)]' }`}>  
            <td className="">
                <div className="w-[40px] h-[40px] shadow-glass-effect rounded-full flex items-center justify-center">
                    <img src={getCategoryIcon(category)} alt="" />
                </div>
            </td>
            <td className="px-6 w-full">
                {texto}
            </td>
            <td className="inline-flex pr-2">
                {!completada && (
                    <div className="bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
                        onClick={() => completarTarea(id)}>
                        <img className="" src={success} alt="" />
                    </div>

                )}
                
                <div className="bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center"
                    onClick={() => eliminiarTarea(id)}>
                    <img className="" src={trash} alt="" />
                </div>
            </td>           
        </tr>
        
     );
}
 
export default Task;