import { Outlet } from 'react-router-dom'

import '../index.css'

const MainLayout = () => (
  <div className='
    w-full
    h-full
    justify-self-center
    items-center
    grid-cols-1
    grid-rows-[1fr,auto,1fr]
    lg:grid-rows-[1r,auto,1fr]'
  >
    <main className='row-start-2'>
      <Outlet />
      
    </main>
  </div>
)

export default MainLayout