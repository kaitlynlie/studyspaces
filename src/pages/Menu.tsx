import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "./Menu.module.scss";
import { title } from "../assets";
import LoadingPage from "./Loadingpage";

function Menu() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
    setIsLoading(true);

    setTimeout(() => {
      if (location === "cafe") {
        navigate("/cafe");
      } else if (location === "park") {
        navigate("/park");
      } else if (location === "beach") {
        navigate("/beach");
      }
    }, 1000);
  };

  return (
    <div className={clsx(styles.menu)}>
      {!isLoading && (
        <>
          <img src={title} alt="Logo" />
          <h1 style={{ fontSize: "20px" }}>thanks for stopping by!</h1>
          {/* <h2 style={{ marginTop: "-10px", fontSize: "16px" }}>Where would you like to travel today?</h2> */}
        </>
      )}
      <div className={clsx(styles.dropdown)}>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <>
            <select
              className={clsx(styles.select)}
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              <option value="">select a location</option>
              <option value="cafe">coffee shop</option>
              <option value="park" disabled>
                park (work in progress)
              </option>
              <option value="beach" disabled>
                beach (coming soon)
              </option>
            </select>
            <span className={styles.arrow}></span>
          </>
        )}
      </div>
    </div>
  );
}

export default Menu;