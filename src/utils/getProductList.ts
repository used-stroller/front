// Response
export interface Response {
  content: Content[]
  number: number
  size: number
  totalElements: number
  totalPages: number
  last: boolean
  numberOfElements: number
  sort: Sort
  first: boolean
  empty: boolean
}

export interface Content {
  id: number
  sourceType: string
  pid: string
  title: string
  price: number
  link: string
  imgSrc: string
  createdAt: string
  updatedAt: string
  releaseYear: number
  etc: any
  uploadDate: string
  address: string
  region: any
  content: any
}

export interface Sort {
  sorted: boolean
  empty: boolean
  unsorted: boolean
}

// Request
export default interface FilterReq {
  keyword: string
  sourceType: sourceType
  minPrice: number
  maxPrice: number
  town: string
  period: number
  model: string[]
  brand: string[]
}
export enum sourceType {
  NAVER,
  CARROT,
  HELLO,
  BUNJANG,
  JUNGGO,
}

export default interface FilterReq {
  keyword: string
}

export const getProductList = async (page: number, keyword: FilterReq) : Promise<Response>=> {
    const res = await fetch(`http://localhost:8090/product/list?page=${page}`,{
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(keyword)
      },{credentials: 'include'})
    if(!res.ok){
        if(!res.ok) throw new Error('상품정보를 가져올 수 없습니다.')
    }
    console.log("productList 함수 호출됨")
    return res.json()
  }