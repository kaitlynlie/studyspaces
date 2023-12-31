import styles from "./Park.module.scss";
import clsx from "clsx";
import { park, play, pause } from "../assets";
import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { sunny, birds, } from "../audio";
import { Navbar, TimerDialog } from ".";

export function Park() {
  const [sliderValues, setSliderValues] = useState({
    sunnyVolumeSlider: 1,
    birdsVolumeSlider: 1,
  });

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({
    sunnyAudioPlayer: null,
    birdsAudioPlayer: null,
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
      <div className={clsx(styles.leftleaves)}></div>
      <div className={clsx(styles.rightleaves)}></div>
      <Navbar />
        <section className={clsx(styles.home)}>
          <div className={clsx(styles.header)}>
            <div className={clsx(styles.studyspaces)}>
              {/* <img src={title} className={clsx(styles.title)}/> */}
            </div>
          </div>
          
            {/* <h4>Cafe</h4> */}
            <div className={clsx(styles.content)}>
              <div className={clsx(styles.hero)}>
                {/* <img id="leftArrow" src={leftarrow} className={clsx(styles.leftarrow)}/> */}
                <img src={park} className={clsx(styles.coffee)} />
                {/* <img id="rightArrow" src={rightarrow} className={clsx(styles.rightarrow)}/> */}
              </div>

              <div className={clsx(styles.audiolist)}>
               {/* <div className={clsx(styles.audio)}>
                    <div className={clsx(styles.title)}>
                    <p>People</p>
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
                    className={clsx(styles.input)}
                  />
                </div>

                <div className={clsx(styles.audio)}>
                  <div className={clsx(styles.title)}>
                    <p>Machinery</p>
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
                </div> */}

                <div className={clsx(styles.audio)}>
                  <div className={clsx(styles.title)}>
                    <p>Sunny Day</p>
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
                    <p>Birds</p>
                    <img
                      src={getPlayPauseIcon("birdsAudioPlayer")}
                      width="11"
                      height="11"
                      id="birdsPlayButton"
                      onClick={() => handlePlayButtonClick("birdsAudioPlayer")}
                    />
                  </div>

                  <audio
                    ref={(ref) => (audioRefs.current.birdsAudioPlayer = ref)}
                    id="birdsAudioPlayer"
                    loop 
                  >
                    <source src={birds} type="audio/wav" />
                  </audio>

                  <input
                    type="range"
                    id="birdsVolumeSlider"
                    min={0}
                    max={1}
                    step={0.1}
                    value={sliderValues.birdsVolumeSlider}
                    onChange={handleSliderChange}
                    className={clsx(styles.input)}
                  />
                </div>

                {/* <div className={clsx(styles.audio)}>
                  <div className={clsx(styles.title)}>
                    <p>Fireplace</p>
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
                </div> */}
                <TimerDialog />
              </div>
            </div>
        </section>
    </div>
  );
}