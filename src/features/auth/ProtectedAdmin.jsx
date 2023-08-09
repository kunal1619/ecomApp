import React from 'react'
import { useSelector } from 'react-redux'
import { selectCreatedUser } from './authSlice'
import { Navigate } from 'react-router-dom'
import { selectLogedInUser } from './authSlice'



const ProtectedAdmin = ({children}) => {
    const user = useSelector(selectCreatedUser)
    const loginUser = useSelector(selectLogedInUser)


    if(!user && !loginUser){
      return <Navigate to='/login' replace={true}/>
    }

    if(user  && user.domain !== 'admin'){
      return <Navigate to='/' replace={true}/>
    }
  

  return children;
}

export default ProtectedAdmin
