import styles from "./home.module.scss";
import clsx from "clsx";
import { useState, useRef, useEffect } from 'react';
import { title, coffee, leftarrow, rightarrow, play, pause } from "../assets";
import { people, machinery, sunny, rainy, fire } from "../audio";
import { Navbar } from ".";
import { Link } from 'react-router-dom'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

export function Home() {
  const [sliderValues, setSliderValues] = useState({
    people: 1,
    mach: 1,
    sunny: 1,
    rainy: 1,
    fire: 1,
  });

  const [isPlaying, setIsPlaying] = useState({
    peopleAudioPlayer: false,
    machAudioPlayer: false,
    sunnyAudioPlayer: false,
    rainyAudioPlayer: false,
    fireAudioPlayer: false,
  });

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({
    peopleAudioPlayer: null,
    machAudioPlayer: null,
    sunnyAudioPlayer: null,
    rainyAudioPlayer: null,
    fireAudioPlayer: null,
  });

  useEffect(() => {
    for (const audioId in audioRefs.current) {
      const audioElement = audioRefs.current[audioId];
      if (audioElement) {
        if (isPlaying[audioId]) {
          audioElement.play();
        } else {
          audioElement.pause();
        }
      }
    }
  }, [isPlaying]);

  const handlePlayButtonClick = (audioId: string) => {
    setIsPlaying((prevState) => ({
      ...prevState,
      [audioId]: !prevState[audioId],
    }));
  };

  const getPlayPauseIcon = (audioId: string) => {
    return isPlaying[audioId] ? pause : play;
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const audioElementId = id.replace("VolumeSlider", "AudioPlayer");
    const audioElement = audioRefs.current[audioElementId];
    if (audioElement) {
      audioElement.volume = parseFloat(value);
    }
    setSliderValues((prevValues) => ({
      ...prevValues,
      [id]: parseFloat(value),
    }));
  };

  return (
    <div className={clsx(styles.body)}>
      <section className={clsx(styles.home)}>
        <div className={clsx(styles.header)}>
          <div className={clsx(styles.studyspaces)}>
            <img src={title} className={clsx(styles.title)} />
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
            {Object.keys(audioRefs.current).map((audioId) => (
              <div className={clsx(styles.audio)} key={audioId}>
                <div className={clsx(styles.title)}>
                  <p>{audioId.replace("AudioPlayer", "")}</p>
                  <img
                    src={getPlayPauseIcon(audioId)}
                    width="11"
                    height="11"
                    id={`${audioId}PlayButton`}
                    onClick={() => handlePlayButtonClick(audioId)}
                  />
                </div>
                <audio
                  ref={(ref) => (audioRefs.current[audioId] = ref)}
                  id={audioId}
                  loop
                >
                  <source src={audioId.replace("AudioPlayer", "")} type="audio/wav" />
                </audio>
                <input
                  type="range"
                  id={`${audioId.replace("AudioPlayer", "")}VolumeSlider`}
                  min={0}
                  max={1}
                  step={0.1}
                  value={sliderValues[audioId.replace("AudioPlayer", "")]}
                  onChange={handleSliderChange}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}