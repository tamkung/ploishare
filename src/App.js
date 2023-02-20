import React, { useState, useEffect } from "react";
import { Routes, Route,useNavigate } from "react-router-dom";
import { setupIonicReact } from '@ionic/react';

import { RouteAdmin } from "./routes/AdminRoutes";
import { RouteUser } from "./routes/UserRoutes";
import { RoutePublic } from "./routes/PublicRoutes";
import IndexUser from "./page/IndexUser";

import LoHeader from './layout/LoHeader'
import LoNavbar from './layout/LoNavbar'
import LoFooter from './layout/LoFooter'
import MenuButton from './layout/LoMenu'

import { GET_USER } from "./Constant";
import callAPI from "./service/CallAPI";

import './css/Disable.css';
import './css/AdminStyle.css';
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
  const navigate = useNavigate();

  useEffect(() => {
    callAPI();
    console.log(GET_USER);
    if (GET_USER === null) {
      setAdmin(null);
    } else {
      console.log(GET_USER.type);
      if (GET_USER.type !== null) {
        setAdmin(GET_USER.type);
      } else {
        setAdmin(null);
      }
    }

  }, []);

  return (
    <div>
      {admin === 'admin' ?
        <div>
          <LoHeader />
          <LoNavbar />
          <div className="content-wrapper">
            <Routes>
              {RouteAdmin.map(({ path, element }, key) => {
                return <Route index path={path} element={element} key={key} />;
              })}
            </Routes>
          </div>
          <LoFooter />
        </div>
        : admin === 'user' ?
          <div>
            <Routes>
              {RouteUser.map(({ path, element }, key) => {
                return <Route index path={path} element={element} key={key} />;
              })}
            </Routes>
            <MenuButton />
          </div>
          : <Routes>
            {RoutePublic.map(({ path, element }, key) => {
              return <Route index path={path} element={element} key={key} />;
            })}
          </Routes>}
    </div >
  );
}

export default App;
