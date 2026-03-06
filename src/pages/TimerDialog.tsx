import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import styles from "./timer.module.scss";

interface TimerDialogProps {
  className?: string;
}

export function TimerDialog({ className }: TimerDialogProps) {
  const [customMinutes, setCustomMinutes] = useState(25);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const alarmAudioRef = useRef<HTMLAudioElement | null>(null);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  
  const progress = totalTime > 0 ? (timeRemaining / totalTime) : 1;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  // Handle session complete
  const handleSessionComplete = useCallback(() => {    
    // Play alarm sound
    if (alarmAudioRef.current) {
      alarmAudioRef.current.play().catch(err => console.log("Audio playback failed:", err));
    }
    
  }, [totalTime]);

  // Timer logic
  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeRemaining, handleSessionComplete]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        toggleTimer();
      }
    };
    
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isRunning, timeRemaining, totalTime]);

  const toggleTimer = () => {
    if (timeRemaining === 0) {
      resetTimer();
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(totalTime);
  };

  const selectPreset = (minutes: number) => {
    if (!isRunning) {
      setCustomMinutes(minutes);
      setTotalTime(minutes * 60);
      setTimeRemaining(minutes * 60);
    }
  };

  const handleCustomMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow empty input or valid numbers
    if (inputValue === "") {
      setCustomMinutes(0);
      return;
    }
    
    const value = Number(inputValue);
    if (!isNaN(value) && value >= 0 && value <= 180) {
      setCustomMinutes(value);
    }
  };

  const applyCustomDuration = () => {
    if (!isRunning && customMinutes >= 1 && customMinutes <= 180) {
      setTotalTime(customMinutes * 60);
      setTimeRemaining(customMinutes * 60);
    } else if (customMinutes === 0) {
      // Reset to default if empty
      setCustomMinutes(25);
      setTotalTime(25 * 60);
      setTimeRemaining(25 * 60);
    }
  };

  const presets = [5, 15, 25, 45];

  return (
    <div className={clsx(styles.timerContainer, className)}>
      {/* Hidden alarm audio */}
      <audio
        ref={alarmAudioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
        preload="auto"
      />
      
      {/* Circular Timer */}
      <div className={styles.circularTimer}>
        <svg className={styles.timerSvg} width="300" height="300" viewBox="0 0 300 300">
          {/* Background circle */}
          <circle
            cx="150"
            cy="150"
            r={radius}
            stroke="#39570ecc"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="150"
            cy="150"
            r={radius}
            stroke="#76b51ecc"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </svg>
        
        <div className={styles.timerDisplay}>
          <motion.div 
            className={styles.timeText}
            animate={{ scale: isRunning ? [1, 1.02, 1] : 1 }}
            transition={{ duration: 1, repeat: isRunning ? Infinity : 0 }}
          >
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </motion.div>
          <div className={styles.timerStatus}>
            {isRunning ? 'focus time' : 'ready'}
          </div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className={styles.presetButtons}>
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => selectPreset(preset)}
            disabled={isRunning}
            className={styles.presetButton}
          >
            {preset}m
          </button>
        ))}
      </div>

      {/* Custom Duration Input */}
      <div className={styles.customDuration}>
        <input
          type="number"
          min="1"
          max="180"
          value={customMinutes === 0 ? "" : customMinutes}
          onChange={handleCustomMinutesChange}
          onBlur={applyCustomDuration}
          onKeyDown={(e) => e.key === "Enter" && applyCustomDuration()}
          disabled={isRunning}
          className={styles.durationInput}
          placeholder="25"
        />
        <span className={styles.durationLabel}>minutes</span>
      </div>

      {/* Control Buttons */}
      <div className={styles.controls}>
        <button
          onClick={toggleTimer}
          className={clsx(styles.controlButton, styles.startButton)}
        >
          {isRunning ? 'pause' : 'start'}
        </button>
        <button
          onClick={resetTimer}
          className={clsx(styles.controlButton, styles.resetButton)}
        >
          reset
        </button>
      </div>
    </div>
  );
}
