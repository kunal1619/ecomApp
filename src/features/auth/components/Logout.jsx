import React from 'react'
import { Navigate } from 'react-router-dom'

const Logout = () => {

     localStorage.removeItem('token');
     localStorage.removeItem('loginData');

    return (
      <div>
        <Navigate to={'/login'}/>
      </div>
    )
   }
  


export default Logout
