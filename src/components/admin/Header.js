import React from 'react'

export default function Header() {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                        <i className="fas fa-bars" /></a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                    <a className="nav-link" href="/">Admin ปล่อยShare</a>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt" />
                    </a>
                </li>
                <li className="nav-item d-sm-inline-block">
                    <a className="btn nav-link" onClick={() => { window.location = "/" }}>ออกจากระบบ</a>
                </li>
            </ul>
        </nav>

    )
}
