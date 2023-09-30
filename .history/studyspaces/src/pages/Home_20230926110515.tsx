import styles from "./home.module.scss";
import clsx from "clsx";
import { title, coffee, leftarrow, rightarrow, play, pause } from "../assets";

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

              <div
          // style="
          //   display: flex;
          //   flex-direction: column;
          //   align-items: center;
          //   justify-content: center;
          // "
        >
          <div
            // style="
            //   display: flex;
            //   flex-direction: column;
            //   justify-content: center;
            //   align-items: center;
            // "
          >
            <div
              // style="
              //   display: flex;
              //   flex-direction: row;
              //   justify-content: center;
              //   align-items: center;
              //   gap: 5px;
              // "
            >
              <p>People</p>
              <img
                src="assets/play.svg"
                width="11"
                height="11"
                id="peoplePlayButton"
                // style="cursor: pointer"
              />
            </div>
            <audio id="peopleAudioPlayer">
              <source src="audio/people.wav" type="audio/wav" />
            </audio>
            <input
              type="range"
              id="peopleVolumeSlider"
              // class="slider"
              min="0"
              max="1"
              step="0.1"
              value="1"
              // style="margin-top: -5px; margin-bottom: 10px"
            />
          </div>

          <div
            // style="
            //   display: flex;
            //   flex-direction: column;
            //   justify-content: center;
            //   align-items: center;
            // "
          >
            <div
              // style="
              //   display: flex;
              //   flex-direction: row;
              //   justify-content: center;
              //   align-items: center;
              //   gap: 5px;
              // "
            >
              <p>Machinery</p>
              <img
                src="assets/play.svg"
                width="11"
                height="11"
                id="machPlayButton"
                // style="cursor: pointer"
              />
            </div>
            <audio id="machAudioPlayer">
              <source src="audio/softmachinery.mp3" type="audio/mp3" />
            </audio>
            <input
              type="range"
              id="machVolumeSlider"
              // class="slider"
              min="0"
              max="1"
              step="0.1"
              value="1"
              // style="margin-top: -5px; margin-bottom: 10px"
            />
          </div>

          <div
            // style="
            //   display: flex;
            //   flex-direction: column;
            //   justify-content: center;
            //   align-items: center;
            // "
          >
            <div
              // style="
              //   display: flex;
              //   flex-direction: row;
              //   justify-content: center;
              //   align-items: center;
              //   gap: 5px;
              // "
            >
              <p>Sunny Day</p>
              <img
                src="assets/play.svg"
                width="11"
                height="11"
                id="sunnyPlayButton"
                // style="cursor: pointer"
              />
            </div>
            <audio id="sunnyAudioPlayer">
              <source src="audio/sun.wav" type="audio/wav" />
            </audio>
            <input
              type="range"
              id="sunnyVolumeSlider"
              // class="slider"
              min="0"
              max="1"
              step="0.1"
              value="1"
              // style="margin-top: -5px; margin-bottom: 10px"
            />
          </div>

          <div
            // style="
            //   display: flex;
            //   flex-direction: column;
            //   justify-content: center;
            //   align-items: center;
            // "
          >
            <div
              // style="
              //   display: flex;
              //   flex-direction: row;
              //   justify-content: center;
              //   align-items: center;
              //   gap: 5px;
              // "
            >
              <p>Rainy Day</p>
              <img
                src="assets/play.svg"
                width="11"
                height="11"
                id="rainyPlayButton"
                // style="cursor: pointer"
              />
            </div>
            <audio id="rainyAudioPlayer">
              <source src="audio/rain.wav" type="audio/wav" />
            </audio>
            <input
              type="range"
              id="rainyVolumeSlider"
              // class="slider"
              min="0"
              max="1"
              step="0.1"
              value="1"
              // style="margin-top: -5px; margin-bottom: 10px"
            />
          </div>

          <div
            // style="
            //   display: flex;
            //   flex-direction: column;
            //   justify-content: center;
            //   align-items: center;
            // "
          >
            <div
              // style="
              //   display: flex;
              //   flex-direction: row;
              //   justify-content: center;
              //   align-items: center;
              //   gap: 5px;
              // "
            >
              <p>Fireplace</p>
              <img
                src="assets/play.svg"
                width="11"
                height="11"
                id="firePlayButton"
                // style="cursor: pointer"
              />
            </div>
            <audio id="fireAudioPlayer">
              <source src="audio/fireplace.wav" type="audio/wav" />
            </audio>
            <input
              type="range"
              id="fireVolumeSlider"
              // class="slider"
              min="0"
              max="1"
              step="0.1"
              value="1"
              // style="margin-top: -5px; margin-bottom: 10px"
            />
          </div>
        </div>


            </div>
        </section>
    </body>
  );
}