import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import MyProfile from '../features/user/components/UserProfile'

const UserProfile = () => {
  return (
    <div>
      <Navbar>
      <>
        
      <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-wide text-gray-900">Your Profile</h1>
          </div>
        </header>
        <MyProfile/>
      </>
        
      </Navbar>
    </div>
  )
}

export default UserProfile
