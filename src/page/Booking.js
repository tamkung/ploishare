import MenuButton from '../../src/components/menu'
import SelectDate from '../components/SelectDate'

function Booking() {
  return (
    <div>
      <div className='container'>
      <SelectDate/>
      </div>
      <div>
        <MenuButton />
      </div>
    </div>
  )
}

export default Booking