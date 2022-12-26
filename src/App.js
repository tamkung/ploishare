//import './css/App.css';
import HomeLogin from './components/HomeLogin';
import Vertify from './page/Vertify';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <HomeLogin />
    //   </header>

    // </div>
    <BrowserRouter>
      <Routes>
       
          <Route index element={<HomeLogin />} />
          <Route path="/vertify" element={<Vertify />} />
     
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
