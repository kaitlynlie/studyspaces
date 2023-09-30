import clsx from "clsx";
import { Route, Routes } from 'react-router-dom'
import React from "react";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <div className={clsx("app", "w-full overflow-hidden")}>
          {/* <img
            src={tracks}
            alt='tracks'
            className={clsx(styles.tracks)}
          />
        // <Navbar /> */}
        <Routes>
          <Route index path="/" element={<Home />} />
          {/* <Route path="about" element={<About />} />
          <Route path="membership" element={<Membership />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="blog" element={<Blog />} />
          <Route path="careers" element={<Careers />} />
          <Route path='blog2' element={<Blog2 />} /> */}
      </Routes>
      </div>
    </>
  )
  }

export default App;
