import React, { useContext } from 'react';

import {Navigate, Outlet, useLocation} from 'react-router-dom'
import AuthContext from '../context/AuthContext';

const useAuth=()=>{
  const { user } = useContext(AuthContext)

  if(user){
    return true
  } else {
    return false
  }
}

const  ProtectedRoutes=(props) =>{

  const auth=useAuth()

  const location = useLocation();
  const referer = location.pathname

  return auth?<Outlet />: <Navigate to="/login" state={{referer: referer}} />

}

export default ProtectedRoutes;