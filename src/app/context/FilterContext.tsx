'use client'
import React from 'react'
import { type FilterReq } from '@/app/types'

const FilterContext = React.createContext([{}, () => {}])

const FilterProvider: React.FC = ({ children }) => {
  const [filter, setFilter] = React.useState<FilterReq>({ page: 0 ,region: ''})

  return (
    <FilterContext.Provider value={[filter, setFilter]}>
      {children}
    </FilterContext.Provider>
  )
}

const useFilter = () => {
  const [filter, setFilter] = React.useContext(FilterContext)

  const handleFilter = (ev) => {
    console.log('handleFilter: ', ev.target)
    const { name, value } = ev.target
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }))
  }

  const minMaxPrice = (minPrice: number, maxPrice: number) => {
    setFilter((prevFilter) => ({ ...prevFilter, minPrice, maxPrice }))
  }

  const reset = (name: string) => {
    setFilter((prevFilter) => ({ ...prevFilter, [name]: '' }))
  }

  return { filter, handleFilter, minMaxPrice,reset }
}

export { FilterProvider, useFilter }
