import styles from "./home.module.scss";
import clsx from "clsx";
import { play, pause, hanginglight, cover } from "../assets";
import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { people, machinery, sunny, rainy, fire } from "../audio";
import { TimerDialog } from ".";

export function Home() {
  const [sliderValues, setSliderValues] = useState({
    peopleVolumeSlider: 1,
    machVolumeSlider: 1,
    sunnyVolumeSlider: 1,
    rainyVolumeSlider: 1,
    fireVolumeSlider: 1,
  });

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({
    peopleAudioPlayer: null,
    machAudioPlayer: null,
    sunnyAudioPlayer: null,
    rainyAudioPlayer: null,
    fireAudioPlayer: null,
  });

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

  const getPlayPauseIcon = (audioId: string) => {
    if (isPlaying[audioId]) {
      return pause;
    } else {
      return play;
    }
  };

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

  useEffect(() => {
  const audio = audioRefs.current.peopleAudioPlayer;
  if (!audio) return;

    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play();
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      {/* <div className={clsx(styles.leftleaves)}></div>
      <div className={clsx(styles.rightleaves)}></div> */}
      {/* <Navbar /> */}
        <section className={clsx(styles.home)}>
          <div>
            <img src={hanginglight} className={clsx(styles.lights1)}/>
            <img src={hanginglight} className={clsx(styles.lights)}/>
            <img src={hanginglight} className={clsx(styles.lights2)}/>
          </div>
            {/* <h4>Cafe</h4> */}
            {/* <img src={title} className={clsx(styles.title)}/> */}
            <div className={clsx(styles.content)}>
              <div><TimerDialog /></div>
              <div className={clsx(styles.audiolist)}>
                <div className={clsx(styles.playlistHeader)}>
                  <img src={cover} className={clsx(styles.cover)} />
                  <div className={clsx(styles.meta)}>
                    <h2>cafe</h2>
                    <p>1pm afternoon waiting for my drink</p>
                  </div>
                </div>
                <div className={clsx(styles.audio)}>
                  <div className={clsx(styles.title)}>
                    <p>people</p>
                    <img
                      src={getPlayPauseIcon("peopleAudioPlayer")}
                      width="11"
                      height="11"
                      id="peoplePlayButton"
                      onClick={() => handlePlayButtonClick("peopleAudioPlayer")}
                    />
                  </div>

                  <audio
                    ref={(ref) => (audioRefs.current.peopleAudioPlayer = ref)}
                    id="peopleAudioPlayer"
                    loop
                  >
                    <source src={people.replace(".wav", ".ogg")} type="audio/ogg" />
                  </audio>

                  <input
                    type="range"
                    id="peopleVolumeSlider"
                    min={0}
                    max={1}
                    step={0.1}
                    value={sliderValues.peopleVolumeSlider}
                    onChange={handleSliderChange}
                    className={clsx(styles.input)}
                  />
                </div>

                <div className={clsx(styles.audio)}>
                  <div className={clsx(styles.title)}>
                    <p>machinery</p>
                    <img
                      src={getPlayPauseIcon("machAudioPlayer")}
                      width="11"
                      height="11"
                      id="machPlayButton"
                      onClick={() => handlePlayButtonClick("machAudioPlayer")}
                    />
                  </div>

                  <audio
                    ref={(ref) => (audioRefs.current.machAudioPlayer = ref)}
                    id="machAudioPlayer"
                    loop  
                  >
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
                    className={clsx(styles.input)}
                  />
                </div>

                <div className={clsx(styles.audio)}>
                  <div className={clsx(styles.title)}>
                    <p>sunny day</p>
                    <img
                      src={getPlayPauseIcon("sunnyAudioPlayer")}
                      width="11"
                      height="11"
                      id="sunnyPlayButton"
                      onClick={() => handlePlayButtonClick("sunnyAudioPlayer")}
                    />
                  </div>

                  <audio
                    ref={(ref) => (audioRefs.current.sunnyAudioPlayer = ref)}
                    id="sunnyAudioPlayer"
                    loop 
                  >
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
                    className={clsx(styles.input)}
                  />
                </div>

                <div className={clsx(styles.audio)}>
                  <div className={clsx(styles.title)}>
                    <p>rainy day</p>
                    <img
                      src={getPlayPauseIcon("rainyAudioPlayer")}
                      width="11"
                      height="11"
                      id="rainyPlayButton"
                      onClick={() => handlePlayButtonClick("rainyAudioPlayer")}
                    />
                  </div>

                  <audio
                    ref={(ref) => (audioRefs.current.rainyAudioPlayer = ref)}
                    id="rainyAudioPlayer"
                    loop 
                  >
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
                    className={clsx(styles.input)}
                  />
                </div>

                <div className={clsx(styles.audio)}>
                  <div className={clsx(styles.title)}>
                    <p>fireplace</p>
                    <img
                      src={getPlayPauseIcon("fireAudioPlayer")}
                      width="11"
                      height="11"
                      id="firePlayButton"
                      onClick={() => handlePlayButtonClick("fireAudioPlayer")}
                    />
                  </div>

                  <audio
                    ref={(ref) => (audioRefs.current.fireAudioPlayer = ref)}
                    id="fireAudioPlayer"
                    loop  
                  >
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
                    className={clsx(styles.input)}
                  />
                </div>
                {/* <TimerDialog /> */}
              </div>

              {/* <TimerDialog /> */}
            </div>
        </section>
    </div>
  );
}