import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUserAsync, selectLogedInUser } from '../authSlice'
import { Navigate } from 'react-router-dom'

const Logout = () => {

    const logedInData = useSelector(selectLogedInUser)
    const dispatch = useDispatch()

    useEffect(()=>{
       dispatch(logOutUserAsync({userId : logedInData.id}))
    },[])

  return (
    <div>
      {!logedInData && <Navigate to={'/login'} replace={true}/>}
    </div>
  )
}

export default Logout
