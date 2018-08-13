import React from 'react'
import logo from './imgs/logo.png'

import './logo.less'
export default function Logo() {
  return(
    <div className='logo'>
      <img src={logo} alt='logo'className='logoContent'/>
    </div>
  )
}