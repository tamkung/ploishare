import MenuButton from '../../src/components/menu'
import SelectDate from '../components/SelectDate'
import React, { useState, useEffect } from "react";

function Booking() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  useEffect(() => {
    const user = getCurrentUser();

    if (!user) {
      setCurrentUser(user);
      window.location.href = "/";
    }
  }, []);
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