'use client'
import React from 'react'
import { type FilterReq } from '@/app/types'

const FilterContext = React.createContext([{}, () => {}])

const FilterProvider: React.FC = ({ children }) => {
  const [filter, setFilter] = React.useState<FilterReq>({ page: 0 })

  return (
    <FilterContext.Provider value={[filter, setFilter]}>
      {children}
    </FilterContext.Provider>
  )
}

const useFilter = () => {
  const [filter, setFilter] = React.useContext(FilterContext)

  const handleFilter = (ev) => {
    const { name, value } = ev.target
    if (name === 'minPrice') {
      if (value === '0') {
        setFilter((prevFilter) => ({ ...prevFilter, minPrice: 0, maxPrice: 100000 }))
      } else if (value === '10') {
        setFilter((prevFilter) => ({ ...prevFilter, minPrice: 100000, maxPrice: 300000 }))
      } else if (value === '30') {
        setFilter((prevFilter) => ({ ...prevFilter, minPrice: 300000, maxPrice: 500000 }))
      } else if (value === '50') {
        setFilter((prevFilter) => ({ ...prevFilter, minPrice: 500000, maxPrice: '' }))
      } else {
        setFilter((prevFilter) => ({ ...prevFilter, minPrice: '', maxPrice: '' }))
      }
    } else {
      setFilter((prevFilter) => ({ ...prevFilter, [name]: value }))
    }
  }

  return { filter, handleFilter }
}

export { FilterProvider, useFilter }
