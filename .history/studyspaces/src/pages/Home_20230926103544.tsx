import styles from "./home.module.scss";
import clsx from "clsx";
import { title, coffee, leftarrow, rightarrow } from "../assets";

export function Home() {
  return (
    <body className={clsx(styles.body)}>
        <section className={clsx(styles.home)}>
            <img src={title} className={clsx(styles.title)}/>
            <h4>Cafe</h4>
            <div className={clsx(styles.content)}>
              <div className={clsx(styles.hero)}>
                <img id="leftArrow" src={leftarrow} />
                <img src={coffee} className={clsx(styles.coffee)} />
                <img id="rightArrow" src={rightarrow} />
              </div>
            </div>
        </section>
    </body>
  );
}