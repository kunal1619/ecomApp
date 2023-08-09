import React from 'react'
import UserOrders from '../features/admin/components/UserOrders'
import Navbar from '../features/Navbar/Navbar'

const UserOrderPage = () => {
  return (
    <div>
    
    <Navbar>
        <UserOrders/>
    </Navbar>
      
    </div>
  )
}

export default UserOrderPage
