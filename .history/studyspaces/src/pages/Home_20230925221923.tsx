import styles from "./home.module.scss";
import clsx from "clsx";
import { title } from "../assets";

export function Home() {
  return (
    <>
        <section className={clsx(styles.home)}>
            <img src={title} />
        </section>
    </>
  );
}