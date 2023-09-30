import clsx from "clsx";
import { Home } from "./pages/home";
import About from './pages/About'
import Membership from "./pages/Membership";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Blog2 from "./pages/Blog2";
import { Navbar } from "./components";
import { Route, Routes } from 'react-router-dom'
import React from "react";
import { tracks } from "./assets";
import styles from "../src/pages/home.module.scss";

function App() {
  return (
    <>
      <div className={clsx("app", "w-full overflow-hidden")}>
          {/* <img
            src={tracks}
            alt='tracks'
            className={clsx(styles.tracks)}
          />
        <Navbar /> */}
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="membership" element={<Membership />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="blog" element={<Blog />} />
          <Route path="careers" element={<Careers />} />
          <Route path='blog2' element={<Blog2 />} />
      </Routes>
      </div>
    </>
  )
  }

export default App;
