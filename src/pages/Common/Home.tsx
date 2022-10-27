import React from 'react'
import ProductFilter from "@components/ProductFilter"
import ProductlList from '@components/ProductlList'

const Home = () => {
  return (
    <div className='Home'>
        <ProductFilter/>
        <ProductlList/>
    </div>
  )
}

export default Home