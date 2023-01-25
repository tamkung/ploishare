import React from 'react'
import '../../css/Disable.css';
import HomeAdmin from './HomeAdmin';

export default function IndexAdmin() {
  return (
    <div>
      <div className='d-none d-sm-block' >
        <HomeAdmin />
      </div>
      <div className='container d-lg-none d-xl-none d-md-none'>
        <div className='disable-nonti'>ระบบ Admin ไม่รองรับอุปกรณ์มือถือ</div>
      </div>
    </div>
  )
}
