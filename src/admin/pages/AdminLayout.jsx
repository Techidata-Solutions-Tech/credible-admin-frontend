import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className='min-h-screen'>
      <Navbar/>
      <div className='flex flex-col md:flex-row bg-gray-100'>
        <Sidebar/>
        <div className='flex-1 overflow-y-auto m-1 '>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;