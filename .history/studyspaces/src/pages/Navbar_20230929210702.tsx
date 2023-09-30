import React from 'react'
import styles from './Navbar.module.scss'
import clsx from 'clsx'
import { title } from '../assets'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [open, setOpen] = useState(false);
const [selectedLink, setSelectedLink] = useState('');

const handleClickOpen = (link) => {
  setOpen(true);
  setSelectedLink(link);
};

const handleClose = () => {
  setOpen(false);
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
                <a onClick={() => handleClickOpen('/about')}>About</a>
              </li>
              <li>
                <a onClick={() => handleClickOpen('/membership')}>Todo</a>
              </li>
              <li>
                <a onClick={() => handleClickOpen('/faq')}>Timer</a>
              </li>
            </ul>
          </div>
        </div>
        )}
        </div>

        <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{selectedLink}</DialogTitle>
      <DialogContent>
        {/* Add your content here */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </nav>
  )
}

export default Navbar