import React, { useEffect } from "react";
import '../../css/Disable.css';
import HomeAdmin from './HomeAdmin';
import authCheck from "../../service/Auth";

export default function IndexAdmin() {

  useEffect(() => {
    authCheck();
  }, []);

  return (
    <div>
      <HomeAdmin />
    </div>
  )
}
