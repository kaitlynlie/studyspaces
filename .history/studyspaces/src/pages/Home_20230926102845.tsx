import styles from "./home.module.scss";
import clsx from "clsx";
import { title } from "../assets";

export function Home() {
  return (
    <body className={clsx(styles.body)}>
        <section className={clsx(styles.home)}>
            <img src={title} />
            <h4>Cafe</h4>
            <div className={clsx(styles.content)}>
              
            </div>
        </section>
    </body>
  );
}