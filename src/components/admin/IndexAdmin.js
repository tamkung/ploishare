import React from 'react'
import Header from './Header'
import MenuSideBar from './MenuSideBar'
import ContentCar from './ContentCar'
import Footer from './Footer'
import ListRental from './ListRental'


export default function IndexAdmin() {
  return (
    <div>
      <Header />
      <MenuSideBar />
      <div className='content-wrapper'>
        <h1>Home</h1>
      </div>

      <Footer />
    </div>
  )
}
