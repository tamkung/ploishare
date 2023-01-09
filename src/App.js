import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { setupIonicReact } from '@ionic/react';

import HomeLogin from './components/HomeLogin';
import Vertify from './page/Vertify';
import Booking from './page/Booking';
import NotFound from './page/PageNotFound';
import ReactDOM from "react-dom/client";
import ConfirmSuccess from "./page/ConfirmSuccess";
import HomeAdmin from "./components/admin/HomeAdmin";
import ContentRental from "./components/admin/ContentRental";
import ContentCar from "./components/admin/ContentCar";
import IndexAdmin from "./components/admin/IndexAdmin";
import UploadImg from "./components/upload";

import Header from './components/admin/Header'
import MenuSideBar from './components/admin/MenuSideBar'
import Footer from './components/admin/Footer'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import './css/Disable.css';


// /* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

// /* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

setupIonicReact({
  mode: 'md'
});

function App() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const type = localStorage.getItem("type");
    // console.log(type);
    if (type !== null) {
      setAdmin(type);
    } else {
      setAdmin(null);
    }

  }, []);

  return (
    <div>

      {admin == 'admin' ?
        <div>
          <div className='d-none d-sm-block'>
            <Header />
            <MenuSideBar />
            <div className="content-wrapper">
              <Routes>
                <Route index element={<IndexAdmin />} />
                <Route path="/admin-listcar" element={<ContentCar />} />
                <Route path="/admin-listrental" element={<ContentRental />} />
                <Route path="/upload" element={<UploadImg />} />
              </Routes>
            </div>
            <Footer />
          </div>
          <div className='container d-lg-none d-xl-none d-md-none'>
            <div className='disable-nonti'>ระบบ Admin ไม่รองรับอุปกรณ์มือถือ</div>
          </div>
        </div>
        : admin == 'user' ?
          <Routes>
            <Route index element={<Booking />} />
            <Route path="/vertify" element={<Vertify />} />
            <Route path='*' element={<NotFound />} />
            <Route path="/confirm/:email" element={<ConfirmSuccess />} />
          </Routes>
          : <Routes>
            <Route index element={<HomeLogin />} />
          </Routes>}


      {/* <Route path="/booking" element={<Booking />} /> */}

      {/* <Route path="/admin" element={<IndexAdmin />} /> */}
    </div >
  );
}

export default App;
