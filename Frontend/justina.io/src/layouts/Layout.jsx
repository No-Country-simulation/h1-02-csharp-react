import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import RegisterDoctorModal from "../components/RegisterDoctorModal";
import { Suspense } from "react";

const Layout = ({ children }) => (
  <div className="flex w-full h-full">
    <Sidebar />
    <div className="w-full h-full">
      <Header />
      {children}
    </div>
    <Suspense>
      <RegisterDoctorModal />
    </Suspense>
  </div>
);

export default Layout;
