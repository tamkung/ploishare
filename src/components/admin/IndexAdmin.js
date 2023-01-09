import React from 'react'
import '../../css/Disable.css';

export default function IndexAdmin() {
  return (
    <div>
      <div className='d-none d-sm-block' >
        <h1 style={{
          position: 'fixed', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
        }}>Home</h1>
      </div>
      <div className='container d-lg-none d-xl-none d-md-none'>
        <div className='disable-nonti'>ระบบ Admin ไม่รองรับอุปกรณ์มือถือ</div>
      </div>
    </div>
  )
}
