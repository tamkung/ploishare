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


      <div className='d-none d-sm-block'>
        <Header />
        <MenuSideBar />
        <div className='content-wrapper'>
          <h1>Home</h1>
        </div>
        <Footer />
      </div>


      <div className='container d-lg-none d-xl-none d-md-none'>
        <div className='disable-nonti'>ระบบ Admin ไม่รองรับอุปกรณ์มือถือ</div>
      </div>
    </div>
  )
}
