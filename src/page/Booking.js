import MenuButton from '../../src/components/menu'
import SelectDate from '../components/SelectDate'

function Booking() {
  return (
    <div>
      <div className='d-lg-none'>
        <div className='container'>
          <SelectDate />
        </div>
        <div>
          <MenuButton />
        </div>
      </div>
      <div className='container d-none d-sm-block'>
        <div className='disable-nonti'>ระบบ User ไม่รองรับอุปกรณ์ Destop</div>
      </div>
    </div>
  )
}

export default Booking;