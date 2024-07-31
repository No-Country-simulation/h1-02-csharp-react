import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'
import { Outlet } from 'react-router-dom'

import '../index.css'

const Layout = () => {
    return (     
        <section className="flex">
            <Sidebar/>
            <div className='w-full'>
                <Header/>
                <Outlet />
            </div>
        </section>    
     )
}
 
export default Layout