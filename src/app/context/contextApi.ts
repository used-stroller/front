'use client'
import {createContext} from 'react'

const FilterContext = createContext({
  filter: {keyword:''},
  setFilter: ()=>{}
})
export default FilterContext
