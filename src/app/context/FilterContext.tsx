'use client'
import React from 'react'
import { type FilterReq } from '@/app/types'

const FilterContext = React.createContext([{}, () => {}])

const useFilter = () => {
  const [filter, setFilter] = React.useContext(FilterContext)

  const handleFilter = (ev) => {
    const { name, value } = ev.target
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }))
  }

  console.log('useFilter: ', filter)
  return { filter, handleFilter }
}

const FilterProvider: React.FC = ({ children }) => {
  const [filter, setFilter] = React.useState<FilterReq>({})

  return (
      <FilterContext.Provider value={[filter, setFilter]}>
          {children}
      </FilterContext.Provider>
  )
}

export { FilterProvider, useFilter }
