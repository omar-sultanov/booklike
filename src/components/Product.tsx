import React from 'react'
import { useAppDispatch } from '@hooks/redux'
import { IProduct } from '@models/IProduct'
import { productRemove, productLike } from '@store/productSlice'
const Product = (product: IProduct) => {
  const dispatch = useAppDispatch()
  const image = product.volumeInfo.imageLinks.smallThumbnail

  return (
    <div className="Product">
      <div className='image'><img className='card_img' src={image} alt={image} /></div>
      <div className='card_text'>
        <h4>{product.volumeInfo.title}</h4>
        <p>{product.volumeInfo.categories}</p>
        <div className='card_icons'>
          <i id={`${product.liked === true ? "clicked" : ""}`} onClick={() => dispatch(productLike(product.id))} className="fa-solid fa-thumbs-up"></i>
          <i onClick={() => dispatch(productRemove(product.id))} className="fa-solid fa-trash"></i>
        </div>
      </div>
    </div>
  )
}

export default Product