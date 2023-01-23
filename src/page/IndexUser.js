import MenuButton from '../layout/LoMenu'
import SelectDate from '../components/SelectDate'
import SignOut from '../components/auth/SignOut';

function IndexUser() {
  return (
    <div>
      
      <div className='d-lg-none'>
        <div>
          <SelectDate />
        </div>
        <div>
          <MenuButton />
        </div>
      </div>
      <div className='container d-none d-sm-block'>
        <div className='disable-nonti'>ระบบ User ไม่รองรับอุปกรณ์ Destop
          <button className="buttonNext" onClick={SignOut}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default IndexUser;