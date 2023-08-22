import React from 'react'
import AdminProductList from '../features/admin/components/AdminProductList'
import Navbar from '../features/Navbar/Navbar'

const AdminProductListPage = () => {
  return (
    <div>
    <Navbar>
    <AdminProductList/>
    </Navbar> 
    </div>
  )
}

export default AdminProductListPage
