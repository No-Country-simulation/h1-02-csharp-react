
//import { useNavigate } from 'react-router-dom'
import Layout from "../../layouts/Layout"
import DrDashboardContainer from "../DrDashboard/DrDashboardContainer";


const Home = () => {
    //const navigate = useNavigate()

    return ( 
       <Layout>
            <DrDashboardContainer/>

       </Layout>
        

     )
};
 
export default Home;