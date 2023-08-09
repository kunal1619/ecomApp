import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductDetail from '../features/productList/components/ProductDetails'

const ProductDetails = () => {
  return (
    <div>
      <Navbar>
        <ProductDetail/>
      </Navbar>
    </div>
  )
}

export default ProductDetails
