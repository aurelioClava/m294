import React from 'react';
import './App.css';

import { RouterProvider } from "react-router-dom";
import { router } from "./router";


function App() {
  return (
    <>
      <Navbar />
      {/* <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/kurse" element={<Table />} />
        <Route path="/kurse/edit/:id" element={<AddForm />} />
        <Route path="/kurse/add/" element={<AddForm />} /> 
      </Routes> */}
      <RouterProvider router={router} />
    </>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
        <ul>
            <li><a href="#lehrbetriebe">Lehrbetriebe</a></li>
            <li><a href="#lernende">Lernende</a></li>
            <li><a href="#länder">Länder</a></li>
            <li><a href="#dozenten">Dozenten</a></li>
            <li><a href="kurse">Kurse</a></li>
        </ul>
    </nav>
  );
}

export default App;