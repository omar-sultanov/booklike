import React, { useEffect } from 'react'
import Product from './Product'
import { fetchProducts } from '@store/productSlice';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { IProduct } from '@models/IProduct';
import { filters } from 'constants/filters';

const ProductlList = () => {
  const { loading, error } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.products);
  const filter = useAppSelector(state => state.products.filterBy);

  // the function to handle the filter logic
  const filteredProduct = () => {
    if (filter === filters.COMPLETED) {
      return products.filter((product: IProduct) => product.liked);
    }
    // if none of above return all products
    return products;
  }

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className='Product_list'>
      {loading && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error}</h2>}
      {filteredProduct().map((product: IProduct) => <Product key={product.id} {...product} />)}
    </div>
  )
}

export default ProductlList