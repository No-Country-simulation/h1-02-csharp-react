import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

const Layout = ({ children }) => (
  <div className="flex w-full h-full">
    <Sidebar />
    <div className="w-full h-full">
      <Header />
      {children}
    </div>
  </div>
);

export default Layout;
