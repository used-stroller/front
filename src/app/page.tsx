import SearchBarFilter from './components/SearchBarFilter'
import Footer from './components/Footer'
import { FilterProvider } from '@/app/context/FilterContext'
import SearchResult from '@/app/components/SearchResult'
import ProductList from '@/app/components/ProductList'
import Ad from '@/app/components/Ad'

export default async function Home (): Promise<JSX.Element> {
  return (
      <FilterProvider>
        <div className='main'>
            <SearchBarFilter />
            <div>
              <SearchResult />
              <Ad />
              <ProductList />
            </div>
            <Footer/>
        </div>
      </FilterProvider>
  )
}
