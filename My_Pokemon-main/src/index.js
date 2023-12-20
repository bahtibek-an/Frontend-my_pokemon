import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PokeInfo from './Components/PokeInfo'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/pokemon-details/:id" element={<PokeInfo/>}/>
      </Routes>
    </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

