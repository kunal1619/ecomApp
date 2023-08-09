import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductForm from '../features/admin/components/ProductForm'

const AdminProductForm = () => {
  return (
    <div>
      <Navbar>
        <ProductForm/>
      </Navbar>
    </div>
  )
}

export default AdminProductForm
