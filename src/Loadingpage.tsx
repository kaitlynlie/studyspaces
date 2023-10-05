import React from "react";
import clsx from "clsx";
import styles from "./Loadingpage.module.scss";
import { FaSpinner } from "react-icons/fa";
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