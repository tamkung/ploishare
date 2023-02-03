import React, { useEffect } from 'react'
import SelectDate from '../components/SelectDate'
import authCheck from '../service/Auth'


function IndexUser() {
  useEffect(() => {
    authCheck();
  }, []);
  return (
    <div>
      <div>
        <div>
          <SelectDate />
        </div>
      </div>
    </div>
  )
}

export default IndexUser;