import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { setupIonicReact } from '@ionic/react';

import HomeLogin from './components/HomeLogin';
import Vertify from './page/Vertify';
import Booking from './page/Booking';
import NotFound from './page/PageNotFound';
import ReactDOM from "react-dom/client";
import ConfirmSuccess from "./page/ConfirmSuccess";
import HomeAdmin from "./components/admin/backup/HomeAdmin";
import ContentRental from "./components/admin/ContentRental";
import ContentCar from "./components/admin/ContentCar";
import IndexAdmin from "./components/admin/IndexAdmin";
import UploadImg from "./components/upload";
import SignOut from "./components/auth/SignOut";

import LoHeader from './layout/LoHeader'
import LoNavbar from './layout/LoNavbar'
import LoFooter from './layout/LoFooter'

import './css/Disable.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

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
            <LoHeader />
            <LoNavbar />
            <div className="content-wrapper">
              <Routes>
                <Route index element={<IndexAdmin />} />
                <Route path='*' element={<NotFound />} />
                <Route path="/listcar" element={<ContentCar />} />
                <Route path="/listrental" element={<ContentRental />} />
                <Route path="/upload" element={<UploadImg />} />
              </Routes>
            </div>
            <LoFooter />
          </div>
          <div className='container d-lg-none d-xl-none d-md-none'>
            <div className='disable-nonti'>???????????? Admin ??????????????????????????????????????????????????????????????????
              <button className="buttonNext" onClick={SignOut}>Logout</button>
            </div>
          </div>
        </div>
        : admin == 'user' ?
          <Routes>
            <Route index element={<Booking />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          : <Routes>
            <Route index element={<HomeLogin />} />
            <Route path='*' element={<NotFound />} />
            <Route path="/vertify" element={<Vertify />} />
            <Route path="/confirm/:email" element={<ConfirmSuccess />} />
          </Routes>}
    </div >
  );
}

export default App;
