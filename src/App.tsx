import clsx from "clsx";
import { Home } from "./pages/Home";
import { Navbar } from "./pages";
import { useState, useEffect } from "react";
import LoadingPage from "./Loadingpage";

function App() {
  const [isLoading, setIsLoading] = useState(true);

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
      <Navbar />
      <Home />
      </>
      )}
    </div>
  );
}

export default App;