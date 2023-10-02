import React, { useState, useEffect } from 'react';
import { timer } from '../audio';

const TimerDialog = () => {
  const [timeRemaining, setTimeRemaining] = useState(1); 
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState('');

  useEffect(() => {
    let timerId;

    if (isRunning && timeRemaining > 0) {
      timerId = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    }
    

    if (timeRemaining === 0) {
      clearInterval(timerId);
      setIsRunning(false);
      playNotificationSound(); 
    }

    return () => clearInterval(timerId);
  }, [isRunning, timeRemaining]);

  const handleTimeInputChange = (event) => {
    setCustomTime(event.target.value);
  };

  const startTimer = () => {
    const timeInSeconds = parseInt(customTime) * 60; 
    setTimeRemaining(timeInSeconds);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimeRemaining(1);
    setIsRunning(false);
    setCustomTime(''); 
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) {
      return '';
    }
  
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
  
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const playNotificationSound = () => {
    const audio = new Audio(timer);
    audio.play();
  };

  return (
    <div style={{padding: "10px"}}>
      <h2 style={{textAlign: "center", marginTop: "-10px"}}>Pomodoro Timer</h2>
      <div style={{textAlign: 'center', fontSize: "48px", fontWeight: "800"}}>{formatTime(timeRemaining)}</div>
      <input
  type="number"
  min={1}
  value={customTime}
  onChange={handleTimeInputChange}
  placeholder="Enter time in minutes"
  style={{
    marginTop: '20px',
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '200px',
  }}
/>

{!isRunning && (
  <button
    onClick={startTimer}
    style={{
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#8D6E63',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
    }}
  >
    Start
  </button>
)}

{isRunning && (
  <button
    onClick={stopTimer}
    style={{
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#D7CCC8',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
    }}
  >
    Stop
  </button>
)}

<button
  onClick={resetTimer}
  style={{
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#607D8B',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  }}
>
  Reset
</button>
    </div>
  );
};

export default TimerDialog;

<div id="cdk-overlay-1" class="cdk-overlay-pane" style="max-width: 80vw; position: static;"><div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div><mat-dialog-container tabindex="-1" class="mat-dialog-container cdk-dialog-container ng-tns-c9-2 ng-trigger ng-trigger-dialogContainer ng-star-inserted" id="mat-dialog-1" role="dialog" aria-modal="true" style="transform: none;"><app-timer-dialog _nghost-uki-c24="" class="ng-star-inserted"><button _ngcontent-uki-c24="" mat-button="" mat-dialog-close="" aria-label="close" class="close-button" type="button"><img _ngcontent-uki-c24="" alt="" src="assets/icons/close.svg"></button><h2 _ngcontent-uki-c24="">pomodoro timer</h2><div _ngcontent-uki-c24="" class="timer-wrapper ng-star-inserted" style=""><span _ngcontent-uki-c24="" class="timer-wrapper__inside"><input _ngcontent-uki-c24="" type="text" placeholder="25" class="ng-untouched ng-pristine ng-valid">minute<span _ngcontent-uki-c24="" class="ng-star-inserted">s</span><!----></span><button _ngcontent-uki-c24="">start</button></div><!----><!----><p _ngcontent-uki-c24=""> The pomodoro technique is a time management method. Set the timer for as long as you like. After it runs out you will hear a chime and your sounds will pause, as a reminder to take a break. <!----></p></app-timer-dialog><!----></mat-dialog-container><div tabindex="0" class="cdk-visually-hidden cdk-focus-trap-anchor" aria-hidden="true"></div></div>