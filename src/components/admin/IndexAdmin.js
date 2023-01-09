import React from 'react'
import Header from './Header'
import MenuSideBar from './MenuSideBar'
import ContentCar from './ContentCar'
import Footer from './Footer'
import ListRental from './ListRental'
import '../../css/Disable.css';

export default function IndexAdmin() {
  return (
    <div>
      <Header />
      <MenuSideBar />
      <div className='content-wrapper'>
        <h1>Home</h1>
      </div>

      <Footer />
      <div className='d-none d-sm-block'>
        <Header />
        <MenuSideBar />
        <ContentCar />
        <Footer />
      </div>
      <div className='container d-lg-none'>
        <div className='disable-nonti'>ระบบ Admin ไม่รองรับอุปกรณ์มือถือ</div>
      </div>
    </div>
  )
}
