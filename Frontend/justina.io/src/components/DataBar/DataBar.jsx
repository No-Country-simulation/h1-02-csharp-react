
const DataBar = () => {
    
    const data = [
        {
            titulo:"Enfermedad crónica",
            dato:"Hipertensión",
        },{
            titulo:"Medicación crónica",
            dato:"Si"
        },{
            titulo:"Tipo Sanguineo",
            dato:"RH-"
        }
    ];
    return ( 
    
        <>
        <div className="w-[95%] text-center items-center p-2 mx-2 inline-flex rounded-[32px] shadow-custom bg-[rgba(253,239,244,0.1)] backdrop-blur-[12px] justify-around">
            {data.map((item, index) => (
                <div key={index}>
                    <p className="text-neutrals800 text-parrafo font-semibold">{item.titulo}</p>
                    <p className="text-neutrals800 text-small">{item.dato}</p>
                </div>
            ))}
        </div>
        </> 
    
    );
}
 
export default DataBar;