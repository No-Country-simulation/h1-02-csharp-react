import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

const Layout = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <div className="w-full">
      <Header />
      {children}
    </div>
  </div>
);

export default Layout;
