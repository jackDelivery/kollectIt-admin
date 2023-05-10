
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard/Dashboard'
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreProvider } from './ContextApi';
import Login from './Pages/Login/Login';
import { Url } from './Pages/Core';



function App() {

  const [Role, setRole] = useState([])
  // console.log(Role, "Rollll");
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: Url,
  //   }).then(response => {
  //     setRoll(response.data.Data)
  //   }).catch(() => {

  //   })
  // }, [])


  return (
    <div>

      <StoreProvider value={{ Role, setRole }}>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Login />} />
            {/* <Route path="/clientdata" element={<ClientData />} />
            <Route path="/paymentdata" element={<PaymentData />} />
            <Route path="/csvfileupload" element={<CsvfileUpload />} /> */}
          </Routes>
        </BrowserRouter>
      </StoreProvider >

    </div>
  );
}

export default App;
