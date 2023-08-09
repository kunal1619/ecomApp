import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import MyOrder from '../features/user/components/MyOrder'

const MyorderPage = () => {
  return (
    <div>
      <Navbar>
        <MyOrder/>
      </Navbar>
    </div>
  )
}

export default MyorderPage
