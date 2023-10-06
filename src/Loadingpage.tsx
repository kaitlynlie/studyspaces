import styles from "./Loadingpage.module.scss";
import { loaderheader } from "./assets";
import { BarLoader } from "react-spinners";

function LoadingPage() {
  return (
    <div className={styles.loadingPage}>
      <BarLoader />
      <img src={loaderheader} style={{marginTop: '20px'}}/>
    </div>
  );
}

export default LoadingPage;