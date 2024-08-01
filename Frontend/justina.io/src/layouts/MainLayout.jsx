import { Outlet } from "react-router-dom";

import "../index.css";

const MainLayout = () => (
  <div
    className="
    w-full
    h-full
    justify-self-center
    items-center"
  >
    <main className="row-start-2">
      <Outlet />
    </main>
  </div>
);

export default MainLayout;
