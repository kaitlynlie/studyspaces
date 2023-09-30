import styles from "./home.module.scss";
import clsx from "clsx";
import { title, coffee, leftarrow, rightarrow, play, pause } from "../assets";
import React, { ChangeEvent, useState, useRef } from 'react';
import { people, machinery, sunny, rainy, fire } from "../audio";
import { Navbar } from ".";
import { Link } from 'react-router-dom'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

export function Home() {
  const [sliderValues, setSliderValues] = useState({
    peopleVolumeSlider: 1,
    machVolumeSlider: 1,
    sunnyVolumeSlider: 1,
    rainyVolumeSlider: 1,
    fireVolumeSlider: 1,
  });

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setSliderValues((prevValues) => ({
      ...prevValues,
      [id]: parseFloat(value),
    }));
  };

  const [isPlaying, setIsPlaying] = useState<AudioState>({});

  interface AudioState {
    [key: string]: boolean;
  }

  const handlePlayButtonClick = (audioId: string) => {
    setIsPlaying((prevState) => ({
      ...prevState,
      [audioId]: !prevState[audioId] || !prevState[audioId],
    }));
  };

  const [toggleMenu, setToggleMenu] = useState(false);
  const [nav, setNav] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  return (
    <div className={clsx(styles.body)}>
        <section className={clsx(styles.home)}>
          <div className={clsx(styles.header)}>
            <div className={clsx(styles.studyspaces)}>
              <img src={title} className={clsx(styles.title)}/>
            </div>
            <div className={clsx(styles.toggle)}>
        {toggleMenu
          ? <RiCloseLine color="#000" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#000" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className={clsx(styles.box)}>
          <div className="none">
            <ul className={clsx(styles.dropdown)}>
            <Link onClick={openNav} to='/'><li><a>Home</a></li></Link>
            <Link onClick={openNav} to='/about'><li><a>About</a></li></Link>
            <Link onClick={openNav} to='/membership'><li><a>Todo</a></li></Link>
            <Link onClick={openNav} to='/faq'><li><a>Timer</a></li></Link>
            </ul>
          </div>
        </div>
        )}
        </div>
          </div>
            <h4>Cafe</h4>
            <div className={clsx(styles.content)}>
              <div className={clsx(styles.hero)}>
                <img id="leftArrow" src={leftarrow} />
                <img src={coffee} className={clsx(styles.coffee)} />
                <img id="rightArrow" src={rightarrow} />
              </div>

              <div className={clsx(styles.audiolist)}>
                <div className={clsx(styles.audio)}>
                  <div className={clsx(styles.title)}>
                    <p>People</p>
                    <img
                      src={play}
                      width="11"
                      height="11"
                      id="peoplePlayButton"
                      onClick={() => handlePlayButtonClick("peopleAudioPlayer")}                    />
                  </div>
                  <audio id="peopleAudioPlayer">
                    <source src={people} type="audio/wav" />
                  </audio>
                  <input
                    type="range"
                    id="peopleVolumeSlider"
                    min={0}
                    max={1}
                    step={0.1}
                    value={sliderValues.peopleVolumeSlider}
                    onChange={handleSliderChange}
                  />
                </div>

                <div className={clsx(styles.audio)}>
                  <div className={clsx(styles.title)}>
                    <p>Machinery</p>
                    <img
                      src={play}
                      width="11"
                      height="11"
                      id="machPlayButton"
                      onClick={() => handlePlayButtonClick("machAudioPlayer")}
                    />
                  </div>
                  <audio id="machAudioPlayer">
                    <source src={machinery} type="audio/mp3" />
                  </audio>
                  <input
                    type="range"
                    id="machVolumeSlider"
                    min={0}
                    max={1}
                    step={0.1}
                    value={sliderValues.machVolumeSlider}
                    onChange={handleSliderChange}
                  />
                </div>

                <div className={clsx(styles.audio)}>
                  <div className={clsx(styles.title)}>
                    <p>Sunny Day</p>
                    <img
                      src={play}
                      width="11"
                      height="11"
                      id="sunnyPlayButton"
                      onClick={() => handlePlayButtonClick("sunnyAudioPlayer")}
                    />
                  </div>
                  <audio id="sunnyAudioPlayer">
                    <source src={sunny} type="audio/wav" />
                  </audio>
                  <input
                    type="range"
                    id="sunnyVolumeSlider"
                    min={0}
                    max={1}
                    step={0.1}
                    value={sliderValues.sunnyVolumeSlider}
                    onChange={handleSliderChange}
                  />
                </div>

                <div className={clsx(styles.audio)}>
                  <div className={clsx(styles.title)}>
                    <p>Rainy Day</p>
                    <img
                      src={play}
                      width="11"
                      height="11"
                      id="rainyPlayButton"
                      onClick={() => handlePlayButtonClick("rainyAudioPlayer")}
                    />
                  </div>
                  <audio id="rainyAudioPlayer">
                    <source src={rainy} type="audio/wav" />
                  </audio>
                  <input
                    type="range"
                    id="rainyVolumeSlider"
                    min={0}
                    max={1}
                    step={0.1}
                    value={sliderValues.rainyVolumeSlider}
                    onChange={handleSliderChange}
                  />
                </div>

                <div className={clsx(styles.audio)}>
                  <div className={clsx(styles.title)}>
                    <p>Fireplace</p>
                    <img
                      src={play}
                      width="11"
                      height="11"
                      id="firePlayButton"
                      onClick={() => handlePlayButtonClick("fireAudioPlayer")}
                    />
                  </div>
                  <audio id="fireAudioPlayer">
                    <source src={fire} type="audio/wav" />
                  </audio>
                  <input
                    type="range"
                    id="fireVolumeSlider"
                    min={0}
                    max={1}
                    step={0.1}
                    value={sliderValues.fireVolumeSlider}
                    onChange={handleSliderChange}
                  />
                </div>
              </div>
            </div>
        </section>
    </div>
  );
}