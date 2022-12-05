import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./components/Contact";
import Issues from "./components/Issue/Issues";
import Navigation from "./components/Navigation";
//import contact from "./components/Contact";

const Routers = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navigation />

        <Routes>
          <Route path="/" element={<Contact />}></Route>
          <Route path="/issues" element={<Issues></Issues>}></Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};
export default Routers;
