import { React } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Main from "./components/Main.js";
import FoodPage from "./components/FoodPage.js";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:fdcId" element={<FoodPage />} />
      </Routes>
    </>
  );
}

export default App;
