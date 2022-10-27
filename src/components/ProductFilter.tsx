import React, { useState } from 'react'
import { useAppDispatch } from '@hooks/redux'
import { productFilter } from '@store/productSlice'
import { filters } from 'constants/filters'

const FilterItem = () => {
  const dispatch = useAppDispatch()
  const [completed, setComleted] = useState(true)
  const itemFilter = () => {

    if (completed) {
      dispatch(productFilter(filters.COMPLETED))
    } else {
      dispatch(productFilter(filters.ALL))
    }
    setComleted(!completed)
  }
  return (
    <div className='Filter'>
      <span>Filter books in my library : </span>
      <button className='btn_filter' onClick={() => itemFilter()}>{completed ? "LIKES" : "ALL"}</button>
    </div>
  )
}

export default FilterItem