import React from 'react'
import styles from './Navbar.module.scss'
import clsx from 'clsx'
import { title } from '../assets'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

function openPopup(url) {
  var width = 600;
  var height = 400;
  var left = (window.innerWidth - width) / 2;
  var top = (window.innerHeight - height) / 2;
  var options = "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top;

  // Open the popup window
  var popup = window.open(url, "Popup Window", options);

  // Focus the popup window (optional)
  if (popup) {
    popup.focus();
  }
}

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

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
    <a onClick={() => openPopup('/about')}>About</a>
  </li>
  <li>
    <a onClick={() => openPopup('/membership')}>Todo</a>
  </li>
  <li>
    <a onClick={() => openPopup('/faq')}>Timer</a>
  </li>
            </ul>
          </div>
        </div>
        )}
        </div>
  </nav>
  )
}

export default Navbar