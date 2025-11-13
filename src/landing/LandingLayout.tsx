//@ts-nocheck
import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

const LandingLayout = () => {

  return (
    <div>
    <ScrollToTop/>
    <div className='overflow-hidden'>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
    </div>
  )
}

export default LandingLayout