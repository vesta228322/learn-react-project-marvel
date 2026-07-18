import React from 'react'

import './appSubHeader.scss';

import Avengers from '../resources/img/Avengers.png';
import Avengers_logo from '../resources/img/Avengers_logo.png';

function AppSubHeader() {
  return (
    <div className='subheader'>
            <img className='subheader__characters' src={Avengers} alt="Avengers" />
            <span className="subheader__text">New comics every week! Stay tuned!</span>
            <img className='subheader__logo' src={Avengers_logo} alt="Avengers_logo" />
    </div>
  )
}

export default AppSubHeader;