import React from 'react'
import styles from './Navbar.module.scss'
import clsx from 'clsx'
import { title, todo } from '../assets'
import { useState, useEffect } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { TimerDialog, TodoDialog } from '.'

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openTodo, setOpenTodo] = useState(false);
  const [openTimer, setOpenTimer] = useState(false);
  
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

  return (
    <nav className={clsx(styles.navbar)}>
    <div className={clsx(styles.toggle)}>
      <a onClick={handleClickOpenTodo}><img src={todo} /></a>
        </div>

    <Dialog open={openTodo} onClose={handleClose}>
      <DialogActions>
      <RiCloseLine color="#000" size={27} onClick={handleClose} />
      </DialogActions>
      <DialogContent>
        <TodoDialog />
      </DialogContent>
    </Dialog>

    <Dialog open={openTimer} onClose={handleClose}>
        <DialogActions>
          <RiCloseLine color="#000" size={27} onClick={handleClose} />
        </DialogActions>
        <DialogContent>
          <TimerDialog open={openTimer} />
        </DialogContent>
      </Dialog>
  </nav>
  )
}

export default Navbar