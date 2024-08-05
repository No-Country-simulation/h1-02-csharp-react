import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </div>
);

export default MainLayout;
