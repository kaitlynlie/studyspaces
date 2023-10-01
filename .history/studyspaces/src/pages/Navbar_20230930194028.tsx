import React from 'react'
import styles from './Navbar.module.scss'
import clsx from 'clsx'
import { title } from '../assets'
import { useState, useEffect } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openTodo, setOpenTodo] = useState(false);
  
  const handleClickOpenTodo = () => {
    setOpenTodo(true);
  };
  
  const handleClickOpenTimer = () => {
    setOpenTimer(true);
  };
  
  const handleClose = () => {
    setOpenTodo(false);
    setOpenTimer(false);
  };
  
  //timer

  const [openTimer, setOpenTimer] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerValue, setTimerValue] = useState(25 * 60); // Initial timer value in seconds
  const [minutes, setMinutes] = useState('25');
  const [seconds, setSeconds] = useState('00');

  const formatTime = (value) => {
    const mins = Math.floor(value / 60).toString().padStart(2, '0');
    const secs = (value % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  
  const startTimer = () => {
    setTimerRunning(true);
  };
  
  const pauseTimer = () => {
    setTimerRunning(false);
  };
  
  const resetTimer = () => {
    setTimerValue(25 * 60);
    setMinutes('25');
    setSeconds('00');
    setTimerRunning(false);
  };
  
  useEffect(() => {
    let intervalId;
    
    if (timerRunning) {
      intervalId = setInterval(() => {
        setTimerValue((prevValue) => prevValue - 1);
      }, 1000);
    }
  
    if (timerValue === 0) {
      setTimerRunning(false);
      // Timer completed, perform any necessary actions here
    }
  
    const formattedTime = formatTime(timerValue);
    const [formattedMinutes, formattedSeconds] = formattedTime.split(':');
    setMinutes(formattedMinutes);
    setSeconds(formattedSeconds);
  
    return () => {
      clearInterval(intervalId);
    };
  }, [timerRunning, timerValue]);

  return (
    <nav className={clsx(styles.navbar)}>
    <div className={clsx(styles.toggle)}>
        {toggleMenu
          ? <RiCloseLine color="#000" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#000" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className={clsx(styles.box)}>
          <div className="none">
            <ul className={clsx(styles.dropdown)}>
              <li>
                <a onClick={handleClickOpenTodo}>Todo</a>
              </li>
              <li>
                <a onClick={handleClickOpenTimer}>Timer</a>
              </li>
            </ul>
          </div>
        </div>
        )}
        </div>

    {/* Todo Dialog */}
    <Dialog open={openTodo} onClose={handleClose}>
      <DialogActions>
      <RiCloseLine color="#000" size={27} onClick={handleClose} />
      </DialogActions>
      <DialogTitle>Todo</DialogTitle>
      <DialogContent>
        {/* Add your content for the Todo dialog here */}
      </DialogContent>
    </Dialog>

    <Dialog open={openTimer} onClose={handleClose} style={{ width: '600px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <DialogActions>
      <RiCloseLine color="#000" size={27} onClick={handleClose} />
      </DialogActions>
      <DialogTitle>Timer</DialogTitle>
      <DialogContent>
        <div>
          <span>{minutes}</span>:<span>{seconds}</span>
        </div>
        <div>
          {timerRunning ? (
            <button onClick={pauseTimer}>Pause</button>
          ) : (
            <button onClick={startTimer}>Start</button>
          )}
          <button onClick={resetTimer}>Reset</button>
        </div>
      </DialogContent>
    </Dialog>
  </nav>
  )
}

export default Navbar