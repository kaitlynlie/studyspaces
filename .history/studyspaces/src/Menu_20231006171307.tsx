import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "./Menu.module.scss";
import { test, title } from "./assets";

function Menu() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const navigate = useNavigate();

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);

    // Redirect to a different page based on the selected location
    if (location === "cafe") {
      navigate("/cafe");
    } else if (location === "park") {
      navigate("/park");
    } else if (location === "beach") {
      navigate("/beach");
    }
  };

  return (
    <div className={clsx(styles.menu)}>
      <img src={title} alt="Logo" />
      <img src={test} />
      <h1>Welcome to Study Spaces! Thanks for stopping by!</h1>
      <h2 style={{ marginTop: "-10px" }}>Where would you like to travel today?</h2>
    <div className={clsx(styles.dropdown)}>
      <select
        className={clsx(styles.select)}
        value={selectedLocation}
        onChange={handleLocationChange}
      >
        <option value="">Select a location.</option>
        <option value="cafe">Cafe</option>
        <option value="park" disabled>Park (Coming Soon)</option>
        <option value="beach" disabled>Beach (Coming Soon)</option>
      </select>
      <span className={styles.arrow}></span>
      </div>
    </div>
  );
}

export default Menu;