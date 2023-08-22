import React from 'react'
import { Navigate } from 'react-router-dom'


const ProtectedAdmin = ({children}) => {
   
    const loginData = localStorage.getItem('loginData')
    const loginDataObj = JSON.parse(loginData);


    if(!loginDataObj.token){
      return <Navigate to='/login' replace={true}/>
    }

    if(loginDataObj  && loginDataObj.role !== 'admin'){
      return <Navigate to='/' replace={true}/>
    }
  

  return children;
}

export default ProtectedAdmin
