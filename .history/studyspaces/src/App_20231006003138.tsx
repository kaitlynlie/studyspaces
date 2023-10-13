import clsx from "clsx";
import { Home } from "./pages/Home";
import { useState, useEffect } from "react";
import LoadingPage from "./Loadingpage";
import Menu from './Menu'
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate a delay to showcase the loading animation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className={clsx("app", "w-full overflow-hidden")}>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Routes>
            <Route index path="/" element={<Menu />} />
            <Route path="/cafe" element={<Home />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;