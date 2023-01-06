//import './css/App.css';
import HomeLogin from './components/HomeLogin';
import Vertify from './page/Vertify';
import Booking from './page/Booking';
import NotFound from './page/PageNotFound';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { setupIonicReact } from '@ionic/react';
import React, { useState, useEffect } from "react";

// /* Core CSS required for Ionic components to work properly */
// import '@ionic/react/css/core.css';

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
  const [currentUser, setCurrentUser] = useState(undefined);
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <HomeLogin />
    //   </header>

    // </div>
    <BrowserRouter>

      <Routes>
        {currentUser ? <Route index element={<Booking />} /> : <Route index element={<HomeLogin />} />}
        <Route path="/vertify" element={<Vertify />} />
        <Route path='*' element={<NotFound />} />
        {/* <Route path="/booking" element={<Booking />} /> */}
        
      </Routes>

    </BrowserRouter>
  );
}

export default App;
