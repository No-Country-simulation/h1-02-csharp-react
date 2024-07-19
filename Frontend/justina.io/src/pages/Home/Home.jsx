
//import { useNavigate } from 'react-router-dom'
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import DrDashboardContainer from "../DrDashboard/DrDashboardContainer";



const Home = () => {

    
    //const navigate = useNavigate()


    return ( 
        <div className="fondo-home flex">
            <Sidebar/>
            <div>
            <Header/>
            <DrDashboardContainer/>
            </div>
            

            {/**/}
            
        </div>


     )
};
 
export default Home;