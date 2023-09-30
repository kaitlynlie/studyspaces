import React from 'react'
import styles from './Navbar.module.scss'
import clsx from 'clsx'
import { title } from '../assets'
import { useState } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openTodo, setOpenTodo] = useState(false);
  const [openTimer, setOpenTimer] = useState(false);

  const handleClickOpenAbout = () => {
    setOpenAbout(true);
  };
  
  const handleClickOpenTodo = () => {
    setOpenTodo(true);
  };
  
  const handleClickOpenTimer = () => {
    setOpenTimer(true);
  };
  
  const handleClose = () => {
    setOpenAbout(false);
    setOpenTodo(false);
    setOpenTimer(false);
  };

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
                <a onClick={handleClickOpenAbout}>About</a>
              </li>
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

        <Dialog open={openAbout} onClose={handleClose} style={{ width: '600px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <DialogActions>
      <RiCloseLine color="#000" size={27} onClick={handleClose} />
      </DialogActions>
      <DialogTitle>About</DialogTitle>
      <DialogContent>
        {/* Add your content for the About dialog here */}
      </DialogContent>
    </Dialog>

    {/* Todo Dialog */}
    <Dialog open={openTodo} onClose={handleClose} style={{ width: '600px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <DialogActions>
      <RiCloseLine color="#000" size={27} onClick={handleClose} />
      </DialogActions>
      <DialogTitle>Todo</DialogTitle>
      <DialogContent>
        {/* Add your content for the Todo dialog here */}
      </DialogContent>
    </Dialog>

    {/* Timer Dialog */}
    <Dialog open={openTimer} onClose={handleClose} style={{ width: '600px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <DialogActions>
      <RiCloseLine color="#000" size={27} onClick={handleClose} />
      </DialogActions>
      <DialogTitle>Timer</DialogTitle>
      <DialogContent>
        {/* Add your content for the Timer dialog here */}
      </DialogContent>
    </Dialog>
  </nav>
  )
}

export default Navbar