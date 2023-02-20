import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import * as BsIcon5 from 'react-icons/fa'
import  LOGO  from '../img/logo-solo.png'

export default function MenuSideBar() {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to={"/home"} className="brand-link elevation-4">
                <img src={LOGO} alt="AdminLTE Logo" className="brand-image " style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light" style={{marginLeft:'0.5rem'}}> Menu</span>
            </Link>
            <div className="sidebar os-host os-theme-light os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-scrollbar-vertical-hidden os-host-transition">
                <div className="os-resize-observer-host observed">
                    <div className="os-resize-observer" style={{ left: 0, right: 'auto' }} />
                </div><div className="os-size-auto-observer observed" style={{ height: 'calc(100% + 1px)', float: 'left' }}>
                    <div className="os-resize-observer" />
                </div>
                <div className="os-content-glue" style={{ margin: '0px -8px' }} />
                <div className="os-padding">
                    <div className="os-viewport os-viewport-native-scrollbars-invisible">
                        <div className="os-content" style={{ padding: '0px 8px', height: '100%', width: '100%' }}>
                            <nav className="mt-2">
                                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                    <li className="nav-item">
                                        <NavLink className="nav-link " to={'/home'} >
                                            <BsIcon5.FaHome className='inline-flex mr-3 mb-1 ' size={25} />
                                            <p>Home</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link " to={'/listcar'} >
                                            <BsIcon5.FaCarAlt className='inline-flex mr-3 mb-1 ' size={25} />
                                            <p>ListCar</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={'/listbooking'}>
                                            <BsIcon5.FaListAlt className='inline-flex mr-3 mb-1 ' size={25} />
                                            <p>ListBooking</p>
                                        </NavLink>
                                    </li>
                                    {/* <li className="nav-item">
                                        <NavLink className="nav-link" to={'/listimage'}>
                                            <BsIcon5.FaImages className='inline-flex mr-3 mb-1 ' size={25} />
                                            <p>ManageImage</p>
                                        </NavLink>
                                    </li> */}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden">
                    <div className="os-scrollbar-track">
                        <div className="os-scrollbar-handle" style={{ width: '100%', transform: 'translate(0px, 0px)' }} />
                    </div>
                </div>
                <div className="os-scrollbar os-scrollbar-vertical os-scrollbar-unusable os-scrollbar-auto-hidden">
                    <div className="os-scrollbar-track">
                        <div className="os-scrollbar-handle" style={{ height: '100%', transform: 'translate(0px, 0px)' }} />
                    </div>
                </div>
                <div className="os-scrollbar-corner" />
            </div>
        </aside>
    )
}
