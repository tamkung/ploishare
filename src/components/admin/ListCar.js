import React from 'react'
import Header from './Header'
import MenuSideBar from './MenuSideBar'
import ContentCar from './ContentCar'
import Footer from './Footer'

export default function listCar() {
    return (
        <div>
            <Header />
            <MenuSideBar />
            <ContentCar />
            <Footer />
        </div>
    )
}
