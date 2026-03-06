import styles from "./home.module.scss";
import clsx from "clsx";
import { play, pause, hanginglight, cover } from "../assets";
import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { people, machinery, sunny, rainy, fire } from "../audio";
import { TimerDialog } from ".";
import { BaristaPet } from "./BaristaPet";

interface AudioState {
  [key: string]: boolean;
}

interface SliderValues {
  peopleVolumeSlider: number;
  machVolumeSlider: number;
  sunnyVolumeSlider: number;
  rainyVolumeSlider: number;
  fireVolumeSlider: number;
}

// ── AudioRow lives OUTSIDE Home so it never remounts on state changes ─────────
interface AudioRowProps {
  label: string;
  audioId: string;
  sliderId: keyof SliderValues;
  src: string;
  srcType: string;
  sliderValues: SliderValues;
  isPlaying: AudioState;
  onPlay: (audioId: string) => void;
  onSliderChange: (event: ChangeEvent<HTMLInputElement>) => void;
  audioRefs: React.MutableRefObject<{ [key: string]: HTMLAudioElement | null }>;
}

function AudioRow({
  label,
  audioId,
  sliderId,
  src,
  srcType,
  sliderValues,
  isPlaying,
  onPlay,
  onSliderChange,
  audioRefs,
}: AudioRowProps) {
  const playing = !!isPlaying[audioId];
  const icon = playing ? pause : play;

  return (
    <div className={clsx(styles.audio, playing && styles.playing)}>
      <div className={styles.title}>
        <p>{label}</p>
        <button
          className={clsx(styles.playBtn, playing && styles.active)}
          onClick={() => onPlay(audioId)}
          aria-label={playing ? `Pause ${label}` : `Play ${label}`}
        >
          <img src={icon} width="11" height="11" alt={playing ? "pause" : "play"} />
        </button>
      </div>
      <audio
        ref={(ref) => (audioRefs.current[audioId] = ref)}
        id={audioId}
        loop
      >
        <source src={src} type={srcType} />
      </audio>
      <input
        type="range"
        id={sliderId}
        min={0}
        max={1}
        step={0.01}
        value={sliderValues[sliderId]}
        onChange={onSliderChange}
        className={clsx(styles.input)}
      />
    </div>
  );
}

// ── Home ──────────────────────────────────────────────────────────────────────
export function Home() {
  const [sliderValues, setSliderValues] = useState<SliderValues>({
    peopleVolumeSlider: 0.7,
    machVolumeSlider: 0.7,
    sunnyVolumeSlider: 0.7,
    rainyVolumeSlider: 0.7,
    fireVolumeSlider: 0.7,
  });

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({
    peopleAudioPlayer: null,
    machAudioPlayer: null,
    sunnyAudioPlayer: null,
    rainyAudioPlayer: null,
    fireAudioPlayer: null,
  });

  const [isPlaying, setIsPlaying] = useState<AudioState>({});

  const handlePlayButtonClick = (audioId: string) => {
    setIsPlaying((prev) => ({ ...prev, [audioId]: !prev[audioId] }));
  };

  useEffect(() => {
    for (const audioId in audioRefs.current) {
      const el = audioRefs.current[audioId];
      if (el) {
        isPlaying[audioId] ? el.play() : el.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRefs.current.peopleAudioPlayer;
    if (!audio) return;
    const handleEnded = () => { audio.currentTime = 0; audio.play(); };
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  useEffect(() => {
    for (const audioId in audioRefs.current) {
      const el = audioRefs.current[audioId];
      if (el) {
        const sliderId = audioId.replace("AudioPlayer", "VolumeSlider");
        el.volume = sliderValues[sliderId as keyof SliderValues] ?? 0.7;
      }
    }
  }, []);

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const el = audioRefs.current[id.replace("VolumeSlider", "AudioPlayer")];
    if (el) el.volume = parseFloat(value);
    setSliderValues((prev) => ({ ...prev, [id]: parseFloat(value) }));
  };

  const rowProps = { sliderValues, isPlaying, onPlay: handlePlayButtonClick, onSliderChange: handleSliderChange, audioRefs };

  return (
    <div className={clsx(styles.body)}>
      <section className={clsx(styles.home)}>
        <div>
          <img src={hanginglight} className={clsx(styles.lights1)} />
          <img src={hanginglight} className={clsx(styles.lights)} />
          <img src={hanginglight} className={clsx(styles.lights2)} />
        </div>

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

            <AudioRow label="people"    audioId="peopleAudioPlayer" sliderId="peopleVolumeSlider" src={people.replace(".wav", ".ogg")} srcType="audio/ogg" {...rowProps} />
            <AudioRow label="machinery" audioId="machAudioPlayer"   sliderId="machVolumeSlider"   src={machinery} srcType="audio/mp3" {...rowProps} />
            <AudioRow label="sunny day" audioId="sunnyAudioPlayer"  sliderId="sunnyVolumeSlider"  src={sunny}     srcType="audio/wav" {...rowProps} />
            <AudioRow label="rainy day" audioId="rainyAudioPlayer"  sliderId="rainyVolumeSlider"  src={rainy}     srcType="audio/wav" {...rowProps} />
            <AudioRow label="fireplace" audioId="fireAudioPlayer"   sliderId="fireVolumeSlider"   src={fire}      srcType="audio/wav" {...rowProps} />
          </div>
        </div>
      </section>
      <BaristaPet />
    </div>
  );
}