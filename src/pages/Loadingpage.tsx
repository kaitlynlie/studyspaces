import styles from "./Loadingpage.module.scss";
import { BarLoader } from "react-spinners";

function LoadingPage() {
  return (
    <div className={styles.loadingPage}>
      <BarLoader />
    </div>
  );
}

export default LoadingPage;