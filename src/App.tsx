import clsx from "clsx";
import { Home } from "./pages/Home";
import { useState, useEffect } from "react";
import LoadingPage from "./pages/Loadingpage";
import Menu from './pages/Menu'
import { Park } from "./pages/Park";
import { Routes, Route } from "react-router-dom";
import styles from './index.module.scss'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to showcase the loading animation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className={clsx(styles.app)}>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Routes>
            <Route index path="/" element={<Menu />} />
            <Route path="/cafe" element={<Home />} />
            <Route path='/park' element={<Park />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;