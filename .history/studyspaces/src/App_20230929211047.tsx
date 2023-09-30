import clsx from "clsx";
import { Route, Routes } from 'react-router-dom'
import React from "react";
import { Home } from "./pages/Home";
import { Navbar } from "./pages";

function App() {
  return (
    <>
      <div className={clsx("app", "w-full overflow-hidden")}>
        <Navbar />
        <Home />
      </div>
    </>
  )
  }

export default App;
