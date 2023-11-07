import logo from './logo.svg';
import './App.css';
import Login from './Login/Login';
import SideBar from './Component/SideBar';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './Component/NavBar/NavBar';
import User from './Component/User/User';
import ProCategory from './Component/ProductCategory/ProCategory';
import Product from './Component/Product/Product';
import ActiveOrders from './Component/ActiveOrders/ActiveOrders';
import Tables from './Component/Tables/Tables';
import Dashboard from './Component/Dashboard/Dashboard';
import { createContext, useState } from 'react';
import Modal from './Component/User/Modal';
import { Toaster } from 'react-hot-toast';
// import { useLocation } from 'react-router-dom';

export const Context = createContext();



function App() {

  const [openSideBar, setOpenSideBar] = useState(false);

  const location = useLocation()


  return (
    <Context.Provider value={{ openSideBar: openSideBar, setOpenSideBar: setOpenSideBar }}>


      <div className="App">
        <Toaster />


        <div className='flex'>
          {location.pathname !== "/login" && <SideBar />}



          <div className='flex-1'>
            <div>
              {location.pathname !== "/login" && <NavBar />}

            </div>

            <Routes>

              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/Users' element={<User />} />
              <Route path='/productcategory' element={<ProCategory />} />
              <Route path='/product' element={<Product />} />
              <Route path='/activeorder' element={<ActiveOrders />} />
              <Route path='/tables' element={<Tables />} />
              <Route path='/login' element={<Login />} />


            </Routes>
          </div>
        </div>


      </div>
    </Context.Provider >

  );
}

export default App;
