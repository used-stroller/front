import { FilterProvider } from '@/app/context/FilterContext'
import SearchBarFilter from '@/app/components/SearchBarFilter'
import Footer from '@/app/components/Footer'
import ProductList from '@/app/components/ProductList'

export default async function Home (): Promise<JSX.Element> {
  return (
      <FilterProvider>
        <div className='main'>
          <SearchBarFilter />
          <ProductList />
          <Footer/>
        </div>
      </FilterProvider>
  )
}
