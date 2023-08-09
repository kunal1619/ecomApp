import React from 'react'
import { useSelector } from 'react-redux'
import { selectCreatedUser } from './authSlice'
import { Navigate } from 'react-router-dom'
import { selectLogedInUser } from './authSlice'


const ProtectedRoute = ({children}) => {
    const user = useSelector(selectCreatedUser)
    const loginUser = useSelector(selectLogedInUser)


    if(!user && !loginUser){
      return <Navigate to='/login'/>
    }
  

  return children;
}

export default ProtectedRoute
