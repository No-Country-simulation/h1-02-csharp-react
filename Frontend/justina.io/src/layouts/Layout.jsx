import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'

const Layout = ({children}) => {
    return ( 
        

        <div className="fondo-home flex">
            <Sidebar/>
            <div className='w-full'>
                <Header/>
                {children}
            </div>
            

            {/**/}
            
        </div>
        
        
     );
}
 
export default Layout;