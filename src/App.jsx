import React from "react";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import Github from "./components/Github";

const App = () => {
  return <><LandingPage />
  <Routes>
    <Route path="" element={<LandingPage />} />
   <Route path="/github" element={<Github />} />
  </Routes></>;
};

export default App;
