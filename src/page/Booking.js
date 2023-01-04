import React from 'react'
import MenuButton from '../../src/components/menu'
import SelectDate from '../components/SelectDate'
function Booking() {
  return (
    <div className='container'>
      <div className='bookingSite'>
      <SelectDate/>
      </div>
      <div>
        <MenuButton />
      </div>
    </div>
  )
}

export default Booking